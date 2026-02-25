/**
 * ComfyUI 用户信息显示扩展
 * 在界面右上角显示当前登录用户信息和退出登录按钮
 */

(function() {
    'use strict';

    // 等待 DOM 加载完成
    function init() {
        // 检查是否已经初始化
        if (document.getElementById('comfy-user-panel')) {
            return;
        }

        // 从 localStorage 获取用户信息
        const token = localStorage.getItem('comfy_token');
        const userStr = localStorage.getItem('comfy_user');
        
        if (!token || !userStr) {
            // 未登录，重定向到登录页
            window.location.href = '/login';
            return;
        }

        let user;
        try {
            user = JSON.parse(userStr);
        } catch (e) {
            console.error('Failed to parse user info:', e);
            window.location.href = '/login';
            return;
        }

        // 创建用户信息面板
        createUserPanel(user);
    }

    function createUserPanel(user) {
        // 创建样式
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

            #comfy-user-panel .logout-btn:active {
                transform: scale(0.95);
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
                min-width: 320px;
                max-width: 400px;
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
                transition: color 0.2s;
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

            #comfy-user-modal .info-row:last-child {
                border-bottom: none;
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

            #comfy-user-modal .info-value.admin {
                color: #ffd700;
            }
        `;
        document.head.appendChild(style);

        // 创建面板 HTML
        const panel = document.createElement('div');
        panel.id = 'comfy-user-panel';
        
        const avatarLetter = user.username ? user.username.charAt(0).toUpperCase() : 'U';
        const roleText = user.role === 'admin' ? '管理员' : '用户';
        const roleClass = user.role === 'admin' ? 'admin' : '';

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

        // 创建用户信息弹窗
        const modal = document.createElement('div');
        modal.id = 'comfy-user-modal';
        
        const createdAt = user.created_at ? new Date(user.created_at).toLocaleString('zh-CN') : '未知';
        const lastLogin = user.last_login ? new Date(user.last_login).toLocaleString('zh-CN') : '首次登录';
        
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
                        <span class="info-value ${roleClass}">${user.role === 'admin' ? '管理员' : '普通用户'}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">注册时间</span>
                        <span class="info-value">${createdAt}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">上次登录</span>
                        <span class="info-value">${lastLogin}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">每日配额</span>
                        <span class="info-value">${user.max_generations_per_day || 100} 次</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">队列上限</span>
                        <span class="info-value">${user.max_queue_size || 10}</span>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // 绑定事件
        bindEvents();
    }

    function bindEvents() {
        // 点击用户区域显示详情
        const userSection = document.getElementById('user-section-btn');
        const modal = document.getElementById('comfy-user-modal');
        const modalCloseBtn = document.getElementById('modal-close-btn');
        const logoutBtn = document.getElementById('logout-btn');

        if (userSection) {
            userSection.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                if (modal) {
                    modal.classList.add('show');
                }
            });
        }

        if (modalCloseBtn) {
            modalCloseBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                if (modal) {
                    modal.classList.remove('show');
                }
            });
        }

        if (modal) {
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.classList.remove('show');
                }
            });
        }

        if (logoutBtn) {
            logoutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                handleLogout();
            });
        }
    }

    // HTML 转义
    function escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // 退出登录
    function handleLogout() {
        if (!confirm('确定要退出登录吗？')) {
            return;
        }

        // 调用登出 API
        const token = localStorage.getItem('comfy_token');
        if (token) {
            fetch('/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }).catch(function(e) {
                console.error('Logout API error:', e);
            });
        }

        // 清除本地存储
        localStorage.removeItem('comfy_token');
        localStorage.removeItem('comfy_refresh_token');
        localStorage.removeItem('comfy_user');

        // 清除 Cookie
        document.cookie = 'comfy_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';

        // 跳转到登录页
        window.location.href = '/login?logout=1';
    }

    // 页面加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        // DOM 已经加载完成，稍微延迟以确保 ComfyUI 初始化完成
        setTimeout(init, 300);
    }
})();
