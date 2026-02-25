#!/bin/bash
# ComfyUI Desktop - Python 环境打包脚本
# 用于创建独立的 Python 环境，供桌面应用使用

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$(dirname "$SCRIPT_DIR")")"
DESKTOP_DIR="$SCRIPT_DIR/.."
PYTHON_ENV_DIR="$DESKTOP_DIR/python_env"

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检测操作系统
detect_os() {
    case "$(uname -s)" in
        Darwin*)    echo "macos";;
        Linux*)     echo "linux";;
        MINGW*|MSYS*|CYGWIN*) echo "windows";;
        *)          echo "unknown";;
    esac
}

# 检测架构
detect_arch() {
    case "$(uname -m)" in
        x86_64|amd64)   echo "x64";;
        arm64|aarch64)  echo "arm64";;
        *)              echo "unknown";;
    esac
}

OS=$(detect_os)
ARCH=$(detect_arch)

log_info "检测到系统: $OS ($ARCH)"

# 创建 Python 环境目录
setup_python_env() {
    log_info "创建 Python 环境目录..."
    
    rm -rf "$PYTHON_ENV_DIR"
    mkdir -p "$PYTHON_ENV_DIR"
    
    if [ "$OS" == "macos" ] || [ "$OS" == "linux" ]; then
        setup_conda_env
    elif [ "$OS" == "windows" ]; then
        setup_windows_python
    else
        log_error "不支持的操作系统: $OS"
        exit 1
    fi
}

# macOS/Linux: 使用 Miniconda 创建独立环境
setup_conda_env() {
    log_info "下载 Miniconda..."
    
    CONDA_INSTALLER="$PYTHON_ENV_DIR/miniconda_installer.sh"
    
    if [ "$OS" == "macos" ]; then
        if [ "$ARCH" == "arm64" ]; then
            CONDA_URL="https://repo.anaconda.com/miniconda/Miniconda3-latest-MacOSX-arm64.sh"
        else
            CONDA_URL="https://repo.anaconda.com/miniconda/Miniconda3-latest-MacOSX-x86_64.sh"
        fi
    else
        if [ "$ARCH" == "arm64" ]; then
            CONDA_URL="https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-aarch64.sh"
        else
            CONDA_URL="https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh"
        fi
    fi
    
    curl -L -o "$CONDA_INSTALLER" "$CONDA_URL"
    
    log_info "安装 Miniconda..."
    bash "$CONDA_INSTALLER" -b -p "$PYTHON_ENV_DIR/conda" -f
    
    rm "$CONDA_INSTALLER"
    
    # 初始化 conda
    source "$PYTHON_ENV_DIR/conda/etc/profile.d/conda.sh"
    
    log_info "创建 ComfyUI Python 环境..."
    conda create -y -p "$PYTHON_ENV_DIR/comfyui_env" python=3.11
    
    conda activate "$PYTHON_ENV_DIR/comfyui_env"
    
    log_info "安装 ComfyUI 依赖..."
    install_dependencies
    
    conda deactivate
    
    # 清理 conda 缓存以减小体积
    log_info "清理缓存..."
    conda clean -a -y
    
    # 创建启动脚本
    create_launcher_script
}

# Windows: 使用 Python Embeddable
setup_windows_python() {
    log_info "下载 Python Embeddable..."
    
    PYTHON_VERSION="3.11.7"
    if [ "$ARCH" == "arm64" ]; then
        PYTHON_URL="https://www.python.org/ftp/python/${PYTHON_VERSION}/python-${PYTHON_VERSION}-embed-arm64.zip"
    else
        PYTHON_URL="https://www.python.org/ftp/python/${PYTHON_VERSION}/python-${PYTHON_VERSION}-embed-amd64.zip"
    fi
    
    PYTHON_ZIP="$PYTHON_ENV_DIR/python_embed.zip"
    curl -L -o "$PYTHON_ZIP" "$PYTHON_URL"
    
    log_info "解压 Python..."
    unzip -q "$PYTHON_ZIP" -d "$PYTHON_ENV_DIR/python"
    rm "$PYTHON_ZIP"
    
    # 启用 pip
    log_info "配置 pip..."
    PYTHON_PTH="$PYTHON_ENV_DIR/python/python311._pth"
    echo "python311.zip" > "$PYTHON_PTH"
    echo "." >> "$PYTHON_PTH"
    echo "Lib/site-packages" >> "$PYTHON_PTH"
    echo "import site" >> "$PYTHON_PTH"
    
    # 下载 get-pip.py
    curl -L -o "$PYTHON_ENV_DIR/python/get-pip.py" "https://bootstrap.pypa.io/get-pip.py"
    "$PYTHON_ENV_DIR/python/python.exe" "$PYTHON_ENV_DIR/python/get-pip.py"
    
    log_info "安装依赖..."
    "$PYTHON_ENV_DIR/python/python.exe" -m pip install --upgrade pip
    install_dependencies_windows
}

# 安装 ComfyUI 依赖
install_dependencies() {
    log_info "安装核心依赖..."
    
    # 基础依赖
    pip install --upgrade pip
    
    # 从 requirements.txt 安装
    if [ -f "$PROJECT_ROOT/requirements.txt" ]; then
        pip install -r "$PROJECT_ROOT/requirements.txt"
    fi
    
    # PyTorch (根据平台选择)
    if [ "$OS" == "macos" ]; then
        log_info "安装 PyTorch (MPS 支持)..."
        pip install torch torchvision torchaudio
    else
        log_info "安装 PyTorch (CUDA 支持)..."
        pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121
    fi
    
    # 额外的常用包
    pip install \
        transformers \
        accelerate \
        safetensors \
        einops \
        opencv-python \
        scikit-image \
        sqlalchemy \
        aiohttp \
        aiosqlite
    
    log_info "依赖安装完成!"
}

install_dependencies_windows() {
    PYTHON_EXE="$PYTHON_ENV_DIR/python/python.exe"
    
    if [ -f "$PROJECT_ROOT/requirements.txt" ]; then
        "$PYTHON_EXE" -m pip install -r "$PROJECT_ROOT/requirements.txt"
    fi
    
    # PyTorch with CUDA
    "$PYTHON_EXE" -m pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121
    
    "$PYTHON_EXE" -m pip install \
        transformers \
        accelerate \
        safetensors \
        einops \
        opencv-python \
        scikit-image \
        sqlalchemy \
        aiohttp \
        aiosqlite
}

# 创建启动脚本
create_launcher_script() {
    log_info "创建启动脚本..."
    
    if [ "$OS" == "macos" ] || [ "$OS" == "linux" ]; then
        cat > "$PYTHON_ENV_DIR/run_comfyui.sh" << 'EOF'
#!/bin/bash
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/conda/etc/profile.d/conda.sh"
conda activate "$SCRIPT_DIR/comfyui_env"
python "$@"
EOF
        chmod +x "$PYTHON_ENV_DIR/run_comfyui.sh"
    fi
    
    log_info "启动脚本创建完成: $PYTHON_ENV_DIR/run_comfyui.sh"
}

# 打印环境信息
print_env_info() {
    log_info "Python 环境准备完成!"
    echo ""
    echo "环境目录: $PYTHON_ENV_DIR"
    echo ""
    if [ "$OS" == "macos" ] || [ "$OS" == "linux" ]; then
        echo "Python 路径: $PYTHON_ENV_DIR/comfyui_env/bin/python"
        echo "启动脚本: $PYTHON_ENV_DIR/run_comfyui.sh"
    else
        echo "Python 路径: $PYTHON_ENV_DIR/python/python.exe"
    fi
    echo ""
    
    # 计算目录大小
    ENV_SIZE=$(du -sh "$PYTHON_ENV_DIR" | cut -f1)
    echo "环境大小: $ENV_SIZE"
}

# 主函数
main() {
    log_info "开始设置 ComfyUI Python 环境..."
    echo ""
    
    setup_python_env
    print_env_info
    
    echo ""
    log_info "设置完成! 现在可以运行 'npm run build' 打包桌面应用"
}

main "$@"
