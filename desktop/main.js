/**
 * ComfyUI Desktop - Electron 主进程
 * 负责启动 Python 后端并显示前端界面
 * 支持首次启动向导、环境检测、模型下载
 */

const { app, BrowserWindow, dialog, ipcMain, Menu, Tray, shell } = require('electron');
const path = require('path');
const fs = require('fs');
const { spawn, execSync } = require('child_process');
const http = require('http');
const net = require('net');
const Store = require('electron-store');

// 配置存储
const store = new Store({
    defaults: {
        serverPort: 8188,
        enableAuth: true,
        pythonPath: '',
        windowBounds: { width: 1400, height: 900 },
        firstRun: true,
        autoStart: false,
        useGpu: true
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

// 获取内嵌 Python 环境路径
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
        // macOS/Linux: conda 环境
        const condaEnv = path.join(__dirname, 'python_env', 'comfyui_env', 'bin', 'python');
        if (fs.existsSync(condaEnv)) return condaEnv;
    }
    
    return null;
}

// 获取 Python 路径
function getPythonPath() {
    // 1. 检查用户自定义路径
    const customPath = store.get('pythonPath');
    if (customPath && fs.existsSync(customPath)) {
        return customPath;
    }
    
    // 2. 检查内嵌 Python
    const embeddedPython = getEmbeddedPythonPath();
    if (embeddedPython) {
        return embeddedPython;
    }
    
    // 3. 系统 Python
    if (process.platform === 'win32') {
        return 'python';
    } else if (process.platform === 'darwin') {
        // macOS - 优先使用 Homebrew/Miniconda 的 Python
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
    splashWindow = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        transparent: false,
        backgroundColor: '#1a1a1a',
        alwaysOnTop: false,
        show: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
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
            label: 'ComfyUI',
            submenu: [
                { label: '关于 ComfyUI', role: 'about' },
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
        
        tray.setToolTip('ComfyUI');
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
        sendSplashLog(`** Python executable: ${pythonPath}`);
        sendSplashLog(`** ComfyUI Path: ${comfyuiPath}`);
        sendSplashLog(`** Starting server on port: ${SERVER_PORT}`);
        sendSplashLog(`[START] Launching ComfyUI server...`);

        console.log(`Starting ComfyUI: ${pythonPath} ${args.join(' ')}`);
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
                sendSplashLog('[DONE] ComfyUI server started successfully!');
                updateSplashProgress('Starting ComfyUI', 'Server is ready!', 100);
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
                dialog.showErrorBox('服务异常', 'ComfyUI 服务已停止，请重启应用');
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
    sendSplashLog(`** ComfyUI startup time: ${startTime}`);
    sendSplashLog(`** Platform: ${process.platform === 'darwin' ? 'Darwin' : process.platform}`);
    sendSplashLog(`** Architecture: ${process.arch}`);
    sendSplashLog(`Setting output directory to: ${path.join(getResourcePath(), 'output')}`);
    sendSplashLog(`Setting input directory to: ${path.join(getResourcePath(), 'input')}`);
    sendSplashLog(`Setting user directory to: ${path.join(getResourcePath(), 'user')}`);
    
    updateSplashProgress('Starting ComfyUI', '正在初始化...');
    
    // 检查端口是否可用
    sendSplashLog(`[START] Checking port ${SERVER_PORT}...`);
    updateSplashProgress('Starting ComfyUI', '正在检查端口...');
    const portAvailable = await ensurePortAvailable(SERVER_PORT);
    if (!portAvailable) {
        sendSplashLog(`[ERROR] Port ${SERVER_PORT} is not available`);
        if (splashWindow && !splashWindow.isDestroyed()) {
            splashWindow.close();
        }
        return; // 用户取消或重启应用
    }
    sendSplashLog(`[DONE] Port ${SERVER_PORT} is available`);
    
    // 创建主窗口（但不显示）
    createMainWindow();
    
    try {
        // 启动 Python 后端
        sendSplashLog(`[START] Starting ComfyUI server...`);
        updateSplashProgress('Starting ComfyUI', '正在启动 ComfyUI 服务...');
        await startPythonServer();
        
        sendSplashLog(`[START] Loading user interface...`);
        updateSplashProgress('Starting ComfyUI', '正在加载界面...');
        
        // 等待服务器完全就绪
        await checkServerReady();
        
        sendSplashLog(`[DONE] Server is ready, loading UI...`);
        
        // 加载主界面
        mainWindow.loadURL(SERVER_URL);
        
        // 页面加载完成后显示
        mainWindow.webContents.on('did-finish-load', () => {
            sendSplashLog(`[DONE] UI loaded successfully!`);
            
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
        sendSplashLog(`[ERROR] ${error.message}`);
        
        // 不立即关闭，让用户看到错误信息
        updateSplashProgress('启动失败', error.message);
        
        // 5秒后关闭并显示错误
        setTimeout(() => {
            if (splashWindow && !splashWindow.isDestroyed()) {
                splashWindow.close();
            }
            
            dialog.showErrorBox(
                '启动失败',
                `无法启动 ComfyUI 服务:\n${error.message}\n\n请检查 Python 环境是否正确配置。`
            );
            app.quit();
        }, 3000);
    }
}

// 应用启动
app.whenReady().then(async () => {
    const isFirstRun = store.get('firstRun');
    
    if (isFirstRun) {
        // 首次启动：显示设置向导
        createSetupWindow();
    } else {
        // 正常启动
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
        firstRun: store.get('firstRun')
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
    const [python, pytorch, gpu, disk] = await Promise.all([
        checkPythonEnvironment(),
        checkPyTorch(),
        checkGPU(),
        checkDiskSpace()
    ]);
    
    return { python, pytorch, gpu, disk };
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
        updateSplashStatus('正在启动 ComfyUI 服务...');
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
            `无法启动 ComfyUI 服务:\n${error.message}\n\n请检查 Python 环境是否正确配置。`
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
