# 绘智 AI - ComfyUI 前端魔改部署指南

## 概述

本指南说明如何构建和部署魔改后的 ComfyUI 前端，使其支持绘智 AI 认证系统。

## 项目结构

```
ComfyUI/
├── ComfyUI_frontend/          # 魔改的前端源码 (本目录)
│   ├── src/
│   │   ├── stores/
│   │   │   └── firebaseAuthStore.ts  # 核心认证 Store (已魔改)
│   │   └── services/
│   │       └── dialogService.ts       # 登录弹窗逻辑 (已魔改)
│   ├── build-huizhi.sh        # 构建脚本
│   └── HUIZHI_DEPLOY_GUIDE.md # 本文档
├── web_custom/
│   └── login.html             # 绘智登录页面
├── web/                       # 构建后的前端资源 (构建脚本会替换)
└── main.py                    # ComfyUI 入口
```

## 魔改内容

### 1. `src/stores/firebaseAuthStore.ts`

核心认证 Store，修改了以下功能：

- **新增绘智 Token 读取逻辑**：从 `localStorage` 读取 `huizhi_token`、`comfy_org_token`、`huizhi_user_info`
- **修改 `isAuthenticated`**：优先检查绘智登录状态
- **修改 `getIdToken()`**：优先返回绘智服务提供的 ComfyOrg Token
- **修改 `getAuthToken()`**：优先返回绘智的 Token（用于 API 节点）
- **修改 `logout()`**：支持清除绘智登录状态
- **添加模拟 Firebase User 对象**：满足 UI 组件的类型需求

### 2. `src/services/dialogService.ts`

- **修改 `showApiNodesSignInDialog()`**：如果已通过绘智登录，直接返回成功，不弹出登录窗口
- **修改 `showSignInDialog()`**：如果已通过绘智登录，直接返回成功

## Token 存储规范

登录页面 (`login.html`) 需要在登录成功后存储以下数据：

```javascript
// 必需的 Token
localStorage.setItem('huizhi_token', huizhiJwtToken);        // 绘智系统 JWT
localStorage.setItem('comfy_org_token', comfyOrgIdToken);    // ComfyOrg Firebase ID Token

// 必需的用户信息 (前端需要读取)
localStorage.setItem('huizhi_user_info', JSON.stringify({
  email: 'user@example.com',
  username: 'username',
  uid: 'user_id_or_comfy_user_id'
}));
```

## 构建步骤

### 前置条件

- Node.js 18+
- pnpm (`npm install -g pnpm`)

### 构建命令

```bash
# 进入前端目录
cd /Users/yaogengzhu/Documents/llm/ComfyUI/ComfyUI_frontend

# 方式 1: 使用构建脚本 (推荐)
./build-huizhi.sh

# 方式 2: 手动构建
pnpm install
DISTRIBUTION=localhost pnpm build

# 复制到 ComfyUI
cp -r dist ../web
```

## 部署后验证

1. **启动绘智认证服务**
   ```bash
   cd /Users/yaogengzhu/Documents/llm/huizhi-auth-service
   npm start
   ```

2. **启动 ComfyUI**
   ```bash
   cd /Users/yaogengzhu/Documents/llm/ComfyUI
   python main.py
   ```

3. **测试流程**
   - 访问 http://localhost:8188/login
   - 使用绘智账号登录
   - 登录后应自动跳转首页
   - 点击"运行"执行工作流，不应再弹出 ComfyOrg 登录窗口
   - 检查浏览器控制台，应看到 `[Huizhi]` 开头的日志

## 调试技巧

### 查看 Token 状态

在浏览器控制台执行：

```javascript
// 检查绘智登录状态
console.log('Huizhi Token:', localStorage.getItem('huizhi_token'));
console.log('ComfyOrg Token:', localStorage.getItem('comfy_org_token'));
console.log('User Info:', localStorage.getItem('huizhi_user_info'));
```

### 手动清除登录状态

```javascript
localStorage.removeItem('huizhi_token');
localStorage.removeItem('comfy_org_token');
localStorage.removeItem('huizhi_user_info');
location.reload();
```

## 注意事项

1. **ComfyOrg Token 过期**：Token 有效期约 1 小时，需要在绘智认证服务中实现自动刷新逻辑
2. **Firebase 原始状态**：魔改后不影响 Firebase 原始登录功能，两种登录方式可以并存
3. **构建模式**：使用 `DISTRIBUTION=localhost` 构建，这是非云端版本

## 文件结构

```
ComfyUI/
├── ComfyUI_frontend/              # 魔改的前端源码
│   ├── src/
│   │   ├── stores/
│   │   │   └── firebaseAuthStore.ts  # 魔改的核心文件
│   │   └── services/
│   │       └── dialogService.ts       # 魔改的登录弹窗逻辑
│   ├── build-huizhi.sh               # 构建脚本
│   └── HUIZHI_DEPLOY_GUIDE.md        # 本文档
├── web_custom/
│   └── login.html                    # 绘智登录页面
└── web/                              # 构建后的前端资源 (替换)
```
