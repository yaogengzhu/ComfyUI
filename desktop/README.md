# ComfyUI Desktop

基于 Electron 的 ComfyUI 桌面应用，提供一键安装体验。

## ✨ 功能特性

- 🚀 **一键启动** - 自动管理 Python 后端，无需手动命令行操作
- 🔐 **用户认证** - 内置登录系统，保护您的 AI 工作流
- 🎨 **首次设置向导** - 引导式配置，自动检测环境
- 📦 **模型下载器** - 内置热门模型下载，支持断点续传
- 💻 **跨平台支持** - Windows、macOS、Linux 全平台
- 🔧 **系统托盘** - 最小化到托盘，后台运行

## 🛠️ 开发环境

### 前置要求

- Node.js 18+
- Python 3.10+ (已安装 ComfyUI 依赖)
- npm 或 yarn

### 安装依赖

```bash
cd desktop
npm install
```

### 开发运行

```bash
# 启动开发模式
npm start

# 带调试信息启动
npm run start:dev
```

### 重置配置（首次运行向导）

```bash
npm run reset-config
```

## 📦 打包发布

### 创建内嵌 Python 环境（可选，用于完整一键安装）

```bash
# macOS/Linux
npm run setup-python

# 这将创建独立的 Python 环境到 desktop/python_env/
```

### 构建安装包

```bash
# 构建当前平台
npm run build

# 构建指定平台
npm run build:mac    # macOS: .dmg, .zip
npm run build:win    # Windows: .exe (NSIS), portable
npm run build:linux  # Linux: .AppImage, .deb
```

构建产物位于 `desktop/dist/` 目录。

## 📁 目录结构

```
desktop/
├── main.js              # Electron 主进程
├── preload.js           # 预加载脚本（安全 IPC）
├── splash.html          # 启动画面
├── setup-wizard.html    # 首次设置向导
├── package.json         # 项目配置
├── assets/              # 应用资源
│   ├── icon.png         # 应用图标
│   └── tray-icon.png    # 托盘图标
├── scripts/             # 构建脚本
│   ├── setup-python-env.sh   # Python 环境打包
│   └── download-models.js    # 模型下载器
└── dist/                # 构建输出（git ignored）
```

## ⚙️ 配置项

配置存储在 electron-store 中，路径：
- **macOS**: `~/Library/Application Support/comfyui-desktop/config.json`
- **Windows**: `%APPDATA%/comfyui-desktop/config.json`
- **Linux**: `~/.config/comfyui-desktop/config.json`

### 可配置项

| 配置项 | 默认值 | 说明 |
|--------|--------|------|
| `serverPort` | 8188 | ComfyUI 服务端口 |
| `enableAuth` | true | 启用用户认证 |
| `pythonPath` | 自动检测 | Python 可执行文件路径 |
| `autoStart` | false | 开机自动启动 |
| `useGpu` | true | 使用 GPU 加速 |

## 🔧 一键安装方案

### 完整打包流程

1. **准备 Python 环境**
   ```bash
   npm run setup-python
   ```
   这将下载 Miniconda 并创建独立的 Python 环境，包含所有依赖。

2. **下载基础模型（可选）**
   ```bash
   node scripts/download-models.js ../models
   ```

3. **构建安装包**
   ```bash
   npm run build
   ```

### Windows 特别说明

Windows 版本支持 Python Embeddable 模式：
- 安装包会包含独立的 Python 环境
- 用户无需预装 Python
- 首次启动会自动配置

### macOS 特别说明

macOS 版本使用 Miniconda 打包：
- 支持 Intel 和 Apple Silicon
- 自动检测 MPS 加速
- 需要 Xcode Command Line Tools

## 🐛 故障排除

### Python 环境问题

如果启动时提示 Python 相关错误：

1. 检查 Python 是否正确安装：
   ```bash
   python3 --version
   ```

2. 确认 ComfyUI 依赖已安装：
   ```bash
   pip list | grep torch
   ```

3. 手动指定 Python 路径（在设置中）

### 模型下载失败

- 检查网络连接
- 尝试使用代理
- 手动下载模型放入 `models/` 对应目录

### 启动画面卡住

- 检查端口 8188 是否被占用
- 查看控制台日志（开发者工具）
- 尝试重启应用

## 📄 许可证

MIT License - 详见 [LICENSE](../LICENSE)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

Made with ❤️ by Victor
