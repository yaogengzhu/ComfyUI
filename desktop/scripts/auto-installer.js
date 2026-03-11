/**
 * 绘智 AI Desktop - 自动安装器
 * 首次启动时自动下载和安装所有依赖
 * 用户无需手动配置任何环境
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { execSync, spawn } = require('child_process');
const { createWriteStream, createReadStream } = require('fs');
const zlib = require('zlib');

// ============ 配置 ============

// Python 版本配置
const PYTHON_VERSION = '3.12.8';
const PYTHON_BUILD_DATE = '20241219';

// 下载源配置
const DOWNLOAD_SOURCES = {
    // Python standalone 下载源
    python: {
        github: 'https://github.com/astral-sh/python-build-standalone/releases/download',
        ghproxy: 'https://mirror.ghproxy.com/https://github.com/astral-sh/python-build-standalone/releases/download'
    },
    // uv 下载源
    uv: {
        github: 'https://github.com/astral-sh/uv/releases/latest/download',
        ghproxy: 'https://mirror.ghproxy.com/https://github.com/astral-sh/uv/releases/latest/download'
    },
    // PyPI 镜像
    pypi: {
        default: 'https://pypi.org/simple',
        aliyun: 'https://mirrors.aliyun.com/pypi/simple',
        tencent: 'https://mirrors.cloud.tencent.com/pypi/simple',
        tsinghua: 'https://pypi.tuna.tsinghua.edu.cn/simple'
    },
    // PyTorch 镜像
    torch: {
        default: 'https://download.pytorch.org/whl',
        aliyun: 'https://mirrors.aliyun.com/pytorch-wheels'
    }
};

// ============ 自动安装器类 ============

class AutoInstaller {
    constructor(options = {}) {
        // 安装路径 (默认在 desktop 目录下)
        this.installBase = options.installPath || path.join(__dirname, '..');
        this.pythonEnvDir = path.join(this.installBase, 'python_env');
        this.comfyuiPath = options.comfyuiPath || path.join(this.installBase, '..');
        
        // 系统信息
        this.platform = process.platform;
        this.arch = process.arch === 'arm64' ? 'aarch64' : 'x86_64';
        
        // 镜像配置 (默认使用官方源)
        this.mirror = options.mirror || 'default';
        
        // 进度回调
        this.onProgress = options.onProgress || (() => {});
        this.onLog = options.onLog || console.log;
        
        // GPU 类型
        this.gpuType = options.gpuType || this.detectGpuType();
    }

    // ============ 路径与目录辅助 ============

    /**
     * 确保目标路径是目录（若已存在且为文件则先删除再创建，避免 Windows 下 ENOTDIR）
     */
    ensureDir(dirPath) {
        if (!dirPath) return;
        const stat = fs.existsSync(dirPath) ? fs.statSync(dirPath) : null;
        if (stat && stat.isFile()) {
            fs.unlinkSync(dirPath);
        }
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    }

    /**
     * 获取 Windows 下 tar -C 可用的路径（避免反斜杠与引号问题）
     */
    getTarSafePath(dirPath) {
        if (this.platform !== 'win32') return dirPath;
        return path.resolve(dirPath).replace(/\\/g, '/');
    }

    // ============ 路径获取 ============

    /**
     * 获取 Python standalone 目录
     */
    getPythonDir() {
        return path.join(this.pythonEnvDir, 'python');
    }

    /**
     * 获取 Python 可执行文件路径
     */
    getPythonPath() {
        if (this.platform === 'win32') {
            return path.join(this.getPythonDir(), 'python.exe');
        }
        return path.join(this.getPythonDir(), 'bin', 'python3');
    }

    /**
     * 获取 pip 路径
     */
    getPipPath() {
        if (this.platform === 'win32') {
            return path.join(this.getPythonDir(), 'Scripts', 'pip.exe');
        }
        return path.join(this.getPythonDir(), 'bin', 'pip3');
    }

    /**
     * 获取 uv 可执行文件路径
     */
    getUvPath() {
        if (this.platform === 'win32') {
            return path.join(this.pythonEnvDir, 'uv.exe');
        }
        return path.join(this.pythonEnvDir, 'uv');
    }

    // ============ 检测方法 ============

    /**
     * 检测 GPU 类型
     */
    detectGpuType() {
        if (this.platform === 'darwin') {
            return 'mps'; // macOS 使用 Metal/MPS
        }
        
        try {
            if (this.platform === 'win32') {
                execSync('nvidia-smi', { stdio: 'pipe' });
                return 'nvidia';
            } else {
                execSync('nvidia-smi', { stdio: 'pipe' });
                return 'nvidia';
            }
        } catch {
            // 没有 NVIDIA GPU
        }
        
        try {
            if (this.platform === 'linux') {
                execSync('rocm-smi', { stdio: 'pipe' });
                return 'amd';
            }
        } catch {
            // 没有 AMD GPU
        }
        
        return 'cpu';
    }

    /**
     * 检查是否已安装
     */
    isInstalled() {
        const pythonPath = this.getPythonPath();
        if (!fs.existsSync(pythonPath)) {
            return false;
        }
        
        // 检查关键依赖
        try {
            execSync(`"${pythonPath}" -c "import torch; import comfy_aimdo"`, {
                stdio: 'pipe',
                timeout: 30000
            });
            return true;
        } catch {
            return false;
        }
    }

    /**
     * 检查 Python 是否已下载
     */
    isPythonDownloaded() {
        return fs.existsSync(this.getPythonPath());
    }

    // ============ 下载方法 ============

    /**
     * 获取下载 URL
     */
    getDownloadUrl(type) {
        const useProxy = this.mirror !== 'default';
        
        if (type === 'python') {
            const base = useProxy 
                ? DOWNLOAD_SOURCES.python.ghproxy 
                : DOWNLOAD_SOURCES.python.github;
            
            let filename;
            if (this.platform === 'darwin') {
                filename = `cpython-${PYTHON_VERSION}+${PYTHON_BUILD_DATE}-${this.arch}-apple-darwin-install_only.tar.gz`;
            } else if (this.platform === 'win32') {
                filename = `cpython-${PYTHON_VERSION}+${PYTHON_BUILD_DATE}-${this.arch}-pc-windows-msvc-shared-install_only.tar.gz`;
            } else {
                filename = `cpython-${PYTHON_VERSION}+${PYTHON_BUILD_DATE}-${this.arch}-unknown-linux-gnu-install_only.tar.gz`;
            }
            
            return `${base}/${PYTHON_BUILD_DATE}/${filename}`;
        }
        
        if (type === 'uv') {
            const base = useProxy 
                ? DOWNLOAD_SOURCES.uv.ghproxy 
                : DOWNLOAD_SOURCES.uv.github;
            
            let filename;
            if (this.platform === 'darwin') {
                filename = `uv-${this.arch}-apple-darwin.tar.gz`;
            } else if (this.platform === 'win32') {
                filename = `uv-${this.arch}-pc-windows-msvc.zip`;
            } else {
                filename = `uv-${this.arch}-unknown-linux-gnu.tar.gz`;
            }
            
            return `${base}/${filename}`;
        }
        
        return null;
    }

    /**
     * 下载文件
     */
    async downloadFile(url, destPath, description = '') {
        return new Promise((resolve, reject) => {
            this.onLog(`[下载] ${description || url}`);
            
            // 确保目录存在且为目录（若为文件则先删除，避免 Windows ENOTDIR）
            const dir = path.dirname(destPath);
            this.ensureDir(dir);
            
            const file = createWriteStream(destPath);
            const protocol = url.startsWith('https') ? https : http;
            
            const makeRequest = (requestUrl) => {
                const req = protocol.get(requestUrl, {
                    headers: { 'User-Agent': 'HuizhiAI-Desktop/1.0' },
                    timeout: 60000
                }, (response) => {
                    // 处理重定向
                    if (response.statusCode === 301 || response.statusCode === 302 || response.statusCode === 307) {
                        file.close();
                        fs.unlinkSync(destPath);
                        const redirectUrl = response.headers.location;
                        this.onLog(`[重定向] -> ${redirectUrl}`);
                        
                        // 递归处理重定向
                        this.downloadFile(redirectUrl, destPath, description)
                            .then(resolve)
                            .catch(reject);
                        return;
                    }
                    
                    if (response.statusCode !== 200) {
                        file.close();
                        if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
                        reject(new Error(`下载失败: HTTP ${response.statusCode}`));
                        return;
                    }
                    
                    const totalSize = parseInt(response.headers['content-length'], 10);
                    let downloadedSize = 0;
                    let lastPercent = 0;
                    
                    response.on('data', (chunk) => {
                        downloadedSize += chunk.length;
                        if (totalSize) {
                            const percent = Math.round((downloadedSize / totalSize) * 100);
                            if (percent !== lastPercent && percent % 5 === 0) {
                                lastPercent = percent;
                                const mb = (downloadedSize / 1024 / 1024).toFixed(1);
                                const totalMb = (totalSize / 1024 / 1024).toFixed(1);
                                this.onProgress({
                                    stage: 'download',
                                    message: `${description}: ${mb}MB / ${totalMb}MB (${percent}%)`,
                                    percent
                                });
                            }
                        }
                    });
                    
                    response.pipe(file);
                    
                    file.on('finish', () => {
                        file.close();
                        this.onLog(`[完成] ${description} 下载完成`);
                        resolve(destPath);
                    });
                });
                
                req.on('error', (err) => {
                    file.close();
                    if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
                    reject(err);
                });
                
                req.on('timeout', () => {
                    req.destroy();
                    file.close();
                    if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
                    reject(new Error('下载超时'));
                });
            };
            
            makeRequest(url);
        });
    }

    /**
     * 解压 tar.gz 文件
     */
    async extractTarGz(filePath, destDir) {
        this.onLog(`[解压] ${path.basename(filePath)}`);
        
        // 确保目标为目录（若为文件则删除再建，避免 Windows ENOTDIR）
        this.ensureDir(destDir);
        
        const destDirResolved = path.resolve(destDir);
        const tarDestDir = this.getTarSafePath(destDirResolved);
        const tarFilePath = this.getTarSafePath(path.resolve(filePath));
        
        return new Promise((resolve, reject) => {
            // 使用系统 tar 命令 (更可靠)
            try {
                if (this.platform === 'win32') {
                    // Windows: 使用 tar 命令 (Windows 10+ 自带)，用正斜杠路径减少 ENOTDIR
                    execSync(`tar -xzf "${tarFilePath}" -C "${tarDestDir}"`, {
                        stdio: 'pipe',
                        windowsHide: true
                    });
                } else {
                    execSync(`tar -xzf "${filePath}" -C "${destDir}"`, {
                        stdio: 'pipe'
                    });
                }
                this.onLog(`[完成] 解压完成`);
                resolve();
            } catch (err) {
                // 备用方案: 使用 Node.js 流（确保 cwd 是目录）
                this.ensureDir(destDirResolved);
                const gunzip = zlib.createGunzip();
                const extract = require('tar').extract({ cwd: destDirResolved });
                
                createReadStream(filePath)
                    .pipe(gunzip)
                    .pipe(extract)
                    .on('finish', () => {
                        this.onLog(`[完成] 解压完成`);
                        resolve();
                    })
                    .on('error', reject);
            }
        });
    }

    /**
     * 解压 zip 文件 (Windows uv)
     */
    async extractZip(filePath, destDir) {
        this.onLog(`[解压] ${path.basename(filePath)}`);
        
        this.ensureDir(destDir);
        
        // Windows 使用 PowerShell 解压
        if (this.platform === 'win32') {
            execSync(`powershell -command "Expand-Archive -Path '${filePath}' -DestinationPath '${destDir}' -Force"`, {
                stdio: 'pipe'
            });
        }
        
        this.onLog(`[完成] 解压完成`);
    }

    // ============ 安装方法 ============

    /**
     * 安装 Python standalone
     */
    async installPython() {
        this.onProgress({ stage: 'python', message: '正在下载 Python 环境...' });
        this.onLog(`\n========== 安装 Python ${PYTHON_VERSION} ==========`);
        
        // 确保安装目录存在且为目录（避免 Windows 下 python_env 为文件时出现 ENOTDIR）
        this.ensureDir(this.pythonEnvDir);
        
        const url = this.getDownloadUrl('python');
        const tempFile = path.join(this.pythonEnvDir, 'python.tar.gz');
        
        try {
            // 下载
            await this.downloadFile(url, tempFile, `Python ${PYTHON_VERSION}`);
            
            // 解压
            this.onProgress({ stage: 'python', message: '正在解压 Python...' });
            await this.extractTarGz(tempFile, this.pythonEnvDir);
            
            // 删除临时文件
            if (fs.existsSync(tempFile)) {
                fs.unlinkSync(tempFile);
            }
            
            // 验证安装
            const pythonPath = this.getPythonPath();
            if (!fs.existsSync(pythonPath)) {
                throw new Error('Python 安装失败: 找不到 Python 可执行文件');
            }
            
            // 获取版本
            const version = execSync(`"${pythonPath}" --version`, { encoding: 'utf-8' }).trim();
            this.onLog(`[成功] ${version} 安装完成`);
            
            return pythonPath;
        } catch (err) {
            this.onLog(`[错误] Python 安装失败: ${err.message}`);
            throw err;
        }
    }

    /**
     * 安装 uv 包管理器
     */
    async installUv() {
        this.onProgress({ stage: 'uv', message: '正在安装 uv 包管理器...' });
        this.onLog(`\n========== 安装 uv 包管理器 ==========`);
        
        const pythonPath = this.getPythonPath();
        const pypiMirror = DOWNLOAD_SOURCES.pypi[this.mirror] || DOWNLOAD_SOURCES.pypi.default;
        
        try {
            // 使用 pip 安装 uv
            const pipCmd = `"${pythonPath}" -m pip install uv -i ${pypiMirror} --trusted-host ${new URL(pypiMirror).hostname}`;
            this.onLog(`[执行] ${pipCmd}`);
            
            execSync(pipCmd, {
                encoding: 'utf-8',
                stdio: 'pipe',
                timeout: 300000
            });
            
            this.onLog(`[成功] uv 安装完成`);
        } catch (err) {
            this.onLog(`[警告] uv 安装失败，将使用 pip: ${err.message}`);
        }
    }

    /**
     * 安装 PyTorch
     */
    async installPyTorch() {
        this.onProgress({ stage: 'pytorch', message: '正在安装 PyTorch (这可能需要几分钟)...' });
        this.onLog(`\n========== 安装 PyTorch ==========`);
        this.onLog(`[信息] GPU 类型: ${this.gpuType}`);
        
        const pythonPath = this.getPythonPath();
        const pypiMirror = DOWNLOAD_SOURCES.pypi[this.mirror] || DOWNLOAD_SOURCES.pypi.default;
        const torchMirror = DOWNLOAD_SOURCES.torch[this.mirror] || DOWNLOAD_SOURCES.torch.default;
        
        let extraIndex = '';
        if (this.gpuType === 'nvidia') {
            extraIndex = `--extra-index-url ${torchMirror}/cu124`;
            this.onLog(`[信息] 使用 CUDA 12.4 版本`);
        } else if (this.gpuType === 'amd') {
            extraIndex = `--extra-index-url ${torchMirror}/rocm6.1`;
            this.onLog(`[信息] 使用 ROCm 6.1 版本`);
        } else if (this.gpuType === 'mps') {
            this.onLog(`[信息] 使用 macOS MPS 版本`);
        } else {
            this.onLog(`[信息] 使用 CPU 版本`);
        }
        
        try {
            const pipCmd = `"${pythonPath}" -m pip install torch torchvision torchaudio -i ${pypiMirror} ${extraIndex} --trusted-host ${new URL(pypiMirror).hostname}`;
            this.onLog(`[执行] 安装 torch torchvision torchaudio`);
            
            execSync(pipCmd, {
                encoding: 'utf-8',
                stdio: 'inherit',
                timeout: 1800000 // 30 分钟超时
            });
            
            // 验证安装
            const verifyScript = 'import torch; print(f"PyTorch {torch.__version__}, CUDA: {torch.cuda.is_available()}, MPS: {torch.backends.mps.is_available() if hasattr(torch.backends, \\"mps\\") else False}")';
            const result = execSync(`"${pythonPath}" -c "${verifyScript}"`, { encoding: 'utf-8' }).trim();
            this.onLog(`[成功] ${result}`);
        } catch (err) {
            this.onLog(`[错误] PyTorch 安装失败: ${err.message}`);
            throw err;
        }
    }

    /**
     * 安装 绘智 AI 依赖
     */
    async installComfyUIDependencies() {
        this.onProgress({ stage: 'deps', message: '正在安装绘智 AI 依赖...' });
        this.onLog(`\n========== 安装绘智 AI 依赖 ==========`);
        
        const pythonPath = this.getPythonPath();
        const pypiMirror = DOWNLOAD_SOURCES.pypi[this.mirror] || DOWNLOAD_SOURCES.pypi.default;
        const requirementsPath = path.join(this.comfyuiPath, 'requirements.txt');
        
        if (!fs.existsSync(requirementsPath)) {
            this.onLog(`[警告] requirements.txt 不存在: ${requirementsPath}`);
            return;
        }
        
        try {
            // 先升级 pip
            this.onLog(`[执行] 升级 pip...`);
            execSync(`"${pythonPath}" -m pip install --upgrade pip -i ${pypiMirror}`, {
                encoding: 'utf-8',
                stdio: 'pipe',
                timeout: 120000
            });
            
            // 安装依赖
            const pipCmd = `"${pythonPath}" -m pip install -r "${requirementsPath}" -i ${pypiMirror} --trusted-host ${new URL(pypiMirror).hostname}`;
            this.onLog(`[执行] pip install -r requirements.txt`);
            
            const child = spawn(pythonPath, [
                '-m', 'pip', 'install', 
                '-r', requirementsPath,
                '-i', pypiMirror,
                '--trusted-host', new URL(pypiMirror).hostname
            ], {
                cwd: this.comfyuiPath,
                env: { ...process.env, PYTHONIOENCODING: 'utf-8', PYTHONLEGACYWINDOWSSTDIO: 'utf-8' }
            });
            
            return new Promise((resolve, reject) => {
                let lastLog = '';
                
                child.stdout.on('data', (data) => {
                    const output = data.toString('utf-8').trim();
                    if (output && output !== lastLog) {
                        lastLog = output;
                        // 只记录重要信息
                        if (output.includes('Installing') || output.includes('Successfully')) {
                            this.onLog(`  ${output}`);
                        }
                    }
                });
                
                child.stderr.on('data', (data) => {
                    const output = data.toString('utf-8').trim();
                    if (output && !output.includes('WARNING')) {
                        this.onLog(`  [stderr] ${output}`);
                    }
                });
                
                child.on('close', (code) => {
                    if (code === 0) {
                        this.onLog(`[成功] 绘智 AI 依赖安装完成`);
                        resolve();
                    } else {
                        reject(new Error(`pip install 退出码: ${code}`));
                    }
                });
                
                child.on('error', reject);
            });
        } catch (err) {
            this.onLog(`[错误] 依赖安装失败: ${err.message}`);
            throw err;
        }
    }

    /**
     * 完整安装流程
     */
    async install() {
        this.onLog(`\n${'='.repeat(50)}`);
        this.onLog(`  绘智 AI Desktop 自动安装程序`);
        this.onLog(`${'='.repeat(50)}`);
        this.onLog(`平台: ${this.platform} (${this.arch})`);
        this.onLog(`GPU: ${this.gpuType}`);
        this.onLog(`镜像: ${this.mirror}`);
        this.onLog(`安装路径: ${this.pythonEnvDir}`);
        this.onLog(`项目路径: ${this.comfyuiPath}`);
        this.onLog(`${'='.repeat(50)}\n`);
        
        const startTime = Date.now();
        
        try {
            // 1. 安装 Python
            if (!this.isPythonDownloaded()) {
                await this.installPython();
            } else {
                this.onLog(`[跳过] Python 已安装`);
            }
            
            // 2. 安装 uv (可选，失败不影响后续)
            try {
                await this.installUv();
            } catch (e) {
                this.onLog(`[警告] uv 安装失败，继续使用 pip`);
            }
            
            // 3. 安装 PyTorch
            await this.installPyTorch();
            
            // 4. 安装绘智 AI 依赖
            await this.installComfyUIDependencies();
            
            // 完成
            const duration = ((Date.now() - startTime) / 1000 / 60).toFixed(1);
            this.onLog(`\n${'='.repeat(50)}`);
            this.onLog(`  安装完成! 耗时: ${duration} 分钟`);
            this.onLog(`${'='.repeat(50)}\n`);
            
            this.onProgress({ 
                stage: 'complete', 
                message: '安装完成!', 
                percent: 100 
            });
            
            return {
                success: true,
                pythonPath: this.getPythonPath(),
                duration: `${duration} 分钟`
            };
            
        } catch (err) {
            this.onLog(`\n[错误] 安装失败: ${err.message}`);
            this.onProgress({ 
                stage: 'error', 
                message: `安装失败: ${err.message}` 
            });
            
            return {
                success: false,
                error: err.message
            };
        }
    }

    /**
     * 获取安装状态
     */
    getStatus() {
        return {
            pythonInstalled: this.isPythonDownloaded(),
            fullyInstalled: this.isInstalled(),
            pythonPath: this.getPythonPath(),
            pythonEnvDir: this.pythonEnvDir,
            gpuType: this.gpuType
        };
    }
}

module.exports = AutoInstaller;
