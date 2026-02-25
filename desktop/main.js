/**
 * 绘智 AI Desktop - Electron 主进程
 * 负责启动 Python 后端并显示前端界面
 * 支持首次启动自动安装、环境检测、模型下载
 */

const { app, BrowserWindow, dialog, ipcMain, Menu, Tray, shell } = require('electron');
const path = require('path');
const fs = require('fs');
const { spawn, execSync } = require('child_process');
const http = require('http');
const net = require('net');
const Store = require('electron-store');

// 自动安装器
const AutoInstaller = require('./scripts/auto-installer.js');

// 配置存储
const store = new Store({
    defaults: {
        serverPort: 8188,
        enableAuth: true,
        pythonPath: '',
        windowBounds: { width: 1400, height: 900 },
        firstRun: true,
        autoStart: false,
        useGpu: true,
        mirror: 'default', // 镜像源: default, aliyun, tencent, tsinghua
        gpuType: '' // 自动检测
    }
});

let mainWindow = null;
let splashWindow = null;
let setupWindow = null;
let pythonProcess = null;
let tray = null;

const SERVER_PORT = store.get('serverPort');
const SERVER_URL = `http://127.0.0.1:${SERVER_PORT}`;

// 获取资源路径
function getResourcePath() {
    if (app.isPackaged) {
        return path.join(process.resourcesPath, 'comfyui');
    }
    return path.join(__dirname, '..');
}

// 获取模型目录
function getModelsPath() {
    return path.join(getResourcePath(), 'models');
}

// 获取内置 Python 环境路径 (python-build-standalone)
function getBuiltinPythonPath() {
    const pythonEnvDir = path.join(__dirname, 'python_env', 'python');
    
    if (process.platform === 'win32') {
        const pythonPath = path.join(pythonEnvDir, 'python.exe');
        if (fs.existsSync(pythonPath)) return pythonPath;
    } else {
        const pythonPath = path.join(pythonEnvDir, 'bin', 'python3');
        if (fs.existsSync(pythonPath)) return pythonPath;
    }
    
    return null;
}

// 获取内嵌 Python 环境路径 (兼容旧版)
function getEmbeddedPythonPath() {
    const resourcePath = getResourcePath();
    
    if (process.platform === 'win32') {
        // Windows: python_embeded 或 python_env
        const paths = [
            path.join(resourcePath, 'python_embeded', 'python.exe'),
            path.join(__dirname, 'python_env', 'python', 'python.exe')
        ];
        for (const p of paths) {
            if (fs.existsSync(p)) return p;
        }
    } else {
        // macOS/Linux: python_env/python
        const paths = [
            path.join(__dirname, 'python_env', 'python', 'bin', 'python3'),
            path.join(__dirname, 'python_env', 'comfyui_env', 'bin', 'python')
        ];
        for (const p of paths) {
            if (fs.existsSync(p)) return p;
        }
    }
    
    return null;
}

// 获取 Python 路径
function getPythonPath() {
    // 1. 优先使用内置 Python (自动安装的)
    const builtinPython = getBuiltinPythonPath();
    if (builtinPython) {
        return builtinPython;
    }
    
    // 2. 检查用户自定义路径
    const customPath = store.get('pythonPath');
    if (customPath && fs.existsSync(customPath)) {
        return customPath;
    }
    
    // 3. 检查内嵌 Python (兼容旧版)
    const embeddedPython = getEmbeddedPythonPath();
    if (embeddedPython) {
        return embeddedPython;
    }
    
    // 4. 系统 Python (仅作为后备)
    if (process.platform === 'win32') {
        return 'python';
    } else if (process.platform === 'darwin') {
        const possiblePaths = [
            '/opt/homebrew/Caskroom/miniconda/base/bin/python3',
            '/opt/homebrew/bin/python3',
            '/usr/local/bin/python3',
            '/usr/bin/python3'
        ];
        for (const p of possiblePaths) {
            if (fs.existsSync(p)) {
                return p;
            }
        }
        return 'python3';
    } else {
        return 'python3';
    }
}

// 检查内置环境是否已安装
function isBuiltinEnvInstalled() {
    const pythonPath = getBuiltinPythonPath();
    if (!pythonPath) return false;
    
    // 检查关键依赖是否已安装
    try {
        execSync(`"${pythonPath}" -c "import torch"`, {
            stdio: 'pipe',
            timeout: 10000
        });
        return true;
    } catch {
        return false;
    }
}

// 检查系统环境是否可用 (检测已有的 ComfyUI 环境)
function checkExistingEnvironment() {
    console.log('检查系统中是否存在可用的 Python 环境...');
    
    // 可能的 Python 路径列表
    const possiblePythonPaths = [];
    
    if (process.platform === 'win32') {
        possiblePythonPaths.push(
            'python',
            'python3',
            path.join(process.env.LOCALAPPDATA || '', 'Programs', 'Python', 'Python312', 'python.exe'),
            path.join(process.env.LOCALAPPDATA || '', 'Programs', 'Python', 'Python311', 'python.exe'),
            path.join(process.env.LOCALAPPDATA || '', 'Programs', 'Python', 'Python310', 'python.exe'),
            'C:\\Python312\\python.exe',
            'C:\\Python311\\python.exe',
            'C:\\Python310\\python.exe'
        );
    } else if (process.platform === 'darwin') {
        possiblePythonPaths.push(
            '/opt/homebrew/Caskroom/miniconda/base/bin/python3',
            '/opt/homebrew/bin/python3',
            '/usr/local/bin/python3',
            '/usr/bin/python3',
            path.join(process.env.HOME || '', 'miniconda3', 'bin', 'python3'),
            path.join(process.env.HOME || '', 'anaconda3', 'bin', 'python3'),
            path.join(process.env.HOME || '', '.pyenv', 'shims', 'python3'),
            'python3',
            'python'
        );
    } else {
        possiblePythonPaths.push(
            '/usr/bin/python3',
            '/usr/local/bin/python3',
            path.join(process.env.HOME || '', 'miniconda3', 'bin', 'python3'),
            path.join(process.env.HOME || '', 'anaconda3', 'bin', 'python3'),
            'python3',
            'python'
        );
    }
    
    // 关键依赖列表
    const criticalDeps = ['torch', 'transformers', 'safetensors', 'aiohttp'];
    
    for (const pythonPath of possiblePythonPaths) {
        try {
            // 检查 Python 是否存在且版本 >= 3.10
            const versionOutput = execSync(`"${pythonPath}" --version`, { 
                encoding: 'utf-8', 
                stdio: ['pipe', 'pipe', 'pipe'],
                timeout: 5000 
            }).trim();
            
            const versionMatch = versionOutput.match(/Python (\d+)\.(\d+)/);
            if (!versionMatch) continue;
            
            const majorVersion = parseInt(versionMatch[1]);
            const minorVersion = parseInt(versionMatch[2]);
            
            if (majorVersion < 3 || (majorVersion === 3 && minorVersion < 10)) {
                console.log(`${pythonPath}: ${versionOutput} (版本过低，需要 3.10+)`);
                continue;
            }
            
            console.log(`发现 Python: ${pythonPath} (${versionOutput})`);
            
            // 检查关键依赖
            let hasAllDeps = true;
            const missingDeps = [];
            
            for (const dep of criticalDeps) {
                try {
                    execSync(`"${pythonPath}" -c "import ${dep}"`, {
                        stdio: ['pipe', 'pipe', 'pipe'],
                        timeout: 10000
                    });
                } catch {
                    hasAllDeps = false;
                    missingDeps.push(dep);
                }
            }
            
            if (hasAllDeps) {
                // 检查 PyTorch 的设备支持
                let deviceInfo = 'CPU';
                try {
                    const torchScript = 'import torch; cuda=torch.cuda.is_available(); mps=hasattr(torch.backends,"mps") and torch.backends.mps.is_available(); print("CUDA" if cuda else ("MPS" if mps else "CPU"))';
                    deviceInfo = execSync(`"${pythonPath}" -c '${torchScript}'`, {
                        encoding: 'utf-8',
                        stdio: ['pipe', 'pipe', 'pipe'],
                        timeout: 15000
                    }).trim();
                } catch (e) {
                    // 忽略，使用默认 CPU
                }
                
                console.log(`✓ 找到可用环境: ${pythonPath} (PyTorch: ${deviceInfo})`);
                return {
                    found: true,
                    pythonPath,
                    version: versionOutput,
                    device: deviceInfo,
                    missingDeps: []
                };
            } else {
                console.log(`${pythonPath}: 缺少依赖 ${missingDeps.join(', ')}`);
                // 记录这个有 Python 但缺少依赖的环境，后面可能用到
                return {
                    found: true,
                    pythonPath,
                    version: versionOutput,
                    device: null,
                    missingDeps,
                    needsInstall: true
                };
            }
        } catch (e) {
            // 这个路径不可用，继续下一个
            continue;
        }
    }
    
    console.log('未找到可用的 Python 环境');
    return { found: false };
}

// 检测 Python 环境
async function checkPythonEnvironment() {
    const pythonPath = getPythonPath();
    
    try {
        const result = execSync(`"${pythonPath}" --version`, { encoding: 'utf-8' });
        const version = result.trim();
        return {
            status: 'success',
            pythonPath,
            version,
            detail: version
        };
    } catch (err) {
        return {
            status: 'error',
            pythonPath: null,
            version: null,
            detail: 'Python 未安装或不在 PATH 中'
        };
    }
}

// 检测 PyTorch
async function checkPyTorch() {
    const pythonPath = getPythonPath();
    
    try {
        // 使用单行脚本避免引号转义问题
        const script = 'import torch; cuda=torch.cuda.is_available(); mps=hasattr(torch.backends,"mps") and torch.backends.mps.is_available(); v=torch.__version__; d="CUDA "+str(torch.version.cuda) if cuda else ("MPS" if mps else "CPU"); print(v+"|"+d)';
        const result = execSync(`"${pythonPath}" -c '${script}'`, { 
            encoding: 'utf-8',
            timeout: 30000,
            stdio: ['pipe', 'pipe', 'pipe']
        });
        const [version, device] = result.trim().split('|');
        return {
            status: 'success',
            version,
            device,
            detail: `PyTorch ${version} (${device})`
        };
    } catch (err) {
        console.error('PyTorch check error:', err.message);
        return {
            status: 'error',
            version: null,
            device: null,
            detail: 'PyTorch 未安装'
        };
    }
}

// 检测关键依赖
async function checkDependencies() {
    const pythonPath = getPythonPath();
    const missingPackages = [];
    
    // 需要检测的关键包
    const criticalPackages = [
        { name: 'comfy_aimdo', pip: 'comfy-aimdo' },
        { name: 'torch', pip: 'torch' },
        { name: 'transformers', pip: 'transformers' },
        { name: 'safetensors', pip: 'safetensors' }
    ];
    
    for (const pkg of criticalPackages) {
        try {
            execSync(`"${pythonPath}" -c "import ${pkg.name}"`, { 
                encoding: 'utf-8',
                timeout: 10000,
                stdio: ['pipe', 'pipe', 'pipe']
            });
        } catch (err) {
            missingPackages.push(pkg);
        }
    }
    
    return {
        status: missingPackages.length === 0 ? 'success' : 'error',
        missingPackages,
        detail: missingPackages.length === 0 
            ? '所有关键依赖已安装' 
            : `缺失依赖: ${missingPackages.map(p => p.pip).join(', ')}`
    };
}

// 安装缺失的依赖
async function installMissingDependencies(packages, onProgress) {
    const pythonPath = getPythonPath();
    const comfyuiPath = getResourcePath();
    
    for (let i = 0; i < packages.length; i++) {
        const pkg = packages[i];
        const progress = Math.round(((i + 1) / packages.length) * 100);
        
        if (onProgress) {
            onProgress(`正在安装 ${pkg.pip}...`, progress);
        }
        
        try {
            // 使用 pip 安装
            execSync(`"${pythonPath}" -m pip install ${pkg.pip}`, {
                cwd: comfyuiPath,
                encoding: 'utf-8',
                timeout: 300000, // 5 分钟超时
                stdio: ['pipe', 'pipe', 'pipe']
            });
        } catch (err) {
            console.error(`Failed to install ${pkg.pip}:`, err.message);
            throw new Error(`安装 ${pkg.pip} 失败: ${err.message}`);
        }
    }
    
    return { success: true };
}

// 安装所有依赖 (从 requirements.txt)
async function installAllDependencies(onProgress) {
    const pythonPath = getPythonPath();
    const comfyuiPath = getResourcePath();
    const requirementsPath = path.join(comfyuiPath, 'requirements.txt');
    
    if (!fs.existsSync(requirementsPath)) {
        throw new Error('requirements.txt 文件不存在');
    }
    
    if (onProgress) {
        onProgress('正在安装依赖，这可能需要几分钟...', 0);
    }
    
    try {
        const child = spawn(pythonPath, ['-m', 'pip', 'install', '-r', requirementsPath], {
            cwd: comfyuiPath,
            env: { ...process.env }
        });
        
        return new Promise((resolve, reject) => {
            child.stdout.on('data', (data) => {
                const output = data.toString().trim();
                console.log(`[pip] ${output}`);
                if (onProgress && output.includes('Successfully installed')) {
                    onProgress(output, 100);
                }
            });
            
            child.stderr.on('data', (data) => {
                const output = data.toString().trim();
                console.log(`[pip] ${output}`);
            });
            
            child.on('close', (code) => {
                if (code === 0) {
                    resolve({ success: true });
                } else {
                    reject(new Error(`pip install 退出码: ${code}`));
                }
            });
            
            child.on('error', (err) => {
                reject(err);
            });
        });
    } catch (err) {
        throw new Error(`安装依赖失败: ${err.message}`);
    }
}

// 检测 GPU
async function checkGPU() {
    if (process.platform === 'darwin') {
        // macOS: 检测 Metal/MPS
        try {
            const result = execSync('system_profiler SPDisplaysDataType', { encoding: 'utf-8' });
            const match = result.match(/Chipset Model: (.+)/);
            if (match) {
                return {
                    status: 'success',
                    gpu: match[1],
                    detail: `${match[1]} (MPS 加速可用)`
                };
            }
        } catch (err) {}
    } else if (process.platform === 'win32') {
        // Windows: 检测 NVIDIA GPU
        try {
            const result = execSync('nvidia-smi --query-gpu=name --format=csv,noheader', { encoding: 'utf-8' });
            const gpu = result.trim().split('\n')[0];
            return {
                status: 'success',
                gpu,
                detail: `${gpu} (CUDA 加速可用)`
            };
        } catch (err) {}
    }
    
    return {
        status: 'warning',
        gpu: null,
        detail: '未检测到 GPU，将使用 CPU 运行'
    };
}

// 检测磁盘空间
async function checkDiskSpace() {
    const resourcePath = getResourcePath();
    
    try {
        let freeSpace;
        if (process.platform === 'win32') {
            const drive = resourcePath.split(':')[0] + ':';
            const result = execSync(`wmic logicaldisk where "DeviceID='${drive}'" get FreeSpace`, { encoding: 'utf-8' });
            freeSpace = parseInt(result.split('\n')[1].trim());
        } else {
            const result = execSync(`df -k "${resourcePath}" | tail -1 | awk '{print $4}'`, { encoding: 'utf-8' });
            freeSpace = parseInt(result.trim()) * 1024;
        }
        
        const freeGB = (freeSpace / (1024 * 1024 * 1024)).toFixed(1);
        const status = freeSpace > 10 * 1024 * 1024 * 1024 ? 'success' : 'warning';
        
        return {
            status,
            freeSpace,
            detail: `可用空间: ${freeGB} GB`
        };
    } catch (err) {
        return {
            status: 'warning',
            freeSpace: null,
            detail: '无法检测磁盘空间'
        };
    }
}

// 检查端口是否被占用
function checkPortInUse(port) {
    return new Promise((resolve) => {
        const server = net.createServer();
        server.once('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                resolve(true); // 端口被占用
            } else {
                resolve(false);
            }
        });
        server.once('listening', () => {
            server.close();
            resolve(false); // 端口可用
        });
        server.listen(port, '127.0.0.1');
    });
}

// 获取占用端口的进程并尝试关闭
async function killProcessOnPort(port) {
    try {
        if (process.platform === 'win32') {
            // Windows
            const result = execSync(`netstat -ano | findstr :${port}`, { encoding: 'utf-8' });
            const lines = result.trim().split('\n');
            for (const line of lines) {
                const parts = line.trim().split(/\s+/);
                const pid = parts[parts.length - 1];
                if (pid && pid !== '0') {
                    try {
                        execSync(`taskkill /PID ${pid} /F`, { encoding: 'utf-8' });
                        console.log(`Killed process ${pid} on port ${port}`);
                    } catch (e) {
                        console.error(`Failed to kill process ${pid}:`, e.message);
                    }
                }
            }
        } else {
            // macOS / Linux
            try {
                const result = execSync(`lsof -ti :${port}`, { encoding: 'utf-8' });
                const pids = result.trim().split('\n').filter(p => p);
                for (const pid of pids) {
                    try {
                        execSync(`kill -9 ${pid}`, { encoding: 'utf-8' });
                        console.log(`Killed process ${pid} on port ${port}`);
                    } catch (e) {
                        console.error(`Failed to kill process ${pid}:`, e.message);
                    }
                }
            } catch (e) {
                // lsof 没找到进程
                console.log('No process found on port', port);
            }
        }
        
        // 等待端口释放
        await new Promise(resolve => setTimeout(resolve, 1000));
        return true;
    } catch (err) {
        console.error('Error killing process on port:', err.message);
        return false;
    }
}

// 确保端口可用
async function ensurePortAvailable(port) {
    const inUse = await checkPortInUse(port);
    if (!inUse) {
        return true;
    }
    
    console.log(`Port ${port} is in use, attempting to free it...`);
    
    // 获取占用端口的进程信息
    let processInfo = '';
    try {
        if (process.platform === 'win32') {
            const result = execSync(`netstat -ano | findstr :${port}`, { encoding: 'utf-8' });
            processInfo = result.trim();
        } else {
            const result = execSync(`lsof -i :${port} | head -5`, { encoding: 'utf-8' });
            processInfo = result.trim();
        }
    } catch (e) {
        // 忽略错误
    }
    
    const choice = await dialog.showMessageBox({
        type: 'warning',
        title: '端口被占用',
        message: `端口 ${port} 已被其他程序占用`,
        detail: `这可能是之前未正常关闭的 ComfyUI 进程。\n\n${processInfo ? '占用进程信息:\n' + processInfo + '\n\n' : ''}请选择处理方式：`,
        buttons: ['关闭进程并继续', '使用其他端口', '取消启动'],
        defaultId: 0,
        cancelId: 2
    });
    
    if (choice.response === 0) {
        // 尝试关闭占用端口的进程
        await killProcessOnPort(port);
        
        // 再次检查
        const stillInUse = await checkPortInUse(port);
        if (stillInUse) {
            const retry = await dialog.showMessageBox({
                type: 'error',
                title: '无法释放端口',
                message: `端口 ${port} 仍被占用`,
                detail: '无法自动关闭占用进程。\n\n您可以尝试手动关闭相关进程，或使用其他端口。',
                buttons: ['使用其他端口', '重试', '取消启动'],
                defaultId: 0,
                cancelId: 2
            });
            
            if (retry.response === 0) {
                // 使用其他端口
                return await switchToNewPort(port);
            } else if (retry.response === 1) {
                // 重试
                return await ensurePortAvailable(port);
            }
            return false;
        }
        return true;
    } else if (choice.response === 1) {
        // 更换端口
        return await switchToNewPort(port);
    } else {
        return false;
    }
}

// 切换到新端口
async function switchToNewPort(currentPort) {
    // 找到一个可用端口
    let newPort = currentPort + 1;
    while (newPort < currentPort + 100) {
        const inUse = await checkPortInUse(newPort);
        if (!inUse) {
            break;
        }
        newPort++;
    }
    
    const confirm = await dialog.showMessageBox({
        type: 'info',
        title: '更换端口',
        message: `将使用端口 ${newPort}`,
        detail: `原端口 ${currentPort} 不可用，将自动切换到端口 ${newPort}。\n\n应用将重新启动以使用新端口。`,
        buttons: ['确定', '取消'],
        defaultId: 0,
        cancelId: 1
    });
    
    if (confirm.response === 0) {
        store.set('serverPort', newPort);
        app.relaunch();
        app.exit(0);
    }
    return false;
}

// 创建启动画面（带终端输出）
function createSplashWindow() {
    // 根据平台设置不同的窗口尺寸
    const isMac = process.platform === 'darwin';
    
    splashWindow = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        transparent: false,
        backgroundColor: '#1a1a1a',
        alwaysOnTop: false,
        show: true,
        titleBarStyle: isMac ? 'hiddenInset' : 'hidden',
        trafficLightPosition: isMac ? { x: 12, y: 12 } : undefined,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload-splash.js')
        }
    });

    splashWindow.loadFile(path.join(__dirname, 'splash.html'));
    splashWindow.center();
}

// 创建设置向导窗口
function createSetupWindow() {
    setupWindow = new BrowserWindow({
        width: 900,
        height: 700,
        frame: true,
        resizable: false,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    setupWindow.loadFile(path.join(__dirname, 'setup-wizard.html'));
    setupWindow.center();
    
    setupWindow.on('closed', () => {
        setupWindow = null;
    });
}

// 创建主窗口
function createMainWindow() {
    const { width, height } = store.get('windowBounds');
    
    mainWindow = new BrowserWindow({
        width,
        height,
        minWidth: 1024,
        minHeight: 768,
        show: false,
        icon: path.join(__dirname, 'assets', 'icon.png'),
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    // 保存窗口大小
    mainWindow.on('resize', () => {
        const bounds = mainWindow.getBounds();
        store.set('windowBounds', { width: bounds.width, height: bounds.height });
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    // 创建菜单
    createMenu();
}

// 创建应用菜单
function createMenu() {
    const template = [
        {
            label: '绘智 AI',
            submenu: [
                { label: '关于 绘智 AI', role: 'about' },
                { type: 'separator' },
                {
                    label: '设置向导',
                    click: () => {
                        if (!setupWindow) {
                            createSetupWindow();
                        } else {
                            setupWindow.focus();
                        }
                    }
                },
                {
                    label: '模型管理',
                    click: () => openModelManager()
                },
                { type: 'separator' },
                {
                    label: '打开模型目录',
                    click: () => shell.openPath(getModelsPath())
                },
                { type: 'separator' },
                { label: '退出', role: 'quit' }
            ]
        },
        {
            label: '编辑',
            submenu: [
                { label: '撤销', role: 'undo' },
                { label: '重做', role: 'redo' },
                { type: 'separator' },
                { label: '剪切', role: 'cut' },
                { label: '复制', role: 'copy' },
                { label: '粘贴', role: 'paste' }
            ]
        },
        {
            label: '视图',
            submenu: [
                { label: '重新加载', role: 'reload' },
                { label: '强制重新加载', role: 'forceReload' },
                { type: 'separator' },
                { label: '实际大小', role: 'resetZoom' },
                { label: '放大', role: 'zoomIn' },
                { label: '缩小', role: 'zoomOut' },
                { type: 'separator' },
                { label: '全屏', role: 'togglefullscreen' }
            ]
        },
        {
            label: '开发',
            submenu: [
                { label: '开发者工具', role: 'toggleDevTools' }
            ]
        },
        {
            label: '帮助',
            submenu: [
                {
                    label: '文档',
                    click: async () => {
                        await shell.openExternal('https://docs.comfy.org');
                    }
                },
                {
                    label: 'GitHub',
                    click: async () => {
                        await shell.openExternal('https://github.com/comfyanonymous/ComfyUI');
                    }
                }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

// 创建系统托盘
function createTray() {
    const iconPath = path.join(__dirname, 'assets', 'tray-icon.png');
    
    // 检查图标是否存在
    if (!fs.existsSync(iconPath)) {
        console.warn('Tray icon not found, skipping tray creation');
        return;
    }
    
    try {
        tray = new Tray(iconPath);
        
        const contextMenu = Menu.buildFromTemplate([
            { label: '显示窗口', click: () => mainWindow?.show() },
            { type: 'separator' },
            { label: '重启服务', click: () => restartServer() },
            { label: '打开模型目录', click: () => shell.openPath(getModelsPath()) },
            { type: 'separator' },
            { label: '退出', click: () => app.quit() }
        ]);
        
        tray.setToolTip('绘智 AI');
        tray.setContextMenu(contextMenu);
        
        tray.on('click', () => {
            mainWindow?.show();
        });
    } catch (err) {
        console.error('Failed to create tray:', err);
    }
}

// 启动 Python 后端
function startPythonServer() {
    return new Promise((resolve, reject) => {
        const comfyuiPath = getResourcePath();
        const pythonPath = getPythonPath();
        const mainScript = path.join(comfyuiPath, 'main.py');
        
        const args = [
            mainScript,
            '--port', SERVER_PORT.toString()
        ];
        
        // 根据设置添加参数
        if (store.get('enableAuth')) {
            args.push('--enable-auth');
        }

        // 发送启动日志到 splash 窗口
        sendSplashLog(`** Python 路径: ${pythonPath}`);
        sendSplashLog(`** 项目路径: ${comfyuiPath}`);
        sendSplashLog(`** 服务端口: ${SERVER_PORT}`);
        sendSplashLog(`[启动] 正在启动绘智 AI 服务...`);

        console.log(`Starting 绘智 AI: ${pythonPath} ${args.join(' ')}`);
        console.log(`Working directory: ${comfyuiPath}`);

        pythonProcess = spawn(pythonPath, args, {
            cwd: comfyuiPath,
            env: { ...process.env }
        });

        pythonProcess.stdout.on('data', (data) => {
            const output = data.toString().trim();
            console.log(`[ComfyUI] ${output}`);
            
            // 将日志发送到启动画面
            output.split('\n').forEach(line => {
                if (line.trim()) {
                    sendSplashLog(line);
                }
            });
            
            // 检测服务器启动成功
            if (output.includes('To see the GUI go to')) {
                sendSplashLog('[完成] 绘智 AI 服务启动成功!');
                updateSplashProgress('绘智 AI', '服务已就绪!', 100);
                resolve();
            }
        });

        pythonProcess.stderr.on('data', (data) => {
            const output = data.toString().trim();
            console.error(`[ComfyUI Error] ${output}`);
            
            // stderr 也发送到启动画面（很多正常日志也输出到 stderr）
            output.split('\n').forEach(line => {
                if (line.trim()) {
                    sendSplashLog(line);
                }
            });
        });

        pythonProcess.on('error', (err) => {
            console.error('Failed to start Python process:', err);
            sendSplashLog(`[ERROR] Failed to start Python: ${err.message}`);
            reject(err);
        });

        pythonProcess.on('close', (code) => {
            console.log(`Python process exited with code ${code}`);
            if (code !== 0 && mainWindow) {
                dialog.showErrorBox('服务异常', '绘智 AI 服务已停止，请重启应用');
            }
        });

        // 超时检测
        setTimeout(() => {
            checkServerReady()
                .then(() => resolve())
                .catch(() => reject(new Error('Server start timeout')));
        }, 5000);
    });
}

// 检查服务器是否就绪
function checkServerReady() {
    return new Promise((resolve, reject) => {
        let attempts = 0;
        const maxAttempts = 60; // 最多等待 60 秒
        
        const check = () => {
            http.get(`${SERVER_URL}/api/auth/login`, (res) => {
                // 服务器响应（即使是 405 也说明服务器在运行）
                resolve();
            }).on('error', () => {
                attempts++;
                if (attempts < maxAttempts) {
                    setTimeout(check, 1000);
                } else {
                    reject(new Error('Server not responding'));
                }
            });
        };
        
        check();
    });
}

// 停止 Python 后端
function stopPythonServer() {
    if (pythonProcess) {
        pythonProcess.kill();
        pythonProcess = null;
    }
}

// 重启服务器
async function restartServer() {
    stopPythonServer();
    await startPythonServer();
    mainWindow?.reload();
}

// 打开模型管理器
function openModelManager() {
    const modelWindow = new BrowserWindow({
        width: 800,
        height: 600,
        parent: mainWindow,
        modal: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });
    
    modelWindow.loadFile(path.join(__dirname, 'setup-wizard.html'));
}

// 更新启动画面状态
function updateSplashStatus(message) {
    if (splashWindow && !splashWindow.isDestroyed()) {
        splashWindow.webContents.send('status', message);
    }
}

// 发送日志到启动画面
function sendSplashLog(message) {
    if (splashWindow && !splashWindow.isDestroyed()) {
        splashWindow.webContents.send('log', message);
    }
}

// 更新启动画面进度
function updateSplashProgress(title, message, percent = null) {
    if (splashWindow && !splashWindow.isDestroyed()) {
        splashWindow.webContents.send('progress', { title, message, percent });
    }
}

// 正常启动流程
async function normalStartup() {
    // 显示启动画面
    createSplashWindow();
    
    // 添加初始化日志
    const startTime = new Date().toISOString().replace('T', ' ').slice(0, 19);
    sendSplashLog(`** 绘智 AI 启动时间: ${startTime}`);
    sendSplashLog(`** 平台: ${process.platform === 'darwin' ? 'macOS' : process.platform}`);
    sendSplashLog(`** 架构: ${process.arch}`);
    sendSplashLog(`输出目录: ${path.join(getResourcePath(), 'output')}`);
    sendSplashLog(`输入目录: ${path.join(getResourcePath(), 'input')}`);
    sendSplashLog(`用户目录: ${path.join(getResourcePath(), 'user')}`);
    
    updateSplashProgress('绘智 AI', '正在初始化...');
    
    // 检查 Python 环境
    sendSplashLog(`[检查] 正在检查 Python 环境...`);
    updateSplashProgress('绘智 AI', '正在检查 Python 环境...');
    const pythonCheck = await checkPythonEnvironment();
    if (pythonCheck.status === 'error') {
        sendSplashLog(`[错误] 未找到 Python: ${pythonCheck.detail}`);
        updateSplashProgress('启动失败', 'Python 环境未配置');
        
        setTimeout(async () => {
            if (splashWindow && !splashWindow.isDestroyed()) {
                splashWindow.close();
            }
            const choice = await dialog.showMessageBox({
                type: 'error',
                title: 'Python 环境缺失',
                message: '绘智 AI 需要 Python 环境才能运行',
                detail: '请先安装 Python 3.10+ 或在设置向导中配置 Python 路径。',
                buttons: ['打开设置向导', '退出'],
                defaultId: 0
            });
            
            if (choice.response === 0) {
                store.set('firstRun', true);
                app.relaunch();
                app.exit(0);
            } else {
                app.quit();
            }
        }, 2000);
        return;
    }
    sendSplashLog(`[完成] 找到 Python: ${pythonCheck.version}`);
    sendSplashLog(`** Python 路径: ${pythonCheck.pythonPath}`);
    
    // 检查关键依赖
    sendSplashLog(`[检查] 正在检查依赖...`);
    updateSplashProgress('绘智 AI', '正在检查依赖...');
    const depsCheck = await checkDependencies();
    
    if (depsCheck.status === 'error') {
        sendSplashLog(`[警告] 缺少依赖: ${depsCheck.missingPackages.map(p => p.pip).join(', ')}`);
        
        const choice = await dialog.showMessageBox({
            type: 'warning',
            title: '缺失依赖',
            message: '检测到缺少必要的 Python 依赖包',
            detail: `缺失的包: ${depsCheck.missingPackages.map(p => p.pip).join(', ')}\n\n是否自动安装这些依赖？`,
            buttons: ['自动安装', '安装全部依赖', '跳过'],
            defaultId: 0,
            cancelId: 2
        });
        
        if (choice.response === 0) {
            // 安装缺失的依赖
            try {
                sendSplashLog(`[安装] 正在安装缺失的依赖...`);
                updateSplashProgress('安装依赖', '正在安装依赖...');
                
                await installMissingDependencies(depsCheck.missingPackages, (msg, progress) => {
                    sendSplashLog(msg);
                    updateSplashProgress('安装依赖', msg, progress);
                });
                
                sendSplashLog(`[完成] 依赖安装成功`);
            } catch (err) {
                sendSplashLog(`[ERROR] Failed to install dependencies: ${err.message}`);
                updateSplashProgress('安装失败', err.message);
                
                setTimeout(() => {
                    if (splashWindow && !splashWindow.isDestroyed()) {
                        splashWindow.close();
                    }
                    dialog.showErrorBox('安装失败', `无法安装依赖: ${err.message}\n\n请手动运行: pip install -r requirements.txt`);
                    app.quit();
                }, 2000);
                return;
            }
        } else if (choice.response === 1) {
            // 安装全部依赖
            try {
                sendSplashLog(`[START] Installing all dependencies from requirements.txt...`);
                updateSplashProgress('Installing Dependencies', '正在安装所有依赖，请稍候...');
                
                await installAllDependencies((msg, progress) => {
                    sendSplashLog(msg);
                    updateSplashProgress('Installing Dependencies', msg, progress);
                });
                
                sendSplashLog(`[DONE] All dependencies installed successfully`);
            } catch (err) {
                sendSplashLog(`[错误] 安装依赖失败: ${err.message}`);
                updateSplashProgress('安装失败', err.message);
                
                setTimeout(() => {
                    if (splashWindow && !splashWindow.isDestroyed()) {
                        splashWindow.close();
                    }
                    dialog.showErrorBox('安装失败', `无法安装依赖: ${err.message}`);
                    app.quit();
                }, 2000);
                return;
            }
        } else {
            // 用户选择跳过，继续启动（可能会失败）
            sendSplashLog(`[警告] 跳过依赖安装，启动可能会失败`);
        }
    } else {
        sendSplashLog(`[完成] 所有依赖已安装`);
    }
    
    // 检查端口是否可用
    sendSplashLog(`[检查] 正在检查端口 ${SERVER_PORT}...`);
    updateSplashProgress('绘智 AI', '正在检查端口...');
    const portAvailable = await ensurePortAvailable(SERVER_PORT);
    if (!portAvailable) {
        sendSplashLog(`[错误] 端口 ${SERVER_PORT} 不可用`);
        if (splashWindow && !splashWindow.isDestroyed()) {
            splashWindow.close();
        }
        return; // 用户取消或重启应用
    }
    sendSplashLog(`[完成] 端口 ${SERVER_PORT} 可用`);
    
    // 创建主窗口（但不显示）
    createMainWindow();
    
    try {
        // 启动 Python 后端
        sendSplashLog(`[启动] 正在启动绘智 AI 服务...`);
        updateSplashProgress('绘智 AI', '正在启动服务...');
        await startPythonServer();
        
        sendSplashLog(`[加载] 正在加载用户界面...`);
        updateSplashProgress('绘智 AI', '正在加载界面...');
        
        // 等待服务器完全就绪
        await checkServerReady();
        
        sendSplashLog(`[完成] 服务已就绪，正在加载界面...`);
        
        // 加载主界面
        mainWindow.loadURL(SERVER_URL);
        
        // 页面加载完成后显示
        mainWindow.webContents.on('did-finish-load', () => {
            sendSplashLog(`[完成] 界面加载成功!`);
            
            // 延迟关闭启动画面，让用户看到完成状态
            setTimeout(() => {
                // 关闭启动画面
                if (splashWindow && !splashWindow.isDestroyed()) {
                    splashWindow.close();
                }
                // 显示主窗口
                mainWindow.show();
                mainWindow.focus();
            }, 500);
        });
        
        // 创建托盘
        createTray();
        
    } catch (error) {
        console.error('Startup error:', error);
        sendSplashLog(`[错误] ${error.message}`);
        
        // 不立即关闭，让用户看到错误信息
        updateSplashProgress('启动失败', error.message);
        
        // 5秒后关闭并显示错误
        setTimeout(() => {
            if (splashWindow && !splashWindow.isDestroyed()) {
                splashWindow.close();
            }
            
            dialog.showErrorBox(
                '启动失败',
                `无法启动绘智 AI 服务:\n${error.message}\n\n请检查 Python 环境是否正确配置。`
            );
            app.quit();
        }, 3000);
    }
}

// 首次启动自动安装流程
async function firstRunInstall() {
    // 显示启动画面
    createSplashWindow();
    
    const startTime = new Date().toISOString().replace('T', ' ').slice(0, 19);
    sendSplashLog(`** 绘智 AI Desktop 首次启动 **`);
    sendSplashLog(`** 启动时间: ${startTime}`);
    sendSplashLog(`** 平台: ${process.platform} (${process.arch})`);
    sendSplashLog('');
    
    // 检查是否需要安装
    if (isBuiltinEnvInstalled()) {
        sendSplashLog('[跳过] Python 环境已安装，直接启动');
        store.set('firstRun', false);
        
        // 关闭 splash，进入正常启动
        if (splashWindow && !splashWindow.isDestroyed()) {
            splashWindow.close();
        }
        await normalStartup();
        return;
    }
    
    // 显示安装确认对话框
    const choice = await dialog.showMessageBox({
        type: 'info',
        title: '绘智 AI - 首次启动',
        message: '欢迎使用绘智 AI!',
        detail: '首次运行需要下载并安装 Python 环境和依赖包。\n\n' +
                '这个过程大约需要:\n' +
                '• 下载约 500MB 数据\n' +
                '• 安装时间约 10-30 分钟 (取决于网络速度)\n' +
                '• 安装完成后约占用 5-10GB 磁盘空间\n\n' +
                '请确保网络畅通并有足够的磁盘空间。',
        buttons: ['开始安装', '选择镜像源 (中国用户)', '退出'],
        defaultId: 0,
        cancelId: 2
    });
    
    let mirror = 'default';
    
    if (choice.response === 1) {
        // 选择镜像源
        const mirrorChoice = await dialog.showMessageBox({
            type: 'question',
            title: '选择镜像源',
            message: '请选择下载镜像源',
            detail: '中国大陆用户建议选择国内镜像以加快下载速度。',
            buttons: ['阿里云镜像', '腾讯云镜像', '清华镜像', '默认 (GitHub)'],
            defaultId: 0
        });
        
        const mirrors = ['aliyun', 'tencent', 'tsinghua', 'default'];
        mirror = mirrors[mirrorChoice.response];
        store.set('mirror', mirror);
    } else if (choice.response === 2) {
        app.quit();
        return;
    }
    
    // 创建安装器
    const installer = new AutoInstaller({
        installPath: __dirname,
        comfyuiPath: getResourcePath(),
        mirror: mirror,
        onProgress: (data) => {
            updateSplashProgress('安装环境', data.message, data.percent);
        },
        onLog: (msg) => {
            sendSplashLog(msg);
        }
    });
    
    // 开始安装
    sendSplashLog('');
    sendSplashLog('========== 开始安装 ==========');
    updateSplashProgress('安装环境', '正在准备安装...');
    
    const result = await installer.install();
    
    if (result.success) {
        sendSplashLog('');
        sendSplashLog('[成功] 安装完成!');
        sendSplashLog(`[信息] Python 路径: ${result.pythonPath}`);
        sendSplashLog(`[信息] 耗时: ${result.duration}`);
        
        // 保存 Python 路径
        store.set('pythonPath', result.pythonPath);
        store.set('firstRun', false);
        
        updateSplashProgress('安装完成', '正在启动绘智 AI...', 100);
        
        // 短暂延迟后关闭 splash 并启动
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        if (splashWindow && !splashWindow.isDestroyed()) {
            splashWindow.close();
        }
        
        // 启动 ComfyUI
        await normalStartup();
    } else {
        sendSplashLog('');
        sendSplashLog(`[错误] 安装失败: ${result.error}`);
        updateSplashProgress('安装失败', result.error);
        
        // 显示错误对话框
        setTimeout(async () => {
            if (splashWindow && !splashWindow.isDestroyed()) {
                splashWindow.close();
            }
            
            const retryChoice = await dialog.showMessageBox({
                type: 'error',
                title: '安装失败',
                message: '环境安装失败',
                detail: `错误信息: ${result.error}\n\n您可以:\n1. 重试安装\n2. 手动安装 Python 环境\n3. 查看帮助文档`,
                buttons: ['重试', '退出'],
                defaultId: 0
            });
            
            if (retryChoice.response === 0) {
                app.relaunch();
                app.exit(0);
            } else {
                app.quit();
            }
        }, 3000);
    }
}

// 应用启动
app.whenReady().then(async () => {
    const isFirstRun = store.get('firstRun');
    const hasBuiltinEnv = isBuiltinEnvInstalled();
    
    console.log(`首次运行: ${isFirstRun}, 内置环境: ${hasBuiltinEnv}`);
    
    // 首先检查是否已有可用的系统环境
    if (isFirstRun && !hasBuiltinEnv) {
        console.log('首次启动，检查系统中是否存在可用环境...');
        
        const existingEnv = checkExistingEnvironment();
        
        if (existingEnv.found && !existingEnv.needsInstall) {
            // 找到完整可用的环境，直接使用
            console.log(`发现可用环境: ${existingEnv.pythonPath}`);
            
            const useExisting = await dialog.showMessageBox({
                type: 'info',
                title: '发现可用环境',
                message: '检测到系统中已存在可用的 Python 环境',
                detail: `路径: ${existingEnv.pythonPath}\n版本: ${existingEnv.version}\n加速: ${existingEnv.device}\n\n是否使用此环境运行绘智 AI？\n\n选择"使用现有环境"可立即启动，无需等待安装。`,
                buttons: ['使用现有环境', '安装独立环境'],
                defaultId: 0,
                cancelId: 1
            });
            
            if (useExisting.response === 0) {
                // 使用现有环境
                store.set('pythonPath', existingEnv.pythonPath);
                store.set('firstRun', false);
                console.log('使用现有系统环境');
                await normalStartup();
                return;
            }
            // 否则继续安装独立环境
        } else if (existingEnv.found && existingEnv.needsInstall) {
            // 找到 Python 但缺少依赖
            console.log(`发现 Python 但缺少依赖: ${existingEnv.missingDeps.join(', ')}`);
            
            const installChoice = await dialog.showMessageBox({
                type: 'question',
                title: '发现 Python 环境',
                message: '检测到系统中已有 Python，但缺少部分依赖',
                detail: `路径: ${existingEnv.pythonPath}\n版本: ${existingEnv.version}\n\n缺少的依赖: ${existingEnv.missingDeps.join(', ')}\n\n您可以:\n• 在现有环境中安装缺失的依赖（较快）\n• 安装独立环境（完全隔离，更稳定）`,
                buttons: ['安装缺失依赖', '安装独立环境', '退出'],
                defaultId: 0,
                cancelId: 2
            });
            
            if (installChoice.response === 0) {
                // 在现有环境中安装依赖
                store.set('pythonPath', existingEnv.pythonPath);
                store.set('firstRun', false);
                await normalStartup(); // normalStartup 会检测并安装缺失依赖
                return;
            } else if (installChoice.response === 2) {
                app.quit();
                return;
            }
            // 继续安装独立环境
        }
        
        // 没有找到可用环境，或用户选择安装独立环境
        await firstRunInstall();
    } else {
        // 正常启动
        if (isFirstRun) {
            store.set('firstRun', false);
        }
        await normalStartup();
    }
});

// 所有窗口关闭时退出（macOS 除外）
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// 应用退出前清理
app.on('before-quit', () => {
    stopPythonServer();
});

// macOS 激活应用
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        if (store.get('firstRun')) {
            createSetupWindow();
        } else {
            createMainWindow();
            mainWindow.loadURL(SERVER_URL);
            mainWindow.show();
        }
    }
});

// ============ IPC 通信 ============

// 获取配置
ipcMain.handle('get-config', () => {
    return {
        serverUrl: SERVER_URL,
        serverPort: store.get('serverPort'),
        enableAuth: store.get('enableAuth'),
        autoStart: store.get('autoStart'),
        useGpu: store.get('useGpu'),
        firstRun: store.get('firstRun'),
        mirror: store.get('mirror'),
        gpuType: store.get('gpuType')
    };
});

// 保存配置
ipcMain.handle('set-config', (event, config) => {
    Object.keys(config).forEach(key => {
        store.set(key, config[key]);
    });
    return { success: true };
});

// 环境检测
ipcMain.handle('check-environment', async () => {
    const [python, pytorch, gpu, disk, deps] = await Promise.all([
        checkPythonEnvironment(),
        checkPyTorch(),
        checkGPU(),
        checkDiskSpace(),
        checkDependencies()
    ]);
    
    // 添加内置环境状态
    const builtinEnv = {
        installed: isBuiltinEnvInstalled(),
        pythonPath: getBuiltinPythonPath()
    };
    
    return { python, pytorch, gpu, disk, deps, builtinEnv };
});

// 检测依赖
ipcMain.handle('check-dependencies', async () => {
    return await checkDependencies();
});

// 获取安装状态
ipcMain.handle('get-install-status', async () => {
    const installer = new AutoInstaller({
        installPath: __dirname,
        comfyuiPath: getResourcePath()
    });
    return installer.getStatus();
});

// 开始自动安装
ipcMain.handle('start-auto-install', async (event, options = {}) => {
    const installer = new AutoInstaller({
        installPath: __dirname,
        comfyuiPath: getResourcePath(),
        mirror: options.mirror || store.get('mirror') || 'default',
        gpuType: options.gpuType || store.get('gpuType') || undefined,
        onProgress: (data) => {
            event.sender.send('install-progress', data);
        },
        onLog: (msg) => {
            event.sender.send('install-log', msg);
        }
    });
    
    const result = await installer.install();
    
    if (result.success) {
        store.set('pythonPath', result.pythonPath);
        store.set('firstRun', false);
    }
    
    return result;
});

// 安装依赖
ipcMain.handle('install-dependencies', async (event, { packages, installAll }) => {
    try {
        if (installAll) {
            await installAllDependencies((msg, progress) => {
                event.sender.send('install-progress', { message: msg, progress });
            });
        } else if (packages && packages.length > 0) {
            await installMissingDependencies(packages, (msg, progress) => {
                event.sender.send('install-progress', { message: msg, progress });
            });
        }
        return { success: true };
    } catch (err) {
        return { success: false, error: err.message };
    }
});

// 完成设置向导
ipcMain.handle('finish-setup', async () => {
    store.set('firstRun', false);
    
    try {
        // 先显示启动画面
        createSplashWindow();
        updateSplashStatus('正在初始化...');
        
        // 检查端口是否可用
        updateSplashStatus('正在检查端口...');
        const portAvailable = await ensurePortAvailable(SERVER_PORT);
        if (!portAvailable) {
            if (splashWindow && !splashWindow.isDestroyed()) {
                splashWindow.close();
            }
            return { success: false, error: '端口不可用' };
        }
        
        // 创建主窗口
        createMainWindow();
        
        // 关闭设置窗口
        if (setupWindow && !setupWindow.isDestroyed()) {
            setupWindow.close();
        }
        
        // 启动 Python 后端
        updateSplashStatus('正在启动绘智 AI 服务...');
        await startPythonServer();
        
        updateSplashStatus('正在加载界面...');
        
        // 等待服务器完全就绪
        await checkServerReady();
        
        // 加载主界面
        mainWindow.loadURL(SERVER_URL);
        
        // 页面加载完成后显示
        mainWindow.webContents.on('did-finish-load', () => {
            // 关闭启动画面
            if (splashWindow && !splashWindow.isDestroyed()) {
                splashWindow.close();
            }
            // 显示主窗口
            mainWindow.show();
            mainWindow.focus();
        });
        
        // 创建托盘
        createTray();
        
        return { success: true };
        
    } catch (error) {
        console.error('Startup error:', error);
        
        if (splashWindow && !splashWindow.isDestroyed()) {
            splashWindow.close();
        }
        
        dialog.showErrorBox(
            '启动失败',
            `无法启动绘智 AI 服务:\n${error.message}\n\n请检查 Python 环境是否正确配置。`
        );
        
        return { success: false, error: error.message };
    }
});

// 获取模型列表
ipcMain.handle('get-models', () => {
    const ModelDownloader = require('./scripts/download-models.js');
    const downloader = new ModelDownloader(getModelsPath());
    return downloader.getInstalledModels();
});

// 下载模型
ipcMain.handle('download-model', async (event, { category, modelName }) => {
    const ModelDownloader = require('./scripts/download-models.js');
    const downloader = new ModelDownloader(getModelsPath());
    
    try {
        const result = await downloader.downloadModel(category, modelName, (progress) => {
            // 发送进度更新到渲染进程
            event.sender.send('download-progress', progress);
        });
        return result;
    } catch (err) {
        return { success: false, error: err.message };
    }
});

// 打开外部链接
ipcMain.handle('open-external', (event, url) => {
    shell.openExternal(url);
});

// 选择 Python 路径
ipcMain.handle('select-python-path', async () => {
    const result = await dialog.showOpenDialog({
        title: '选择 Python 可执行文件',
        filters: process.platform === 'win32' 
            ? [{ name: 'Python', extensions: ['exe'] }]
            : [],
        properties: ['openFile']
    });
    
    if (!result.canceled && result.filePaths.length > 0) {
        const pythonPath = result.filePaths[0];
        store.set('pythonPath', pythonPath);
        return { success: true, path: pythonPath };
    }
    
    return { success: false };
});

// ============ Splash 窗口控制 ============

ipcMain.on('splash-close', () => {
    if (splashWindow && !splashWindow.isDestroyed()) {
        splashWindow.close();
    }
    app.quit();
});

ipcMain.on('splash-minimize', () => {
    if (splashWindow && !splashWindow.isDestroyed()) {
        splashWindow.minimize();
    }
});

ipcMain.on('splash-maximize', () => {
    if (splashWindow && !splashWindow.isDestroyed()) {
        if (splashWindow.isMaximized()) {
            splashWindow.unmaximize();
        } else {
            splashWindow.maximize();
        }
    }
});
