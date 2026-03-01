/**
 * 绘智 AI 用户信息显示扩展
 * 功能：
 * 1. 在界面右上角显示当前登录用户信息和退出登录按钮
 * 2. 自动刷新 ComfyOrg Token (1小时过期)
 * 3. 拦截 /prompt 请求，自动注入 auth_token_comfy_org
 * 4. 模拟 Firebase Auth 状态，让 ComfyUI 前端认为用户已登录
 */

(function() {
    'use strict';

    // ========== 配置 ==========
    const AUTH_SERVICE_URL = 'http://localhost:3001';
    
    const STORAGE_KEYS = {
        HUIZHI_TOKEN: 'huizhi_token',
        COMFY_ORG_TOKEN: 'comfy_org_token',
        COMFY_ORG_EXPIRY: 'comfy_org_token_expiry',
        USER_INFO: 'huizhi_user',
        COMFY_TOKEN: 'comfy_token',
    };

    // Token 刷新阈值 (提前 5 分钟刷新)
    const TOKEN_REFRESH_THRESHOLD = 5 * 60 * 1000;
    
    // 刷新定时器
    let tokenRefreshTimer = null;

    // ========== 初始化 ==========
    function init() {
        if (document.getElementById('comfy-user-panel')) {
            return;
        }

        const huizhiToken = localStorage.getItem(STORAGE_KEYS.HUIZHI_TOKEN);
        const userStr = localStorage.getItem(STORAGE_KEYS.USER_INFO) || localStorage.getItem('comfy_user');
        
        if (!huizhiToken || !userStr) {
            window.location.href = '/login';
            return;
        }

        let user;
        try {
            user = JSON.parse(userStr);
        } catch (e) {
            console.error('[HuizhiAuth] Failed to parse user info:', e);
            window.location.href = '/login';
            return;
        }

        // 创建用户面板
        createUserPanel(user);
        
        // 设置 Token 自动刷新
        setupTokenRefresh();
        
        // 拦截 fetch 请求，自动注入 ComfyOrg Token
        interceptFetch();
        
        // 模拟 Firebase Auth 状态 (让 ComfyUI 前端认为用户已登录)
        simulateFirebaseAuth(user);
        
        console.log('[HuizhiAuth] Initialized for user:', user.username);
    }

    // ========== 模拟 Firebase Auth 状态 ==========
    function simulateFirebaseAuth(user) {
        const comfyOrgToken = localStorage.getItem(STORAGE_KEYS.COMFY_ORG_TOKEN);
        if (!comfyOrgToken) {
            console.warn('[HuizhiAuth] No ComfyOrg token for Firebase simulation');
            return;
        }

        // ComfyUI 前端使用 IndexedDB 存储 Firebase Auth 状态
        // 数据库名: firebaseLocalStorageDb, 表: firebaseLocalStorage
        // key: firebase:authUser:<apiKey>:<appName>
        const FIREBASE_API_KEY = 'AIzaSyC2-fomLqgCjb7ELwta1I9cEarPK8ziTGs';
        const FIREBASE_APP_NAME = '[DEFAULT]';
        const storageKey = `firebase:authUser:${FIREBASE_API_KEY}:${FIREBASE_APP_NAME}`;
        
        // 解析 JWT 获取用户信息
        let tokenPayload = {};
        try {
            const parts = comfyOrgToken.split('.');
            if (parts.length === 3) {
                tokenPayload = JSON.parse(atob(parts[1]));
            }
        } catch (e) {
            console.warn('[HuizhiAuth] Failed to parse ComfyOrg token:', e);
        }

        // 构造 Firebase User 对象
        const firebaseUser = {
            uid: tokenPayload.user_id || tokenPayload.sub || user.comfyOrgUid,
            email: tokenPayload.email || user.email,
            emailVerified: tokenPayload.email_verified || false,
            displayName: user.username,
            isAnonymous: false,
            providerData: [{
                providerId: 'password',
                uid: tokenPayload.email || user.email,
                displayName: user.username,
                email: tokenPayload.email || user.email,
                phoneNumber: null,
                photoURL: null
            }],
            stsTokenManager: {
                refreshToken: '', // 我们不存储 refresh token 在前端
                accessToken: comfyOrgToken,
                expirationTime: parseInt(localStorage.getItem(STORAGE_KEYS.COMFY_ORG_EXPIRY) || Date.now() + 3600000)
            },
            createdAt: String(Date.now()),
            lastLoginAt: String(Date.now()),
            apiKey: FIREBASE_API_KEY,
            appName: FIREBASE_APP_NAME
        };

        // 方法 1: 写入 IndexedDB (Firebase Auth 主要存储)
        writeToFirebaseIndexedDB(storageKey, firebaseUser);
        
        // 方法 2: 同时写入 localStorage 作为备份
        try {
            localStorage.setItem(storageKey, JSON.stringify(firebaseUser));
            console.log('[HuizhiAuth] Firebase auth state written to localStorage');
        } catch (e) {
            console.warn('[HuizhiAuth] Failed to write Firebase state to localStorage:', e);
        }
        
        // 方法 3: 通过 window 对象暴露 token 获取方法 (供 ComfyUI 前端调用)
        window.__HUIZHI_GET_COMFY_ORG_TOKEN__ = function() {
            return localStorage.getItem(STORAGE_KEYS.COMFY_ORG_TOKEN);
        };
        
        console.log('[HuizhiAuth] Firebase auth state simulated for uid:', firebaseUser.uid);
    }

    // 写入 Firebase IndexedDB
    function writeToFirebaseIndexedDB(key, value) {
        const dbName = 'firebaseLocalStorageDb';
        const storeName = 'firebaseLocalStorage';
        
        const request = indexedDB.open(dbName, 1);
        
        request.onerror = function(event) {
            console.warn('[HuizhiAuth] IndexedDB open error:', event.target.error);
        };
        
        request.onupgradeneeded = function(event) {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(storeName)) {
                db.createObjectStore(storeName);
            }
        };
        
        request.onsuccess = function(event) {
            const db = event.target.result;
            try {
                const transaction = db.transaction([storeName], 'readwrite');
                const store = transaction.objectStore(storeName);
                
                const putRequest = store.put({
                    fbase_key: key,
                    value: value
                }, key);
                
                putRequest.onsuccess = function() {
                    console.log('[HuizhiAuth] Firebase auth state written to IndexedDB');
                };
                
                putRequest.onerror = function(e) {
                    console.warn('[HuizhiAuth] IndexedDB put error:', e.target.error);
                };
            } catch (e) {
                console.warn('[HuizhiAuth] IndexedDB transaction error:', e);
            }
        };
    }

    // ========== Token 刷新 ==========
    function setupTokenRefresh() {
        const expiryStr = localStorage.getItem(STORAGE_KEYS.COMFY_ORG_EXPIRY);
        if (!expiryStr) return;

        const expiry = parseInt(expiryStr, 10);
        const now = Date.now();
        const timeUntilRefresh = expiry - now - TOKEN_REFRESH_THRESHOLD;

        if (timeUntilRefresh <= 0) {
            // Token 快过期或已过期，立即刷新
            refreshComfyOrgToken();
        } else {
            // 设置定时刷新
            if (tokenRefreshTimer) clearTimeout(tokenRefreshTimer);
            tokenRefreshTimer = setTimeout(refreshComfyOrgToken, timeUntilRefresh);
            console.log('[HuizhiAuth] Token refresh scheduled in', Math.round(timeUntilRefresh / 1000 / 60), 'minutes');
        }
    }

    async function refreshComfyOrgToken() {
        const huizhiToken = localStorage.getItem(STORAGE_KEYS.HUIZHI_TOKEN);
        if (!huizhiToken) {
            console.warn('[HuizhiAuth] No huizhi token for refresh');
            return;
        }

        try {
            const response = await fetch(`${AUTH_SERVICE_URL}/api/auth/refresh-comfy-token`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${huizhiToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const result = await response.json();
                if (result.data && result.data.comfyOrgToken) {
                    localStorage.setItem(STORAGE_KEYS.COMFY_ORG_TOKEN, result.data.comfyOrgToken);
                    const newExpiry = Date.now() + (result.data.expiresIn || 3600) * 1000;
                    localStorage.setItem(STORAGE_KEYS.COMFY_ORG_EXPIRY, newExpiry.toString());
                    console.log('[HuizhiAuth] ComfyOrg token refreshed successfully');
                    
                    // 重新设置下一次刷新
                    setupTokenRefresh();
                }
            } else if (response.status === 401) {
                // Huizhi token 过期，需要重新登录
                console.warn('[HuizhiAuth] Session expired, redirecting to login');
                handleLogout(false);
            }
        } catch (err) {
            console.error('[HuizhiAuth] Failed to refresh token:', err);
            // 5 分钟后重试
            if (tokenRefreshTimer) clearTimeout(tokenRefreshTimer);
            tokenRefreshTimer = setTimeout(refreshComfyOrgToken, 5 * 60 * 1000);
        }
    }

    // ========== 拦截 fetch 请求 ==========
    function interceptFetch() {
        const originalFetch = window.fetch;
        
        window.fetch = async function(input, init = {}) {
            const url = typeof input === 'string' ? input : input.url;
            
            // 判断是否为同源请求
            const isSameOrigin = !url.startsWith('http://') && !url.startsWith('https://') 
                || url.startsWith(window.location.origin);
            
            // 获取绘智 Token (用于后端认证)
            const huizhiToken = localStorage.getItem(STORAGE_KEYS.HUIZHI_TOKEN);
            
            // 为同源请求添加认证信息
            if (huizhiToken && isSameOrigin) {
                // 确保携带 Cookie
                if (!init.credentials) {
                    init.credentials = 'same-origin';
                }
                
                // 初始化 headers
                if (!init.headers) {
                    init.headers = {};
                }
                // 如果 headers 是 Headers 对象，转换为普通对象
                if (init.headers instanceof Headers) {
                    const headersObj = {};
                    init.headers.forEach((value, key) => {
                        headersObj[key] = value;
                    });
                    init.headers = headersObj;
                }
                // 添加 Authorization Header (如果未设置)
                if (!init.headers['Authorization']) {
                    init.headers['Authorization'] = `Bearer ${huizhiToken}`;
                }
            }
            
            // 对于 /prompt 请求，注入 ComfyOrg Token 到 body
            if (url.includes('/prompt') && init.method?.toUpperCase() === 'POST') {
                try {
                    let body = init.body;
                    if (typeof body === 'string') {
                        body = JSON.parse(body);
                    }
                    
                    // 注入 ComfyOrg Token (用于 API 节点)
                    const comfyOrgToken = localStorage.getItem(STORAGE_KEYS.COMFY_ORG_TOKEN);
                    if (comfyOrgToken) {
                        if (!body.extra_data) {
                            body.extra_data = {};
                        }
                        body.extra_data.auth_token_comfy_org = comfyOrgToken;
                        
                        init.body = JSON.stringify(body);
                        console.log('[HuizhiAuth] Injected ComfyOrg token into prompt request');
                    }
                } catch (e) {
                    console.warn('[HuizhiAuth] Failed to inject token:', e);
                }
            }
            
            return originalFetch.call(this, input, init);
        };
        
        console.log('[HuizhiAuth] Fetch interceptor installed');
    }

    // ========== 创建用户面板 ==========
    function createUserPanel(user) {
        const style = document.createElement('style');
        style.id = 'comfy-user-panel-style';
        style.textContent = `
            #comfy-user-panel {
                position: fixed;
                top: 8px;
                right: 16px;
                z-index: 99999;
                display: flex;
                align-items: center;
                gap: 12px;
                background: rgba(35, 35, 45, 0.95);
                padding: 6px 12px 6px 8px;
                border-radius: 20px;
                border: 1px solid rgba(255, 255, 255, 0.12);
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
            }

            #comfy-user-panel .user-section {
                display: flex;
                align-items: center;
                gap: 8px;
                cursor: pointer;
                padding: 4px 8px 4px 4px;
                border-radius: 16px;
                transition: background 0.2s;
            }

            #comfy-user-panel .user-section:hover {
                background: rgba(255, 255, 255, 0.08);
            }

            #comfy-user-panel .user-avatar {
                width: 28px;
                height: 28px;
                border-radius: 50%;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: 600;
                font-size: 12px;
                text-transform: uppercase;
                flex-shrink: 0;
            }

            #comfy-user-panel .user-info {
                display: flex;
                flex-direction: column;
                gap: 1px;
            }

            #comfy-user-panel .user-name {
                color: #fff;
                font-size: 12px;
                font-weight: 500;
                line-height: 1.2;
            }

            #comfy-user-panel .user-role {
                color: rgba(255, 255, 255, 0.5);
                font-size: 10px;
                line-height: 1.2;
            }

            #comfy-user-panel .user-role.admin {
                color: #ffd700;
            }

            #comfy-user-panel .token-status {
                display: flex;
                align-items: center;
                gap: 4px;
                padding: 3px 8px;
                background: rgba(52, 199, 89, 0.15);
                border-radius: 10px;
                font-size: 10px;
                color: #52c959;
            }

            #comfy-user-panel .token-status.warning {
                background: rgba(255, 204, 0, 0.15);
                color: #ffcc00;
            }

            #comfy-user-panel .token-status.error {
                background: rgba(255, 59, 48, 0.15);
                color: #ff6b6b;
            }

            #comfy-user-panel .token-dot {
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background: currentColor;
            }

            #comfy-user-panel .divider {
                width: 1px;
                height: 20px;
                background: rgba(255, 255, 255, 0.15);
            }

            #comfy-user-panel .logout-btn {
                background: transparent;
                border: 1px solid rgba(255, 100, 100, 0.5);
                color: #ff7b7b;
                padding: 5px 12px;
                border-radius: 12px;
                cursor: pointer;
                font-size: 11px;
                font-weight: 500;
                transition: all 0.2s ease;
                white-space: nowrap;
            }

            #comfy-user-panel .logout-btn:hover {
                background: rgba(255, 100, 100, 0.15);
                border-color: rgba(255, 100, 100, 0.8);
                color: #ff9b9b;
            }

            /* 用户信息弹窗 */
            #comfy-user-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.6);
                z-index: 100000;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                visibility: hidden;
                transition: all 0.2s ease;
            }

            #comfy-user-modal.show {
                opacity: 1;
                visibility: visible;
            }

            #comfy-user-modal .modal-content {
                background: rgba(40, 40, 50, 0.98);
                border-radius: 16px;
                padding: 24px;
                min-width: 360px;
                max-width: 420px;
                border: 1px solid rgba(255, 255, 255, 0.1);
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
                transform: scale(0.9);
                transition: transform 0.2s ease;
            }

            #comfy-user-modal.show .modal-content {
                transform: scale(1);
            }

            #comfy-user-modal .modal-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 20px;
                padding-bottom: 16px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }

            #comfy-user-modal .modal-title {
                color: #fff;
                font-size: 18px;
                font-weight: 600;
            }

            #comfy-user-modal .modal-close {
                background: none;
                border: none;
                color: rgba(255, 255, 255, 0.5);
                cursor: pointer;
                font-size: 24px;
                line-height: 1;
                padding: 4px;
            }

            #comfy-user-modal .modal-close:hover {
                color: #fff;
            }

            #comfy-user-modal .info-row {
                display: flex;
                justify-content: space-between;
                padding: 10px 0;
                border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            }

            #comfy-user-modal .info-label {
                color: rgba(255, 255, 255, 0.5);
                font-size: 13px;
            }

            #comfy-user-modal .info-value {
                color: #fff;
                font-size: 13px;
                font-weight: 500;
            }

            #comfy-user-modal .info-value.success {
                color: #52c959;
            }

            #comfy-user-modal .info-value.warning {
                color: #ffcc00;
            }

            #comfy-user-modal .comfy-link {
                display: block;
                margin-top: 16px;
                padding: 12px;
                background: rgba(59, 130, 246, 0.1);
                border: 1px solid rgba(59, 130, 246, 0.3);
                border-radius: 10px;
                color: #60a5fa;
                text-decoration: none;
                text-align: center;
                font-size: 13px;
                transition: all 0.2s;
            }

            #comfy-user-modal .comfy-link:hover {
                background: rgba(59, 130, 246, 0.2);
                border-color: rgba(59, 130, 246, 0.5);
            }
        `;
        document.head.appendChild(style);

        const panel = document.createElement('div');
        panel.id = 'comfy-user-panel';
        
        const avatarLetter = user.username ? user.username.charAt(0).toUpperCase() : 'U';
        const roleText = user.role === 'admin' ? '管理员' : '用户';
        const roleClass = user.role === 'admin' ? 'admin' : '';

        // 检查 Token 状态（后台使用，不再显示在界面上）
        // const tokenStatus = getTokenStatus();

        panel.innerHTML = `
            <div class="user-section" id="user-section-btn">
                <div class="user-avatar">${escapeHtml(avatarLetter)}</div>
                <div class="user-info">
                    <span class="user-name">${escapeHtml(user.username)}</span>
                    <span class="user-role ${roleClass}">${roleText}</span>
                </div>
            </div>
            <div class="divider"></div>
            <button class="logout-btn" id="logout-btn">退出</button>
        `;

        document.body.appendChild(panel);

        // 创建弹窗
        createUserModal(user);
        
        // 绑定事件
        bindEvents();
    }

    function getTokenStatus() {
        const comfyOrgToken = localStorage.getItem(STORAGE_KEYS.COMFY_ORG_TOKEN);
        const expiryStr = localStorage.getItem(STORAGE_KEYS.COMFY_ORG_EXPIRY);
        
        if (!comfyOrgToken) {
            return { class: 'error', text: '未连接' };
        }
        
        if (expiryStr) {
            const expiry = parseInt(expiryStr, 10);
            const remaining = expiry - Date.now();
            
            if (remaining < 0) {
                return { class: 'error', text: '已过期' };
            } else if (remaining < 10 * 60 * 1000) {
                return { class: 'warning', text: '即将过期' };
            }
        }
        
        return { class: '', text: 'API 就绪' };
    }

    function updateTokenStatusDisplay() {
        const statusEl = document.getElementById('token-status');
        if (statusEl) {
            const status = getTokenStatus();
            statusEl.className = `token-status ${status.class}`;
            statusEl.innerHTML = `<span class="token-dot"></span><span>${status.text}</span>`;
        }
    }

    function createUserModal(user) {
        const modal = document.createElement('div');
        modal.id = 'comfy-user-modal';
        
        const createdAt = user.created_at || user.createdAt;
        const lastLogin = user.last_login || user.lastLogin;
        const createdAtStr = createdAt ? new Date(createdAt).toLocaleString('zh-CN') : '未知';
        const lastLoginStr = lastLogin ? new Date(lastLogin).toLocaleString('zh-CN') : '首次登录';
        
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <span class="modal-title">👤 个人信息</span>
                    <button class="modal-close" id="modal-close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="info-row">
                        <span class="info-label">用户名</span>
                        <span class="info-value">${escapeHtml(user.username)}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">邮箱</span>
                        <span class="info-value">${escapeHtml(user.email)}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">角色</span>
                        <span class="info-value">${user.role === 'admin' ? '管理员' : '普通用户'}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">注册时间</span>
                        <span class="info-value">${createdAtStr}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">上次登录</span>
                        <span class="info-value">${lastLoginStr}</span>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    function bindEvents() {
        const userSection = document.getElementById('user-section-btn');
        const modal = document.getElementById('comfy-user-modal');
        const modalCloseBtn = document.getElementById('modal-close-btn');
        const logoutBtn = document.getElementById('logout-btn');

        if (userSection && modal) {
            userSection.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                modal.classList.add('show');
            });
        }

        if (modalCloseBtn && modal) {
            modalCloseBtn.addEventListener('click', (e) => {
                e.preventDefault();
                modal.classList.remove('show');
            });
        }

        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('show');
                }
            });
        }

        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                handleLogout(true);
            });
        }
    }

    function escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function handleLogout(confirm_logout = true) {
        if (confirm_logout && !confirm('确定要退出登录吗？')) {
            return;
        }

        console.log('[HuizhiAuth] ========== Starting logout process ==========');

        // ============ 第1步: 立即设置全局退出标志 ============
        // 这些标志会被 api.ts 中的 WebSocket 重连逻辑检查
        window.__HUIZHI_LOGOUT_IN_PROGRESS__ = true;
        sessionStorage.setItem('comfy_logout_in_progress', 'true');
        
        // 在 window 上也标记，防止任何异步代码检查
        Object.defineProperty(window, '__LOGOUT_ACTIVE__', {
            value: true,
            writable: false,
            configurable: false
        });
        
        console.log('[HuizhiAuth] Step 1: Logout flags set');

        // ============ 第2步: 保存原始 WebSocket 和 fetch ============
        const OriginalWebSocket = window.WebSocket;
        const originalFetch = window.fetch;

        // ============ 第3步: 清除所有定时器 ============
        if (tokenRefreshTimer) {
            clearTimeout(tokenRefreshTimer);
            tokenRefreshTimer = null;
        }
        
        // 暴力清除所有 setTimeout 和 setInterval
        // 获取当前最高 ID
        const highestTimeoutId = setTimeout(() => {}, 0);
        const highestIntervalId = setInterval(() => {}, 10000);
        clearInterval(highestIntervalId);
        
        console.log('[HuizhiAuth] Step 3: Clearing timers up to ID', Math.max(highestTimeoutId, highestIntervalId));
        
        for (let i = 0; i <= Math.max(highestTimeoutId, highestIntervalId) + 100; i++) {
            try { clearTimeout(i); } catch(e) {}
            try { clearInterval(i); } catch(e) {}
        }
        
        // 覆盖 setTimeout 和 setInterval 阻止新的定时器
        const noopTimer = () => {
            console.log('[HuizhiAuth] Timer blocked during logout');
            return -1;
        };
        window.setTimeout = noopTimer;
        window.setInterval = noopTimer;
        
        console.log('[HuizhiAuth] Step 3: All timers cleared and blocked');

        // ============ 第4步: 关闭 WebSocket 连接 ============
        const closeWebSocket = (socket, name) => {
            if (!socket) return;
            try {
                // 先移除所有事件监听器
                socket.onopen = null;
                socket.onclose = null;
                socket.onerror = null;
                socket.onmessage = null;
                
                // 如果 socket 还在连接中，强制关闭
                if (socket.readyState === WebSocket.CONNECTING || 
                    socket.readyState === WebSocket.OPEN) {
                    socket.close(1000, 'User logout');
                }
                console.log('[HuizhiAuth] WebSocket closed:', name);
            } catch (e) {
                console.warn('[HuizhiAuth] Error closing WebSocket:', name, e);
            }
        };

        // 关闭 ComfyUI API 的 WebSocket
        if (window.app && window.app.api && window.app.api.socket) {
            closeWebSocket(window.app.api.socket, 'app.api.socket');
            window.app.api.socket = null;
        }
        
        // 尝试查找并关闭其他可能的 WebSocket
        if (window.api && window.api.socket) {
            closeWebSocket(window.api.socket, 'api.socket');
            window.api.socket = null;
        }
        
        console.log('[HuizhiAuth] Step 4: WebSocket connections closed');

        // ============ 第5步: 覆盖 WebSocket 构造函数阻止重连 ============
        window.WebSocket = function(url) {
            console.log('[HuizhiAuth] WebSocket connection BLOCKED:', url);
            // 返回一个假的 WebSocket 对象
            const fakeSocket = {
                url: url,
                readyState: 3, // CLOSED
                bufferedAmount: 0,
                extensions: '',
                protocol: '',
                binaryType: 'blob',
                onopen: null,
                onclose: null,
                onerror: null,
                onmessage: null,
                send: function() { console.log('[HuizhiAuth] Fake WS send blocked'); },
                close: function() { console.log('[HuizhiAuth] Fake WS close called'); },
                addEventListener: function() {},
                removeEventListener: function() {},
                dispatchEvent: function() { return false; }
            };
            // 模拟连接失败
            setTimeout(() => {
                if (fakeSocket.onerror) fakeSocket.onerror(new Event('error'));
            }, 0);
            return fakeSocket;
        };
        window.WebSocket.CONNECTING = 0;
        window.WebSocket.OPEN = 1;
        window.WebSocket.CLOSING = 2;
        window.WebSocket.CLOSED = 3;
        
        console.log('[HuizhiAuth] Step 5: WebSocket constructor replaced');

        // ============ 第6步: 覆盖 fetch 阻止网络请求 ============
        window.fetch = function(url) {
            console.log('[HuizhiAuth] Fetch BLOCKED:', url);
            return Promise.reject(new Error('Logout in progress - fetch blocked'));
        };
        
        // 同时覆盖 XMLHttpRequest
        const OriginalXHR = window.XMLHttpRequest;
        window.XMLHttpRequest = function() {
            console.log('[HuizhiAuth] XMLHttpRequest BLOCKED');
            return {
                open: function() {},
                send: function() {},
                abort: function() {},
                setRequestHeader: function() {},
                addEventListener: function() {},
                removeEventListener: function() {}
            };
        };
        
        console.log('[HuizhiAuth] Step 6: fetch and XHR blocked');

        // ============ 第7步: 清除本地存储 ============
        // 清除绘智相关
        Object.values(STORAGE_KEYS).forEach(key => {
            try { localStorage.removeItem(key); } catch(e) {}
        });
        
        // 清除其他可能的存储
        const keysToRemove = [
            'comfy_user', 'comfy_refresh_token', 'huizhi_user_info',
            'comfy_token', 'clientId'
        ];
        keysToRemove.forEach(key => {
            try { localStorage.removeItem(key); } catch(e) {}
        });

        // 清除 Firebase 相关
        const allKeys = [];
        for (let i = 0; i < localStorage.length; i++) {
            allKeys.push(localStorage.key(i));
        }
        allKeys.forEach(key => {
            if (key && (key.includes('firebase') || key.includes('comfy') || key.includes('huizhi'))) {
                try { localStorage.removeItem(key); } catch(e) {}
            }
        });
        
        // 清除 sessionStorage
        try {
            // 保留 logout 标志，其他都清除
            const logoutFlag = sessionStorage.getItem('comfy_logout_in_progress');
            sessionStorage.clear();
            sessionStorage.setItem('comfy_logout_in_progress', 'true');
        } catch(e) {}

        // 清除 IndexedDB (Firebase 存储)
        try {
            indexedDB.deleteDatabase('firebaseLocalStorageDb');
        } catch (e) {}

        console.log('[HuizhiAuth] Step 7: Local storage cleared');

        // ============ 第8步: 清除 Cookie ============
        const clearCookies = () => {
            const cookies = document.cookie.split(';');
            for (let cookie of cookies) {
                const name = cookie.split('=')[0].trim();
                document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
                document.cookie = `${name}=; path=/; domain=${window.location.hostname}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
            }
        };
        clearCookies();
        
        console.log('[HuizhiAuth] Step 8: Cookies cleared');

        // ============ 第9步: 停止页面上所有活动 ============
        try {
            window.stop();
        } catch (e) {}
        
        // 移除所有可能的事件监听器
        try {
            // 创建一个新的空事件目标来替换 api
            if (window.api) {
                window.api.socket = null;
            }
            if (window.app && window.app.api) {
                window.app.api.socket = null;
            }
        } catch(e) {}

        console.log('[HuizhiAuth] Step 9: Page activities stopped');
        console.log('[HuizhiAuth] ========== Redirecting to login page ==========');

        // ============ 第10步: 强制跳转 ============
        // 使用原生方式确保跳转成功
        const doRedirect = () => {
            try {
                // 方法1: location.replace (推荐，不保留历史记录)
                window.location.replace('/login?logout=1');
            } catch (e) {
                try {
                    // 方法2: location.href
                    window.location.href = '/login?logout=1';
                } catch (e2) {
                    try {
                        // 方法3: location.assign
                        window.location.assign('/login?logout=1');
                    } catch (e3) {
                        // 方法4: 直接设置 location
                        document.location = '/login?logout=1';
                    }
                }
            }
        };
        
        // 立即尝试跳转
        doRedirect();
        
        // 如果上面的跳转被阻止，100ms 后再次尝试
        // 注意：这里我们需要使用原始的 setTimeout，因为我们已经覆盖了它
        // 但由于我们马上就要跳转，这应该不是问题
        const originalSetTimeout = Function.prototype.call.bind(
            Object.getOwnPropertyDescriptor(Window.prototype, 'setTimeout')?.value || 
            (() => {})
        );
        
        // 使用 Promise 的方式来延迟
        Promise.resolve().then(() => {
            return new Promise(resolve => {
                // 使用 requestAnimationFrame 作为备用延迟机制
                if (window.requestAnimationFrame) {
                    window.requestAnimationFrame(() => {
                        window.requestAnimationFrame(() => {
                            resolve();
                        });
                    });
                } else {
                    resolve();
                }
            });
        }).then(() => {
            doRedirect();
        });
    }

    // ========== 启动 ==========
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        setTimeout(init, 300);
    }
})();
