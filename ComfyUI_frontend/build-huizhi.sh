#!/bin/bash

# ============================================
# 绘智 AI - ComfyUI 前端构建脚本
# ============================================

set -e

echo "=========================================="
echo "绘智 AI - ComfyUI 前端构建"
echo "=========================================="

# 获取脚本所在目录
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# 检查 pnpm
if ! command -v pnpm &> /dev/null; then
    echo "❌ 需要安装 pnpm: npm install -g pnpm"
    exit 1
fi

# 安装依赖
echo ""
echo "📦 安装依赖..."
pnpm install

# 构建
echo ""
echo "🔨 构建前端..."
# 使用 localhost 分发模式（不是 cloud）
DISTRIBUTION=localhost pnpm build

# 复制到 ComfyUI
echo ""
echo "📋 复制构建产物到 ComfyUI..."

COMFYUI_WEB_DIR="../web"

# 直接覆盖 web 目录（不做备份）
if [ -d "$COMFYUI_WEB_DIR" ]; then
    rm -rf "$COMFYUI_WEB_DIR"
fi
echo "📋 复制 dist 到 ComfyUI/web..."
cp -r dist "$COMFYUI_WEB_DIR"

echo ""
echo "=========================================="
echo "✅ 构建完成！"
echo "=========================================="
echo ""
echo "下一步："
echo "1. 启动绘智认证服务: cd ../huizhi-auth-service && npm start"
echo "2. 启动 ComfyUI: python ../main.py"
echo "3. 访问: http://localhost:8188"
echo ""
