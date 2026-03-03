"""
认证管理器 - 处理用户注册、登录、Token 管理
"""
from __future__ import annotations
import json
import os
import hashlib
import secrets
import logging
from datetime import datetime, timedelta
from typing import Optional, Tuple
from aiohttp import web

import folder_paths
from .models import User, Session

# JWT 支持 (可选)
try:
    import jwt
    JWT_AVAILABLE = True
except ImportError:
    JWT_AVAILABLE = False
    logging.warning("PyJWT not installed. Using simple token auth. Install with: pip install PyJWT")


class AuthManager:
    """认证管理器"""
    
    def __init__(self, secret_key: str = None):
        self.secret_key = secret_key or secrets.token_hex(32)
        self.token_expire_hours = 24  # Token 过期时间
        self.refresh_token_expire_days = 7  # Refresh Token 过期时间
        
        # 单点登录配置
        self.single_device_login = True  # 是否启用单设备登录
        
        # 存储路径
        self.auth_dir = os.path.join(folder_paths.get_user_directory(), "auth")
        self.users_file = os.path.join(self.auth_dir, "users.json")
        self.sessions_file = os.path.join(self.auth_dir, "sessions.json")
        
        # 初始化
        self._ensure_auth_dir()
        self.users: dict[str, User] = {}
        self.sessions: dict[str, Session] = {}
        self._load_data()
        
        # 创建默认管理员账户
        self._ensure_admin_user()
    
    def _ensure_auth_dir(self):
        """确保认证目录存在"""
        if not os.path.exists(self.auth_dir):
            os.makedirs(self.auth_dir, exist_ok=True)
    
    def _load_data(self):
        """加载用户和会话数据"""
        # 加载用户
        if os.path.exists(self.users_file):
            try:
                with open(self.users_file, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    self.users = {uid: User.from_dict(udata) for uid, udata in data.items()}
            except Exception as e:
                logging.error(f"Failed to load users: {e}")
                self.users = {}
        
        # 加载会话
        if os.path.exists(self.sessions_file):
            try:
                with open(self.sessions_file, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    for sid, sdata in data.items():
                        session = Session(
                            id=sdata.get("id"),
                            user_id=sdata.get("user_id"),
                            token=sdata.get("token"),
                            refresh_token=sdata.get("refresh_token"),
                            expires_at=datetime.fromisoformat(sdata["expires_at"]) if sdata.get("expires_at") else datetime.now(),
                            created_at=datetime.fromisoformat(sdata["created_at"]) if sdata.get("created_at") else datetime.now(),
                            ip_address=sdata.get("ip_address", ""),
                            user_agent=sdata.get("user_agent", ""),
                            is_valid=sdata.get("is_valid", True),
                            # 单点登录字段
                            device_id=sdata.get("device_id", ""),
                            device_name=sdata.get("device_name", ""),
                            device_type=sdata.get("device_type", ""),
                            os_name=sdata.get("os_name", ""),
                            browser_name=sdata.get("browser_name", "")
                        )
                        self.sessions[sid] = session
            except Exception as e:
                logging.error(f"Failed to load sessions: {e}")
                self.sessions = {}
    
    def _save_users(self):
        """保存用户数据"""
        try:
            data = {uid: user.to_dict(include_sensitive=True) for uid, user in self.users.items()}
            with open(self.users_file, 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=2, ensure_ascii=False)
        except Exception as e:
            logging.error(f"Failed to save users: {e}")
    
    def _save_sessions(self):
        """保存会话数据"""
        try:
            data = {}
            for sid, session in self.sessions.items():
                data[sid] = {
                    "id": session.id,
                    "user_id": session.user_id,
                    "token": session.token,
                    "refresh_token": session.refresh_token,
                    "expires_at": session.expires_at.isoformat(),
                    "created_at": session.created_at.isoformat(),
                    "ip_address": session.ip_address,
                    "user_agent": session.user_agent,
                    "is_valid": session.is_valid,
                    # 单点登录字段
                    "device_id": session.device_id,
                    "device_name": session.device_name,
                    "device_type": session.device_type,
                    "os_name": session.os_name,
                    "browser_name": session.browser_name
                }
            with open(self.sessions_file, 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=2)
        except Exception as e:
            logging.error(f"Failed to save sessions: {e}")
    
    def _ensure_admin_user(self):
        """确保存在默认管理员账户"""
        admin_exists = any(u.role == "admin" for u in self.users.values())
        if not admin_exists:
            # 创建默认管理员
            admin = User(
                username="admin",
                email="admin@localhost",
                password_hash=self._hash_password("admin123"),  # 默认密码，请修改！
                role="admin",
                max_queue_size=100,
                max_generations_per_day=1000
            )
            self.users[admin.id] = admin
            self._save_users()
            logging.info("Created default admin user (username: admin, password: admin123)")
    
    @staticmethod
    def _hash_password(password: str) -> str:
        """密码哈希"""
        # 使用 SHA-256 + salt
        salt = secrets.token_hex(16)
        hash_obj = hashlib.sha256((password + salt).encode())
        return f"{salt}${hash_obj.hexdigest()}"
    
    @staticmethod
    def _verify_password(password: str, password_hash: str) -> bool:
        """验证密码"""
        try:
            salt, hash_value = password_hash.split('$')
            hash_obj = hashlib.sha256((password + salt).encode())
            return hash_obj.hexdigest() == hash_value
        except Exception:
            return False
    
    def _generate_token(self, user: User) -> str:
        """生成访问 Token"""
        if JWT_AVAILABLE:
            payload = {
                "user_id": user.id,
                "username": user.username,
                "role": user.role,
                "exp": datetime.utcnow() + timedelta(hours=self.token_expire_hours),
                "iat": datetime.utcnow()
            }
            return jwt.encode(payload, self.secret_key, algorithm="HS256")
        else:
            # 简单 Token
            return secrets.token_urlsafe(32)
    
    def _generate_refresh_token(self) -> str:
        """生成刷新 Token"""
        return secrets.token_urlsafe(64)
    
    def register(self, username: str, email: str, password: str) -> Tuple[bool, str, Optional[User]]:
        """
        用户注册
        返回: (成功, 消息, 用户对象)
        """
        # 验证用户名
        if not username or len(username) < 3:
            return False, "用户名至少需要3个字符", None
        
        # 验证邮箱
        if not email or "@" not in email:
            return False, "请输入有效的邮箱地址", None
        
        # 验证密码
        if not password or len(password) < 6:
            return False, "密码至少需要6个字符", None
        
        # 检查用户名是否已存在
        if any(u.username.lower() == username.lower() for u in self.users.values()):
            return False, "用户名已存在", None
        
        # 检查邮箱是否已存在
        if any(u.email.lower() == email.lower() for u in self.users.values()):
            return False, "邮箱已被注册", None
        
        # 创建用户
        user = User(
            username=username,
            email=email,
            password_hash=self._hash_password(password)
        )
        
        self.users[user.id] = user
        self._save_users()
        
        logging.info(f"New user registered: {username}")
        return True, "注册成功", user
    
    def login(self, username: str, password: str, ip_address: str = "", user_agent: str = "",
              device_id: str = "", device_name: str = "", device_type: str = "", 
              os_name: str = "", browser_name: str = "") -> Tuple[bool, str, Optional[dict]]:
        """
        用户登录 (支持单点登录)
        返回: (成功, 消息, Token信息)
        """
        # 查找用户 (支持用户名或邮箱登录)
        user = None
        for u in self.users.values():
            if u.username.lower() == username.lower() or u.email.lower() == username.lower():
                user = u
                break
        
        if not user:
            return False, "用户不存在", None
        
        if not user.is_active:
            return False, "账户已被禁用", None
        
        if not self._verify_password(password, user.password_hash):
            return False, "密码错误", None
        
        # ============ 单点登录处理 ============
        kicked_device = None
        if self.single_device_login:
            # 使该用户的所有其他会话失效
            for session in self.sessions.values():
                if session.user_id == user.id and session.is_valid:
                    # 记录被踢掉的设备信息
                    kicked_device = {
                        "device_name": session.device_name or "未知设备",
                        "device_type": session.device_type or "unknown",
                        "os_name": session.os_name or "",
                        "browser_name": session.browser_name or "",
                        "ip_address": session.ip_address or "",
                        "login_time": session.created_at.isoformat() if session.created_at else ""
                    }
                    session.is_valid = False
                    logging.info(f"[SSO] Kicked device for user {username}: {session.device_name} ({session.device_id})")
        
        # 生成 Token
        token = self._generate_token(user)
        refresh_token = self._generate_refresh_token()
        
        # 创建会话 (包含设备信息)
        session = Session(
            user_id=user.id,
            token=token,
            refresh_token=refresh_token,
            expires_at=datetime.now() + timedelta(hours=self.token_expire_hours),
            ip_address=ip_address,
            user_agent=user_agent,
            device_id=device_id,
            device_name=device_name,
            device_type=device_type,
            os_name=os_name,
            browser_name=browser_name
        )
        
        self.sessions[session.id] = session
        self._save_sessions()
        
        # 更新最后登录时间
        user.last_login = datetime.now()
        self._save_users()
        
        logging.info(f"User logged in: {username} from {device_name} ({device_type}/{os_name})")
        
        result_data = {
            "token": token,
            "refresh_token": refresh_token,
            "expires_in": self.token_expire_hours * 3600,
            "user": user.to_dict(),
            "device_id": device_id,
            "session_id": session.id
        }
        
        # 如果踢掉了其他设备，返回提示信息
        if kicked_device:
            result_data["kicked_device"] = kicked_device
        
        return True, "登录成功", result_data
    
    def verify_token(self, token: str, device_id: str = None) -> Tuple[bool, Optional[User], Optional[str]]:
        """
        验证 Token
        返回: (是否有效, 用户对象, 错误原因)
        错误原因: None=成功, "expired"=过期, "invalid"=无效, "device_mismatch"=设备不匹配
        """
        if not token:
            return False, None, "invalid"
        
        if JWT_AVAILABLE:
            try:
                payload = jwt.decode(token, self.secret_key, algorithms=["HS256"])
                user_id = payload.get("user_id")
                if user_id and user_id in self.users:
                    user = self.users[user_id]
                    if user.is_active:
                        # 检查设备 ID (如果启用单点登录)
                        if self.single_device_login and device_id:
                            session = self._get_session_by_token(token)
                            if session and session.device_id and session.device_id != device_id:
                                return False, None, "device_mismatch"
                        return True, user, None
            except jwt.ExpiredSignatureError:
                logging.debug("Token expired")
                return False, None, "expired"
            except jwt.InvalidTokenError as e:
                logging.debug(f"Invalid token: {e}")
            return False, None, "invalid"
        else:
            # 简单 Token 验证
            for session in self.sessions.values():
                if session.token == token and session.is_valid:
                    if session.expires_at > datetime.now():
                        if session.user_id in self.users:
                            user = self.users[session.user_id]
                            if user.is_active:
                                # 检查设备 ID (如果启用单点登录)
                                if self.single_device_login and device_id:
                                    if session.device_id and session.device_id != device_id:
                                        return False, None, "device_mismatch"
                                return True, user, None
                    else:
                        return False, None, "expired"
            return False, None, "invalid"
    
    def _get_session_by_token(self, token: str) -> Optional[Session]:
        """根据 Token 获取会话"""
        for session in self.sessions.values():
            if session.token == token and session.is_valid:
                return session
        return None
    
    def check_device_valid(self, token: str, device_id: str) -> Tuple[bool, str]:
        """
        检查设备是否有效 (用于前端轮询检测被踢)
        返回: (是否有效, 原因)
        """
        if not token or not device_id:
            return False, "missing_params"
        
        session = self._get_session_by_token(token)
        if not session:
            return False, "session_not_found"
        
        if not session.is_valid:
            return False, "session_invalidated"
        
        if session.device_id and session.device_id != device_id:
            return False, "device_mismatch"
        
        if session.expires_at < datetime.now():
            return False, "session_expired"
        
        return True, "valid"
    
    def refresh_token(self, refresh_token: str) -> Tuple[bool, str, Optional[dict]]:
        """
        刷新 Token
        返回: (成功, 消息, 新Token信息)
        """
        for session in self.sessions.values():
            if session.refresh_token == refresh_token and session.is_valid:
                if session.user_id in self.users:
                    user = self.users[session.user_id]
                    if not user.is_active:
                        return False, "账户已被禁用", None
                    
                    # 生成新 Token
                    new_token = self._generate_token(user)
                    new_refresh_token = self._generate_refresh_token()
                    
                    # 更新会话
                    session.token = new_token
                    session.refresh_token = new_refresh_token
                    session.expires_at = datetime.now() + timedelta(hours=self.token_expire_hours)
                    self._save_sessions()
                    
                    return True, "Token 刷新成功", {
                        "token": new_token,
                        "refresh_token": new_refresh_token,
                        "expires_in": self.token_expire_hours * 3600
                    }
        
        return False, "无效的 Refresh Token", None
    
    def logout(self, token: str) -> bool:
        """登出"""
        for session_id, session in list(self.sessions.items()):
            if session.token == token:
                session.is_valid = False
                self._save_sessions()
                return True
        return False
    
    def get_user_by_id(self, user_id: str) -> Optional[User]:
        """根据 ID 获取用户"""
        return self.users.get(user_id)
    
    def update_user(self, user_id: str, **kwargs) -> Tuple[bool, str]:
        """更新用户信息"""
        if user_id not in self.users:
            return False, "用户不存在"
        
        user = self.users[user_id]
        
        # 更新允许的字段
        allowed_fields = ['email', 'avatar', 'max_queue_size', 'max_generations_per_day']
        for field in allowed_fields:
            if field in kwargs:
                setattr(user, field, kwargs[field])
        
        # 更新密码
        if 'password' in kwargs and kwargs['password']:
            user.password_hash = self._hash_password(kwargs['password'])
        
        user.updated_at = datetime.now()
        self._save_users()
        
        return True, "更新成功"
    
    def delete_user(self, user_id: str) -> Tuple[bool, str]:
        """删除用户"""
        if user_id not in self.users:
            return False, "用户不存在"
        
        # 删除用户的所有会话
        for session_id in list(self.sessions.keys()):
            if self.sessions[session_id].user_id == user_id:
                del self.sessions[session_id]
        self._save_sessions()
        
        # 删除用户
        del self.users[user_id]
        self._save_users()
        
        return True, "用户已删除"
    
    def list_users(self, include_inactive: bool = False) -> list[dict]:
        """获取用户列表"""
        users = []
        for user in self.users.values():
            if include_inactive or user.is_active:
                users.append(user.to_dict())
        return users
    
    def add_routes(self, routes: web.RouteTableDef):
        """添加认证相关路由"""
        
        @routes.post("/api/auth/register")
        async def register_handler(request):
            """注册接口"""
            try:
                body = await request.json()
                username = body.get("username", "").strip()
                email = body.get("email", "").strip()
                password = body.get("password", "")
                
                success, message, user = self.register(username, email, password)
                
                if success:
                    return web.json_response({
                        "success": True,
                        "message": message,
                        "user": user.to_dict()
                    })
                else:
                    return web.json_response({
                        "success": False,
                        "message": message
                    }, status=400)
            except Exception as e:
                logging.error(f"Register error: {e}")
                return web.json_response({
                    "success": False,
                    "message": "注册失败"
                }, status=500)
        
        @routes.post("/api/auth/login")
        async def login_handler(request):
            """登录接口"""
            try:
                body = await request.json()
                username = body.get("username", "").strip()
                password = body.get("password", "")
                
                # 获取客户端信息
                ip_address = request.remote or ""
                user_agent = request.headers.get("User-Agent", "")
                
                # 获取设备信息 (单点登录)
                device_id = body.get("device_id", "")
                device_name = body.get("device_name", "")
                device_type = body.get("device_type", "")
                os_name = body.get("os_name", "")
                browser_name = body.get("browser_name", "")
                
                success, message, data = self.login(
                    username, password, ip_address, user_agent,
                    device_id, device_name, device_type, os_name, browser_name
                )
                
                if success:
                    return web.json_response({
                        "success": True,
                        "message": message,
                        "data": data
                    })
                else:
                    return web.json_response({
                        "success": False,
                        "message": message
                    }, status=401)
            except Exception as e:
                logging.error(f"Login error: {e}")
                return web.json_response({
                    "success": False,
                    "message": "登录失败"
                }, status=500)
        
        @routes.post("/api/auth/logout")
        async def logout_handler(request):
            """登出接口 - 清空所有登录态并重定向到登录页"""
            # 获取 Token（支持多种方式）
            token = (
                request.headers.get("Authorization", "").replace("Bearer ", "") or
                request.cookies.get("comfy_token", "") or
                request.query.get("token", "")
            )
            
            # 使会话失效
            if token:
                self.logout(token)
            
            # 创建响应并清空所有相关 Cookie
            response = web.json_response({
                "success": True,
                "message": "已登出",
                "redirect": "/login"
            })
            
            # 清空所有可能的认证 Cookie
            cookies_to_clear = ["comfy_token", "huizhi_token", "comfy_org_token"]
            for cookie_name in cookies_to_clear:
                response.set_cookie(
                    cookie_name,
                    "",
                    max_age=0,
                    path="/",
                    expires="Thu, 01 Jan 1970 00:00:00 GMT"
                )
            
            return response
        
        @routes.post("/api/auth/refresh")
        async def refresh_handler(request):
            """刷新 Token"""
            try:
                body = await request.json()
                refresh_token = body.get("refresh_token", "")
                
                success, message, data = self.refresh_token(refresh_token)
                
                if success:
                    return web.json_response({
                        "success": True,
                        "message": message,
                        "data": data
                    })
                else:
                    return web.json_response({
                        "success": False,
                        "message": message
                    }, status=401)
            except Exception as e:
                logging.error(f"Refresh token error: {e}")
                return web.json_response({
                    "success": False,
                    "message": "刷新失败"
                }, status=500)
        
        @routes.get("/api/auth/me")
        async def me_handler(request):
            """获取当前用户信息"""
            token = request.headers.get("Authorization", "").replace("Bearer ", "")
            device_id = request.headers.get("X-Device-ID", "")
            valid, user, error = self.verify_token(token, device_id)
            
            if valid and user:
                return web.json_response({
                    "success": True,
                    "user": user.to_dict()
                })
            else:
                # 返回具体错误原因
                error_messages = {
                    "expired": "Token 已过期，请重新登录",
                    "invalid": "无效的 Token",
                    "device_mismatch": "您的账号已在其他设备登录，当前设备已被强制下线"
                }
                return web.json_response({
                    "success": False,
                    "message": error_messages.get(error, "未登录或 Token 已过期"),
                    "error_code": error
                }, status=401)
        
        @routes.put("/api/auth/me")
        async def update_me_handler(request):
            """更新当前用户信息"""
            token = request.headers.get("Authorization", "").replace("Bearer ", "")
            valid, user, error = self.verify_token(token)
            
            if not valid or not user:
                return web.json_response({
                    "success": False,
                    "message": "未登录或 Token 已过期",
                    "error_code": error
                }, status=401)
            
            try:
                body = await request.json()
                success, message = self.update_user(user.id, **body)
                
                if success:
                    updated_user = self.get_user_by_id(user.id)
                    return web.json_response({
                        "success": True,
                        "message": message,
                        "user": updated_user.to_dict()
                    })
                else:
                    return web.json_response({
                        "success": False,
                        "message": message
                    }, status=400)
            except Exception as e:
                logging.error(f"Update user error: {e}")
                return web.json_response({
                    "success": False,
                    "message": "更新失败"
                }, status=500)
        
        # === 管理员接口 ===
        
        @routes.get("/api/admin/users")
        async def list_users_handler(request):
            """获取用户列表 (管理员)"""
            token = request.headers.get("Authorization", "").replace("Bearer ", "")
            valid, user, _ = self.verify_token(token)
            
            if not valid or not user or user.role != "admin":
                return web.json_response({
                    "success": False,
                    "message": "无权限"
                }, status=403)
            
            include_inactive = request.query.get("include_inactive", "false").lower() == "true"
            users = self.list_users(include_inactive)
            
            return web.json_response({
                "success": True,
                "users": users
            })
        
        @routes.put("/api/admin/users/{user_id}")
        async def admin_update_user_handler(request):
            """更新用户 (管理员)"""
            token = request.headers.get("Authorization", "").replace("Bearer ", "")
            valid, user, _ = self.verify_token(token)
            
            if not valid or not user or user.role != "admin":
                return web.json_response({
                    "success": False,
                    "message": "无权限"
                }, status=403)
            
            user_id = request.match_info.get("user_id")
            
            try:
                body = await request.json()
                
                # 管理员可以更新额外字段
                target_user = self.get_user_by_id(user_id)
                if not target_user:
                    return web.json_response({
                        "success": False,
                        "message": "用户不存在"
                    }, status=404)
                
                # 更新字段
                if "is_active" in body:
                    target_user.is_active = body["is_active"]
                if "role" in body:
                    target_user.role = body["role"]
                if "max_queue_size" in body:
                    target_user.max_queue_size = body["max_queue_size"]
                if "max_generations_per_day" in body:
                    target_user.max_generations_per_day = body["max_generations_per_day"]
                
                target_user.updated_at = datetime.now()
                self._save_users()
                
                return web.json_response({
                    "success": True,
                    "message": "更新成功",
                    "user": target_user.to_dict()
                })
            except Exception as e:
                logging.error(f"Admin update user error: {e}")
                return web.json_response({
                    "success": False,
                    "message": "更新失败"
                }, status=500)
        
        @routes.delete("/api/admin/users/{user_id}")
        async def admin_delete_user_handler(request):
            """删除用户 (管理员)"""
            token = request.headers.get("Authorization", "").replace("Bearer ", "")
            valid, user, _ = self.verify_token(token)
            
            if not valid or not user or user.role != "admin":
                return web.json_response({
                    "success": False,
                    "message": "无权限"
                }, status=403)
            
            user_id = request.match_info.get("user_id")
            
            # 不能删除自己
            if user_id == user.id:
                return web.json_response({
                    "success": False,
                    "message": "不能删除自己"
                }, status=400)
            
            success, message = self.delete_user(user_id)
            
            if success:
                return web.json_response({
                    "success": True,
                    "message": message
                })
            else:
                return web.json_response({
                    "success": False,
                    "message": message
                }, status=400)
        
        # === 单点登录接口 ===
        
        @routes.get("/api/auth/check-device")
        async def check_device_handler(request):
            """检查当前设备是否仍然有效 (用于前端轮询检测被踢)"""
            token = request.headers.get("Authorization", "").replace("Bearer ", "")
            device_id = request.headers.get("X-Device-ID", "") or request.query.get("device_id", "")
            
            if not token or not device_id:
                return web.json_response({
                    "valid": False,
                    "reason": "missing_params"
                }, status=400)
            
            valid, reason = self.check_device_valid(token, device_id)
            
            if valid:
                return web.json_response({
                    "valid": True,
                    "reason": reason
                })
            else:
                return web.json_response({
                    "valid": False,
                    "reason": reason,
                    "message": "您的账号已在其他设备登录" if reason == "device_mismatch" else "会话已失效"
                }, status=401)
        
        @routes.get("/api/auth/active-sessions")
        async def active_sessions_handler(request):
            """获取用户当前有效的会话列表"""
            token = request.headers.get("Authorization", "").replace("Bearer ", "")
            valid, user, _ = self.verify_token(token)
            
            if not valid or not user:
                return web.json_response({
                    "success": False,
                    "message": "未登录"
                }, status=401)
            
            sessions = []
            for session in self.sessions.values():
                if session.user_id == user.id and session.is_valid:
                    sessions.append({
                        "session_id": session.id,
                        "device_id": session.device_id,
                        "device_name": session.device_name,
                        "device_type": session.device_type,
                        "os_name": session.os_name,
                        "browser_name": session.browser_name,
                        "ip_address": session.ip_address,
                        "created_at": session.created_at.isoformat(),
                        "expires_at": session.expires_at.isoformat()
                    })
            
            return web.json_response({
                "success": True,
                "sessions": sessions
            })
