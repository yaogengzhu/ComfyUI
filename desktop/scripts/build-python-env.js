/**
 * 绘智 AI Desktop - 预构建 Python 环境脚本
 *
 * 用法：
 *   node scripts/build-python-env.js
 *
 * 作用：
 *   在打包阶段使用 AutoInstaller 在 desktop 目录下创建内置 Python 环境
 *   （desktop/python_env），然后在最终应用中直接作为内置 Python 使用，
 *   用户侧不再需要首次启动时在线安装。
 */

const path = require('path');
const fs = require('fs');
const AutoInstaller = require('./auto-installer');

async function main() {
  const desktopDir = __dirname; // .../desktop/scripts -> .../desktop
  const rootDir = path.join(desktopDir, '..');

  console.log('==============================');
  console.log(' 构建内置 Python 环境 (build)');
  console.log(' workspace:', rootDir);
  console.log('==============================\n');

  // 确保在构建机上只执行一次耗时安装，避免每次重复完整安装
  const pythonEnvDir = path.join(desktopDir, 'python_env');
  const pythonBinMac = path.join(pythonEnvDir, 'python', 'bin', 'python3');
  const pythonBinWin = path.join(pythonEnvDir, 'python', 'python.exe');

  if (fs.existsSync(pythonBinMac) || fs.existsSync(pythonBinWin)) {
    console.log('[跳过] 已检测到内置 Python 环境，直接复用现有 python_env 目录。');
    return;
  }

  const installer = new AutoInstaller({
    // 注意：这里的 installPath 传 desktop 目录，使得 python_env 位于
    // desktop/python_env，下方 main.js 的 getBuiltinPythonPath 已经按照
    // 这个目录结构来查找。
    installPath: desktopDir,
    comfyuiPath: rootDir,
    mirror: process.env.HZ_MIRROR || 'default',
    onProgress: (data) => {
      if (!data) return;
      const percent = data.percent != null ? ` ${data.percent}%` : '';
      console.log(`[进度] [${data.stage || 'stage'}] ${data.message || ''}${percent}`);
    },
    onLog: (msg) => {
      if (msg) console.log(msg);
    }
  });

  const result = await installer.install();

  if (!result || !result.success) {
    console.error('\n[错误] 构建内置 Python 环境失败: ', result && result.error);
    process.exit(1);
  }

  console.log('\n[完成] 内置 Python 环境已创建: ', result.pythonPath);
}

main().catch((err) => {
  console.error('[致命错误] 构建 Python 环境脚本异常: ', err);
  process.exit(1);
});

