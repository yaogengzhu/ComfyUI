"""
用户数据模型
"""
from __future__ import annotations
from dataclasses import dataclass, field
from datetime import datetime
from typing import Optional
import uuid


@dataclass
class User:
    """用户模型"""
    id: str = field(default_factory=lambda: str(uuid.uuid4()))
    username: str = ""
    email: str = ""
    password_hash: str = ""  # 存储加密后的密码
    avatar: str = ""
    role: str = "user"  # user, admin
    is_active: bool = True
    created_at: datetime = field(default_factory=datetime.now)
    updated_at: datetime = field(default_factory=datetime.now)
    last_login: Optional[datetime] = None
    
    # 用户配额/限制
    max_queue_size: int = 10  # 最大队列数
    max_generations_per_day: int = 100  # 每日最大生成次数
    generations_today: int = 0
    
    def to_dict(self, include_sensitive: bool = False) -> dict:
        """转换为字典"""
        data = {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "avatar": self.avatar,
            "role": self.role,
            "is_active": self.is_active,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "last_login": self.last_login.isoformat() if self.last_login else None,
            "max_queue_size": self.max_queue_size,
            "max_generations_per_day": self.max_generations_per_day,
        }
        if include_sensitive:
            data["password_hash"] = self.password_hash
        return data
    
    @classmethod
    def from_dict(cls, data: dict) -> User:
        """从字典创建用户"""
        return cls(
            id=data.get("id", str(uuid.uuid4())),
            username=data.get("username", ""),
            email=data.get("email", ""),
            password_hash=data.get("password_hash", ""),
            avatar=data.get("avatar", ""),
            role=data.get("role", "user"),
            is_active=data.get("is_active", True),
            created_at=datetime.fromisoformat(data["created_at"]) if data.get("created_at") else datetime.now(),
            updated_at=datetime.fromisoformat(data["updated_at"]) if data.get("updated_at") else datetime.now(),
            last_login=datetime.fromisoformat(data["last_login"]) if data.get("last_login") else None,
            max_queue_size=data.get("max_queue_size", 10),
            max_generations_per_day=data.get("max_generations_per_day", 100),
            generations_today=data.get("generations_today", 0),
        )


@dataclass
class Session:
    """会话模型"""
    id: str = field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str = ""
    token: str = ""
    refresh_token: str = ""
    expires_at: datetime = field(default_factory=datetime.now)
    created_at: datetime = field(default_factory=datetime.now)
    ip_address: str = ""
    user_agent: str = ""
    is_valid: bool = True
    
    # 单点登录 - 设备标识
    device_id: str = ""          # 设备唯一标识 (浏览器指纹)
    device_name: str = ""        # 设备名称 (用于展示)
    device_type: str = ""        # 设备类型: desktop, mobile, tablet
    os_name: str = ""            # 操作系统: Windows, macOS, Linux, iOS, Android
    browser_name: str = ""       # 浏览器: Chrome, Firefox, Safari, Electron
