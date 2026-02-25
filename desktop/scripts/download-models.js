/**
 * ComfyUI Desktop - 模型下载器
 * 用于下载 ComfyUI 所需的基础模型
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { EventEmitter } = require('events');

class ModelDownloader extends EventEmitter {
    constructor(modelsDir) {
        super();
        this.modelsDir = modelsDir;
        this.downloads = new Map();
    }

    // 模型配置
    static getModelConfigs() {
        return {
            // Stable Diffusion 基础模型
            checkpoints: [
                {
                    name: 'sd_xl_base_1.0.safetensors',
                    url: 'https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0/resolve/main/sd_xl_base_1.0.safetensors',
                    size: '6.94 GB',
                    description: 'Stable Diffusion XL 基础模型',
                    required: false
                },
                {
                    name: 'v1-5-pruned-emaonly.safetensors',
                    url: 'https://huggingface.co/runwayml/stable-diffusion-v1-5/resolve/main/v1-5-pruned-emaonly.safetensors',
                    size: '4.27 GB',
                    description: 'Stable Diffusion 1.5 模型',
                    required: false
                }
            ],
            // VAE 模型
            vae: [
                {
                    name: 'sdxl_vae.safetensors',
                    url: 'https://huggingface.co/stabilityai/sdxl-vae/resolve/main/sdxl_vae.safetensors',
                    size: '335 MB',
                    description: 'SDXL VAE 解码器',
                    required: false
                }
            ],
            // CLIP 模型
            clip: [
                {
                    name: 'clip_l.safetensors',
                    url: 'https://huggingface.co/comfyanonymous/flux_text_encoders/resolve/main/clip_l.safetensors',
                    size: '246 MB',
                    description: 'CLIP-L 文本编码器',
                    required: false
                }
            ],
            // ControlNet 模型
            controlnet: [
                {
                    name: 'control_v11p_sd15_canny.pth',
                    url: 'https://huggingface.co/lllyasviel/ControlNet-v1-1/resolve/main/control_v11p_sd15_canny.pth',
                    size: '1.45 GB',
                    description: 'ControlNet Canny 边缘检测',
                    required: false
                }
            ],
            // Upscale 模型
            upscale_models: [
                {
                    name: 'RealESRGAN_x4plus.pth',
                    url: 'https://github.com/xinntao/Real-ESRGAN/releases/download/v0.1.0/RealESRGAN_x4plus.pth',
                    size: '67 MB',
                    description: 'Real-ESRGAN 4x 放大模型',
                    required: false
                }
            ]
        };
    }

    // 获取已下载的模型
    getInstalledModels() {
        const installed = {};
        const configs = ModelDownloader.getModelConfigs();

        for (const [category, models] of Object.entries(configs)) {
            const categoryDir = path.join(this.modelsDir, category);
            installed[category] = [];

            if (fs.existsSync(categoryDir)) {
                for (const model of models) {
                    const modelPath = path.join(categoryDir, model.name);
                    if (fs.existsSync(modelPath)) {
                        const stats = fs.statSync(modelPath);
                        installed[category].push({
                            ...model,
                            installed: true,
                            localSize: this.formatBytes(stats.size)
                        });
                    } else {
                        installed[category].push({
                            ...model,
                            installed: false
                        });
                    }
                }
            } else {
                installed[category] = models.map(m => ({ ...m, installed: false }));
            }
        }

        return installed;
    }

    // 下载模型
    async downloadModel(category, modelName, progressCallback) {
        const configs = ModelDownloader.getModelConfigs();
        const model = configs[category]?.find(m => m.name === modelName);

        if (!model) {
            throw new Error(`模型未找到: ${category}/${modelName}`);
        }

        const categoryDir = path.join(this.modelsDir, category);
        if (!fs.existsSync(categoryDir)) {
            fs.mkdirSync(categoryDir, { recursive: true });
        }

        const destPath = path.join(categoryDir, model.name);
        const tempPath = destPath + '.downloading';

        return new Promise((resolve, reject) => {
            const downloadId = `${category}/${modelName}`;
            
            const download = {
                url: model.url,
                destPath,
                tempPath,
                progress: 0,
                totalSize: 0,
                downloadedSize: 0,
                status: 'downloading'
            };

            this.downloads.set(downloadId, download);

            const doDownload = (url, redirectCount = 0) => {
                if (redirectCount > 5) {
                    reject(new Error('重定向次数过多'));
                    return;
                }

                const protocol = url.startsWith('https') ? https : http;
                
                const request = protocol.get(url, {
                    headers: {
                        'User-Agent': 'ComfyUI-Desktop/1.0'
                    }
                }, (response) => {
                    // 处理重定向
                    if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                        doDownload(response.headers.location, redirectCount + 1);
                        return;
                    }

                    if (response.statusCode !== 200) {
                        reject(new Error(`下载失败: HTTP ${response.statusCode}`));
                        return;
                    }

                    const totalSize = parseInt(response.headers['content-length'], 10) || 0;
                    download.totalSize = totalSize;

                    const file = fs.createWriteStream(tempPath);
                    let downloadedSize = 0;

                    response.on('data', (chunk) => {
                        downloadedSize += chunk.length;
                        download.downloadedSize = downloadedSize;
                        download.progress = totalSize > 0 ? (downloadedSize / totalSize) * 100 : 0;

                        if (progressCallback) {
                            progressCallback({
                                model: modelName,
                                progress: download.progress,
                                downloadedSize: this.formatBytes(downloadedSize),
                                totalSize: this.formatBytes(totalSize)
                            });
                        }

                        this.emit('progress', {
                            downloadId,
                            ...download
                        });
                    });

                    response.pipe(file);

                    file.on('finish', () => {
                        file.close(() => {
                            // 重命名临时文件
                            fs.renameSync(tempPath, destPath);
                            download.status = 'completed';
                            this.downloads.delete(downloadId);
                            
                            this.emit('complete', { downloadId, model });
                            resolve({ success: true, path: destPath });
                        });
                    });

                    file.on('error', (err) => {
                        fs.unlinkSync(tempPath);
                        download.status = 'error';
                        reject(err);
                    });
                });

                request.on('error', (err) => {
                    download.status = 'error';
                    reject(err);
                });

                request.setTimeout(30000, () => {
                    request.destroy();
                    reject(new Error('下载超时'));
                });
            };

            doDownload(model.url);
        });
    }

    // 取消下载
    cancelDownload(category, modelName) {
        const downloadId = `${category}/${modelName}`;
        const download = this.downloads.get(downloadId);
        
        if (download) {
            download.status = 'cancelled';
            if (fs.existsSync(download.tempPath)) {
                fs.unlinkSync(download.tempPath);
            }
            this.downloads.delete(downloadId);
            return true;
        }
        return false;
    }

    // 删除模型
    deleteModel(category, modelName) {
        const modelPath = path.join(this.modelsDir, category, modelName);
        if (fs.existsSync(modelPath)) {
            fs.unlinkSync(modelPath);
            return true;
        }
        return false;
    }

    // 格式化字节
    formatBytes(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // 检查磁盘空间
    checkDiskSpace(requiredBytes) {
        // 简单实现，实际可能需要使用 diskusage 等库
        return { available: true, freeSpace: 'N/A' };
    }
}

module.exports = ModelDownloader;

// 命令行模式
if (require.main === module) {
    const args = process.argv.slice(2);
    const modelsDir = args[0] || path.join(__dirname, '..', '..', 'models');
    
    const downloader = new ModelDownloader(modelsDir);
    
    console.log('ComfyUI 模型下载器');
    console.log('==================');
    console.log(`模型目录: ${modelsDir}`);
    console.log('');
    
    const installed = downloader.getInstalledModels();
    
    for (const [category, models] of Object.entries(installed)) {
        console.log(`\n📁 ${category}:`);
        for (const model of models) {
            const status = model.installed ? '✅' : '❌';
            console.log(`  ${status} ${model.name} (${model.size}) - ${model.description}`);
        }
    }
    
    console.log('\n使用方法:');
    console.log('  node download-models.js <models_dir>');
}
