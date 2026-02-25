/**
 * ComfyUI Desktop - Python 环境管理器
 * 参考官方实现，使用 python-build-standalone 和 uv 工具
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { execSync, spawn } = require('child_process');
const { createWriteStream, createReadStream } = require('fs');
const { pipeline } = require('stream/promises');
const zlib = require('zlib');
const tar = require('tar');  // 需要安装: npm install tar

// Python 版本配置
const PYTHON_VERSION = '3.12.4';
const UV_VERSION = '0.4.0';

// python-build-standalone 下载源
const PYTHON_STANDALONE_MIRRORS = {
    github: 'https://github.com/astral-sh/python-build-standalone/releases/download',
    // 中国镜像（如果有的话）
    china: 'https://mirror.ghproxy.com/https://github.com/astral-sh/python-build-standalone/releases/download'
};

// PyPI 镜像源
const PYPI_MIRRORS = {
    default: 'https://pypi.org/simple',
    aliyun: 'https://mirrors.aliyun.com/pypi/simple',
    tencent: 'https://mirrors.cloud.tencent.com/pypi/simple',
    tsinghua: 'https://pypi.tuna.tsinghua.edu.cn/simple'
};

// PyTorch 镜像源
const TORCH_MIRRORS = {
    default: 'https://download.pytorch.org/whl',
    aliyun: 'https://mirrors.aliyun.com/pytorch-wheels'
};

class PythonManager {
    constructor(installPath) {
        this.installPath = installPath;
        this.pythonDir = path.join(installPath, 'python');
        this.venvDir = path.join(installPath, '.venv');
        this.uvPath = null;
        
        // 检测系统
        this.platform = process.platform;
        this.arch = process.arch === 'arm64' ? 'aarch64' : 'x86_64';
        
        // 镜像配置
        this.mirrors = {
            python: 'github',
            pypi: 'default',
            torch: 'default'
        };
    }

    /**
     * 设置镜像源
     */
    setMirror(type, mirror) {
        this.mirrors[type] = mirror;
    }

    /**
     * 获取 Python standalone 下载 URL
     */
    getPythonDownloadUrl() {
        const baseUrl = PYTHON_STANDALONE_MIRRORS[this.mirrors.python];
        const date = '20240726'; // python-build-standalone release date
        
        let filename;
        if (this.platform === 'darwin') {
            filename = `cpython-${PYTHON_VERSION}+${date}-${this.arch}-apple-darwin-install_only.tar.gz`;
        } else if (this.platform === 'win32') {
            filename = `cpython-${PYTHON_VERSION}+${date}-${this.arch}-pc-windows-msvc-shared-install_only.tar.gz`;
        } else {
            filename = `cpython-${PYTHON_VERSION}+${date}-${this.arch}-unknown-linux-gnu-install_only.tar.gz`;
        }
        
        return `${baseUrl}/${date}/${filename}`;
    }

    /**
     * 获取 uv 下载 URL
     */
    getUvDownloadUrl() {
        let filename;
        if (this.platform === 'darwin') {
            filename = `uv-${this.arch}-apple-darwin.tar.gz`;
        } else if (this.platform === 'win32') {
            filename = `uv-${this.arch}-pc-windows-msvc.zip`;
        } else {
            filename = `uv-${this.arch}-unknown-linux-gnu.tar.gz`;
        }
        
        return `https://github.com/astral-sh/uv/releases/download/${UV_VERSION}/${filename}`;
    }

    /**
     * 下载文件（支持进度回调）
     */
    async downloadFile(url, destPath, onProgress) {
        return new Promise((resolve, reject) => {
            const file = createWriteStream(destPath);
            const protocol = url.startsWith('https') ? https : http;
            
            const request = protocol.get(url, { 
                headers: { 'User-Agent': 'ComfyUI-Desktop' }
            }, (response) => {
                // 处理重定向
                if (response.statusCode === 301 || response.statusCode === 302) {
                    file.close();
                    fs.unlinkSync(destPath);
                    return this.downloadFile(response.headers.location, destPath, onProgress)
                        .then(resolve)
                        .catch(reject);
                }
                
                if (response.statusCode !== 200) {
                    file.close();
                    fs.unlinkSync(destPath);
                    reject(new Error(`Download failed: ${response.statusCode}`));
                    return;
                }
                
                const totalSize = parseInt(response.headers['content-length'], 10);
                let downloadedSize = 0;
                
                response.on('data', (chunk) => {
                    downloadedSize += chunk.length;
                    if (onProgress && totalSize) {
                        onProgress({
                            downloaded: downloadedSize,
                            total: totalSize,
                            percent: Math.round((downloadedSize / totalSize) * 100)
                        });
                    }
                });
                
                response.pipe(file);
                
                file.on('finish', () => {
                    file.close();
                    resolve(destPath);
                });
            });
            
            request.on('error', (err) => {
                file.close();
                fs.unlinkSync(destPath);
                reject(err);
            });
        });
    }

    /**
     * 解压 tar.gz 文件
     */
    async extractTarGz(filePath, destDir) {
        await fs.promises.mkdir(destDir, { recursive: true });
        
        return new Promise((resolve, reject) => {
            createReadStream(filePath)
                .pipe(zlib.createGunzip())
                .pipe(tar.extract({ cwd: destDir }))
                .on('finish', resolve)
                .on('error', reject);
        });
    }

    /**
     * 检查 Python 是否已安装
     */
    isPythonInstalled() {
        const pythonPath = this.getPythonPath();
        return pythonPath && fs.existsSync(pythonPath);
    }

    /**
     * 获取 Python 可执行文件路径
     */
    getPythonPath() {
        if (this.platform === 'win32') {
            return path.join(this.pythonDir, 'python', 'python.exe');
        }
        return path.join(this.pythonDir, 'python', 'bin', 'python3');
    }

    /**
     * 获取虚拟环境中的 Python 路径
     */
    getVenvPythonPath() {
        if (this.platform === 'win32') {
            return path.join(this.venvDir, 'Scripts', 'python.exe');
        }
        return path.join(this.venvDir, 'bin', 'python');
    }

    /**
     * 安装 Python standalone
     */
    async installPython(onProgress) {
        console.log('Installing Python standalone...');
        
        const downloadUrl = this.getPythonDownloadUrl();
        const tempFile = path.join(this.installPath, 'python-standalone.tar.gz');
        
        // 下载
        onProgress?.({ stage: 'downloading', message: '正在下载 Python...' });
        await this.downloadFile(downloadUrl, tempFile, (progress) => {
            onProgress?.({ 
                stage: 'downloading', 
                message: `正在下载 Python... ${progress.percent}%`,
                ...progress 
            });
        });
        
        // 解压
        onProgress?.({ stage: 'extracting', message: '正在解压 Python...' });
        await this.extractTarGz(tempFile, this.pythonDir);
        
        // 清理
        fs.unlinkSync(tempFile);
        
        console.log('Python installed successfully');
        return this.getPythonPath();
    }

    /**
     * 创建虚拟环境
     */
    async createVenv(onProgress) {
        onProgress?.({ stage: 'venv', message: '正在创建虚拟环境...' });
        
        const pythonPath = this.getPythonPath();
        
        // 删除旧的虚拟环境
        if (fs.existsSync(this.venvDir)) {
            fs.rmSync(this.venvDir, { recursive: true });
        }
        
        // 创建虚拟环境
        execSync(`"${pythonPath}" -m venv "${this.venvDir}"`, {
            encoding: 'utf-8',
            stdio: 'inherit'
        });
        
        console.log('Virtual environment created');
        return this.getVenvPythonPath();
    }

    /**
     * 安装 uv 工具
     */
    async installUv(onProgress) {
        onProgress?.({ stage: 'uv', message: '正在安装 uv 包管理器...' });
        
        const venvPython = this.getVenvPythonPath();
        const pipArgs = this.mirrors.pypi !== 'default' 
            ? `-i ${PYPI_MIRRORS[this.mirrors.pypi]}`
            : '';
        
        execSync(`"${venvPython}" -m pip install uv ${pipArgs}`, {
            encoding: 'utf-8',
            stdio: 'inherit'
        });
        
        // 获取 uv 路径
        if (this.platform === 'win32') {
            this.uvPath = path.join(this.venvDir, 'Scripts', 'uv.exe');
        } else {
            this.uvPath = path.join(this.venvDir, 'bin', 'uv');
        }
        
        console.log('uv installed successfully');
    }

    /**
     * 使用 uv 安装依赖
     */
    async installDependencies(requirements, onProgress) {
        onProgress?.({ stage: 'deps', message: '正在安装 ComfyUI 依赖...' });
        
        const uvPath = this.uvPath || path.join(this.venvDir, 'bin', 'uv');
        const indexUrl = PYPI_MIRRORS[this.mirrors.pypi];
        
        // 安装基础依赖
        const uvArgs = [
            'pip', 'install',
            '--python', this.getVenvPythonPath(),
            '-i', indexUrl
        ];
        
        if (requirements.length > 0) {
            uvArgs.push(...requirements);
        }
        
        execSync(`"${uvPath}" ${uvArgs.join(' ')}`, {
            encoding: 'utf-8',
            stdio: 'inherit',
            cwd: this.installPath
        });
    }

    /**
     * 安装 PyTorch
     */
    async installPyTorch(gpuType, onProgress) {
        onProgress?.({ stage: 'pytorch', message: '正在安装 PyTorch...' });
        
        const uvPath = this.uvPath || path.join(this.venvDir, 'bin', 'uv');
        const indexUrl = PYPI_MIRRORS[this.mirrors.pypi];
        
        let torchArgs = ['torch', 'torchvision', 'torchaudio'];
        let extraIndex = '';
        
        if (gpuType === 'nvidia') {
            // CUDA 版本
            extraIndex = `--extra-index-url ${TORCH_MIRRORS[this.mirrors.torch]}/cu121`;
        } else if (gpuType === 'amd' && this.platform !== 'darwin') {
            // ROCm 版本 (仅 Linux)
            extraIndex = `--extra-index-url ${TORCH_MIRRORS[this.mirrors.torch]}/rocm6.0`;
        }
        // macOS 使用默认版本 (MPS)
        
        const command = `"${uvPath}" pip install --python "${this.getVenvPythonPath()}" -i ${indexUrl} ${extraIndex} ${torchArgs.join(' ')}`;
        
        execSync(command, {
            encoding: 'utf-8',
            stdio: 'inherit',
            cwd: this.installPath
        });
        
        console.log('PyTorch installed successfully');
    }

    /**
     * 完整安装流程
     */
    async fullInstall(options = {}, onProgress) {
        const {
            gpuType = 'nvidia',
            comfyuiPath = null,
            skipPython = false
        } = options;

        try {
            // 1. 安装 Python (如果需要)
            if (!skipPython && !this.isPythonInstalled()) {
                await this.installPython(onProgress);
            }

            // 2. 创建虚拟环境
            await this.createVenv(onProgress);

            // 3. 安装 uv
            await this.installUv(onProgress);

            // 4. 安装 PyTorch
            await this.installPyTorch(gpuType, onProgress);

            // 5. 安装 ComfyUI 依赖
            if (comfyuiPath && fs.existsSync(path.join(comfyuiPath, 'requirements.txt'))) {
                onProgress?.({ stage: 'comfyui', message: '正在安装 ComfyUI 依赖...' });
                await this.installDependencies(
                    ['-r', path.join(comfyuiPath, 'requirements.txt')],
                    onProgress
                );
            }

            // 6. 安装额外依赖
            await this.installDependencies([
                'aiohttp',
                'aiosqlite', 
                'sqlalchemy',
                'transformers',
                'accelerate',
                'safetensors'
            ], onProgress);

            onProgress?.({ stage: 'complete', message: '安装完成!' });
            
            return {
                success: true,
                pythonPath: this.getVenvPythonPath()
            };

        } catch (error) {
            console.error('Installation failed:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * 获取安装状态
     */
    getStatus() {
        return {
            pythonInstalled: this.isPythonInstalled(),
            venvExists: fs.existsSync(this.venvDir),
            pythonPath: this.isPythonInstalled() ? this.getPythonPath() : null,
            venvPythonPath: fs.existsSync(this.venvDir) ? this.getVenvPythonPath() : null
        };
    }
}

module.exports = PythonManager;
