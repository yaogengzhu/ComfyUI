# 打包进 App 的默认工作流

此目录中的 **ComfyUI 工作流 JSON 文件** 会在执行 `npm run build` 时被打包进绘智 AI Desktop 安装包。

- 打包后路径对应为 ComfyUI 的 `user/default/workflows/`，应用内可直接加载。
- 将需要随 App 分发的 `.json` 工作流文件放入本目录后，再执行构建即可。

## 从本地工作流同步

若工作流保存在 `user/default/workflows/`，构建前可先复制过来：

```bash
# 在项目根目录执行
cp user/default/workflows/*.json desktop/bundled_workflows/
```

或使用 npm 脚本（在 desktop 目录下）：

```bash
cd desktop && npm run copy-workflows
```
