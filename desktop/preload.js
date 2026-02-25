/**
 * ComfyUI Desktop - Preload 脚本
 * 安全地暴露 Electron API 给渲染进程
 */

const { contextBridge, ipcRenderer } = require('electron');

// 暴露安全的 API 到渲染进程
contextBridge.exposeInMainWorld('electronAPI', {
    // 配置管理
    getConfig: () => ipcRenderer.invoke('get-config'),
    setConfig: (config) => ipcRenderer.invoke('set-config', config),
    
    // 环境检测
    checkEnvironment: () => ipcRenderer.invoke('check-environment'),
    checkDependencies: () => ipcRenderer.invoke('check-dependencies'),
    
    // 安装相关
    getInstallStatus: () => ipcRenderer.invoke('get-install-status'),
    startAutoInstall: (options) => ipcRenderer.invoke('start-auto-install', options),
    installDependencies: (options) => ipcRenderer.invoke('install-dependencies', options),
    onInstallProgress: (callback) => {
        ipcRenderer.on('install-progress', (event, data) => callback(data));
    },
    onInstallLog: (callback) => {
        ipcRenderer.on('install-log', (event, msg) => callback(msg));
    },
    
    // 设置向导
    finishSetup: () => ipcRenderer.invoke('finish-setup'),
    
    // 模型管理
    getModels: () => ipcRenderer.invoke('get-models'),
    downloadModel: (category, modelName) => ipcRenderer.invoke('download-model', { category, modelName }),
    onDownloadProgress: (callback) => {
        ipcRenderer.on('download-progress', (event, progress) => callback(progress));
    },
    
    // 文件操作
    selectPythonPath: () => ipcRenderer.invoke('select-python-path'),
    openExternal: (url) => ipcRenderer.invoke('open-external', url),
    
    // 平台信息
    platform: process.platform,
    arch: process.arch,
    
    // 应用控制
    quit: () => ipcRenderer.send('app-quit'),
    minimize: () => ipcRenderer.send('app-minimize'),
    maximize: () => ipcRenderer.send('app-maximize')
});

// 状态更新监听
ipcRenderer.on('status', (event, message) => {
    const statusEl = document.getElementById('status-text');
    if (statusEl) {
        statusEl.textContent = message;
    }
});

console.log('ComfyUI Desktop preload script loaded');
