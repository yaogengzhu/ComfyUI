#!/bin/bash
# ComfyUI Desktop 构建脚本

set -e

echo "🎨 ComfyUI Desktop Builder"
echo "=========================="

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ 错误: 未安装 Node.js"
    echo "请先安装 Node.js: https://nodejs.org/"
    exit 1
fi

# 检查 npm
if ! command -v npm &> /dev/null; then
    echo "❌ 错误: 未安装 npm"
    exit 1
fi

echo "✅ Node.js $(node -v)"
echo "✅ npm $(npm -v)"

# 进入目录
cd "$(dirname "$0")"

# 安装依赖
echo ""
echo "📦 安装依赖..."
npm install

# 检查图标文件
if [ ! -f "assets/icon.png" ]; then
    echo ""
    echo "⚠️  警告: 未找到 assets/icon.png"
    echo "请准备图标文件后再构建，或使用默认图标"
fi

# 构建
echo ""
echo "🔨 开始构建..."

case "$1" in
    mac)
        echo "构建 macOS 版本..."
        npm run build:mac
        ;;
    win)
        echo "构建 Windows 版本..."
        npm run build:win
        ;;
    linux)
        echo "构建 Linux 版本..."
        npm run build:linux
        ;;
    *)
        echo "构建所有平台..."
        npm run build
        ;;
esac

echo ""
echo "✅ 构建完成！"
echo "📁 输出目录: $(pwd)/dist"
ls -la dist/ 2>/dev/null || echo "(目录为空或构建失败)"
