/**
 * ComfyUI Desktop - Splash 窗口 Preload 脚本
 * 为启动画面提供窗口控制和日志接收功能
 */

const { contextBridge, ipcRenderer } = require('electron');

// 暴露安全的 API 到渲染进程
contextBridge.exposeInMainWorld('splashAPI', {
    // 平台信息
    platform: process.platform,
    arch: process.arch,
    
    // 窗口控制
    closeWindow: () => ipcRenderer.send('splash-close'),
    minimizeWindow: () => ipcRenderer.send('splash-minimize'),
    maximizeWindow: () => ipcRenderer.send('splash-maximize'),
    
    // 日志监听
    onLog: (callback) => {
        ipcRenderer.on('log', (event, message) => callback(message));
    },
    
    // 状态监听
    onStatus: (callback) => {
        ipcRenderer.on('status', (event, message) => callback(message));
    },
    
    // 进度监听
    onProgress: (callback) => {
        ipcRenderer.on('progress', (event, data) => callback(data));
    },
    
    // 错误监听
    onError: (callback) => {
        ipcRenderer.on('error', (event, error) => callback(error));
    }
});

console.log('ComfyUI Splash preload script loaded');
