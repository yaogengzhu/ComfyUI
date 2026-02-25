"""
认证中间件 - 拦截请求进行身份验证
"""
from __future__ import annotations
import logging
from aiohttp import web
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .auth_manager import AuthManager


# 不需要认证的路径 (白名单)
PUBLIC_PATHS = [
    "/api/auth/login",
    "/api/auth/register", 
    "/api/auth/refresh",
    "/login",           # 登录页面
    "/register",        # 注册页面 (如果有)
    "/favicon.ico",
]

# 需要认证，未登录时重定向到登录页的路径
REDIRECT_TO_LOGIN_PATHS = [
    "/",
]

# 静态资源前缀
STATIC_PREFIXES = [
    "/assets/",
    "/extensions/",
    "/scripts/",
    "/web/",
    "/web_custom/",  # 自定义前端资源
]


def create_auth_middleware(auth_manager: 'AuthManager', enabled: bool = True):
    """
    创建认证中间件
    
    Args:
        auth_manager: 认证管理器实例
        enabled: 是否启用认证 (方便开发时禁用)
    """
    
    @web.middleware
    async def auth_middleware(request: web.Request, handler):
        path = request.path
        
        # 如果禁用认证，直接放行
        if not enabled:
            return await handler(request)
        
        # 检查是否为公开路径
        if path in PUBLIC_PATHS:
            return await handler(request)
        
        # 检查是否为静态资源
        for prefix in STATIC_PREFIXES:
            if path.startswith(prefix):
                return await handler(request)
        
        # 检查是否为静态文件 (CSS, JS, 图片等)
        static_extensions = ('.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.woff', '.woff2', '.ttf')
        if path.endswith(static_extensions):
            return await handler(request)
        
        # 获取 Token
        token = None
        
        # 1. 从 Authorization Header 获取
        auth_header = request.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            token = auth_header[7:]
        
        # 2. 从 Query 参数获取 (用于 WebSocket 等场景)
        if not token:
            token = request.query.get("token")
        
        # 3. 从 Cookie 获取
        if not token:
            token = request.cookies.get("comfy_token")
        
        # 验证 Token
        if token:
            valid, user = auth_manager.verify_token(token)
            if valid and user:
                # 将用户信息附加到请求
                request['user'] = user
                request['user_id'] = user.id
                return await handler(request)
        
        # 未认证
        # 对于需要重定向的页面路径，重定向到登录页
        if path in REDIRECT_TO_LOGIN_PATHS:
            raise web.HTTPFound('/login')
        
        # 对于 API 请求返回 401
        if path.startswith("/api/") or path.startswith("/prompt") or path.startswith("/queue"):
            return web.json_response({
                "success": False,
                "message": "未登录或 Token 已过期",
                "code": "UNAUTHORIZED"
            }, status=401)
        
        # 对于 WebSocket 连接，返回 401
        if path == "/ws":
            return web.json_response({
                "success": False,
                "message": "WebSocket 认证失败",
                "code": "UNAUTHORIZED"
            }, status=401)
        
        # 对于其他页面请求，重定向到登录页
        raise web.HTTPFound('/login')
    
    return auth_middleware


def get_current_user(request: web.Request):
    """
    从请求中获取当前用户
    
    Usage:
        user = get_current_user(request)
        if user:
            print(f"Current user: {user.username}")
    """
    return request.get('user')


def require_auth(func):
    """
    装饰器: 要求登录
    
    Usage:
        @require_auth
        async def my_handler(request):
            user = get_current_user(request)
            ...
    """
    async def wrapper(request: web.Request):
        user = get_current_user(request)
        if not user:
            return web.json_response({
                "success": False,
                "message": "请先登录"
            }, status=401)
        return await func(request)
    return wrapper


def require_admin(func):
    """
    装饰器: 要求管理员权限
    
    Usage:
        @require_admin
        async def admin_handler(request):
            ...
    """
    async def wrapper(request: web.Request):
        user = get_current_user(request)
        if not user:
            return web.json_response({
                "success": False,
                "message": "请先登录"
            }, status=401)
        if user.role != "admin":
            return web.json_response({
                "success": False,
                "message": "需要管理员权限"
            }, status=403)
        return await func(request)
    return wrapper
