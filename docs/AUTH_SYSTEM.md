# ComfyUI 账号体系使用指南

## 概述

ComfyUI 现已支持自定义账号体系，包括用户注册、登录、Token 认证等功能。

## 快速开始

### 1. 启用认证系统

```bash
python main.py --enable-auth --auto-launch
```

### 2. 可选参数

| 参数 | 说明 |
|------|------|
| `--enable-auth` | 启用认证系统 |
| `--auth-secret-key YOUR_KEY` | 指定 JWT 密钥 (可选，不指定则自动生成) |

### 3. 默认管理员账户

首次启用认证后，系统会自动创建默认管理员账户：

- **用户名**: `admin`
- **密码**: `admin123`

⚠️ **请务必在生产环境中修改默认密码！**

---

## API 接口文档

### 认证接口

#### 1. 用户注册

```http
POST /api/auth/register
Content-Type: application/json

{
    "username": "testuser",
    "email": "test@example.com",
    "password": "123456"
}
```

**响应**:
```json
{
    "success": true,
    "message": "注册成功",
    "user": {
        "id": "xxx-xxx-xxx",
        "username": "testuser",
        "email": "test@example.com",
        "role": "user"
    }
}
```

#### 2. 用户登录

```http
POST /api/auth/login
Content-Type: application/json

{
    "username": "testuser",  // 支持用户名或邮箱
    "password": "123456"
}
```

**响应**:
```json
{
    "success": true,
    "message": "登录成功",
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIs...",
        "refresh_token": "xxx...",
        "expires_in": 86400,
        "user": {
            "id": "xxx",
            "username": "testuser",
            "role": "user"
        }
    }
}
```

#### 3. 获取当前用户信息

```http
GET /api/auth/me
Authorization: Bearer <token>
```

#### 4. 刷新 Token

```http
POST /api/auth/refresh
Content-Type: application/json

{
    "refresh_token": "xxx..."
}
```

#### 5. 登出

```http
POST /api/auth/logout
Authorization: Bearer <token>
```

#### 6. 更新用户信息

```http
PUT /api/auth/me
Authorization: Bearer <token>
Content-Type: application/json

{
    "email": "newemail@example.com",
    "password": "newpassword"  // 可选
}
```

---

### 管理员接口

需要管理员权限 (`role: "admin"`)

#### 1. 获取所有用户

```http
GET /api/admin/users
Authorization: Bearer <admin_token>
```

#### 2. 更新用户

```http
PUT /api/admin/users/{user_id}
Authorization: Bearer <admin_token>
Content-Type: application/json

{
    "is_active": true,
    "role": "admin",
    "max_queue_size": 20,
    "max_generations_per_day": 200
}
```

#### 3. 删除用户

```http
DELETE /api/admin/users/{user_id}
Authorization: Bearer <admin_token>
```

---

## 前端集成

### 1. 存储 Token

登录成功后，将 Token 存储到 localStorage:

```javascript
localStorage.setItem('comfy_token', data.token);
localStorage.setItem('comfy_refresh_token', data.refresh_token);
```

### 2. 发送请求时携带 Token

```javascript
fetch('/api/prompt', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('comfy_token')
    },
    body: JSON.stringify(promptData)
});
```

### 3. 处理 401 未授权

```javascript
fetch('/api/some-endpoint', { ... })
    .then(res => {
        if (res.status === 401) {
            // Token 过期，尝试刷新或跳转登录
            refreshTokenOrRedirect();
        }
        return res.json();
    });
```

### 4. Token 自动刷新

```javascript
async function refreshToken() {
    const refreshToken = localStorage.getItem('comfy_refresh_token');
    const res = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: refreshToken })
    });
    
    if (res.ok) {
        const data = await res.json();
        localStorage.setItem('comfy_token', data.data.token);
        localStorage.setItem('comfy_refresh_token', data.data.refresh_token);
        return true;
    }
    return false;
}
```

---

## 用户模型字段

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | string | 用户 ID (UUID) |
| `username` | string | 用户名 |
| `email` | string | 邮箱 |
| `avatar` | string | 头像 URL |
| `role` | string | 角色 (user/admin) |
| `is_active` | boolean | 是否激活 |
| `created_at` | datetime | 创建时间 |
| `last_login` | datetime | 最后登录时间 |
| `max_queue_size` | int | 最大队列数 |
| `max_generations_per_day` | int | 每日最大生成次数 |

---

## 数据存储

用户数据存储在 `user/auth/` 目录下：

```
user/
└── auth/
    ├── users.json      # 用户数据
    └── sessions.json   # 会话数据
```

---

## 安全建议

1. **生产环境必须使用 HTTPS**
2. **修改默认管理员密码**
3. **设置强密钥**: `--auth-secret-key YOUR_STRONG_SECRET_KEY`
4. **定期清理过期会话**
5. **启用 CORS 限制**: `--enable-cors-header https://yourdomain.com`

---

## 扩展开发

### 自定义中间件

```python
from app.auth.auth_middleware import get_current_user, require_auth, require_admin

@routes.get("/api/my-endpoint")
@require_auth
async def my_handler(request):
    user = get_current_user(request)
    return web.json_response({"user_id": user.id})

@routes.get("/api/admin/stats")
@require_admin
async def admin_stats(request):
    # 只有管理员可以访问
    return web.json_response({"stats": "..."})
```

### 扩展用户模型

编辑 `app/auth/models.py` 添加自定义字段：

```python
@dataclass
class User:
    # ... 现有字段 ...
    
    # 添加自定义字段
    credits: int = 0
    vip_level: int = 0
    phone: str = ""
```

---

## 常见问题

### Q: 如何禁用某个 API 的认证？

在 `app/auth/auth_middleware.py` 的 `PUBLIC_PATHS` 列表中添加路径：

```python
PUBLIC_PATHS = [
    "/api/auth/login",
    "/api/auth/register",
    "/api/your-public-endpoint",  # 添加这行
]
```

### Q: 如何使用数据库存储用户？

目前使用 JSON 文件存储。如需使用数据库，可以：

1. 修改 `AuthManager` 类，将 `_load_data` 和 `_save_*` 方法改为数据库操作
2. 使用 SQLAlchemy ORM 定义模型
3. 参考 `app/database/db.py` 的数据库初始化方式

### Q: Token 过期时间如何修改？

在 `AuthManager` 初始化时修改：

```python
self.token_expire_hours = 24  # 改为你需要的小时数
self.refresh_token_expire_days = 7  # 刷新 Token 过期天数
```

---

## 更新日志

- **v1.0.0** - 初始版本
  - 用户注册/登录
  - JWT Token 认证
  - 管理员用户管理
  - 中间件认证拦截
