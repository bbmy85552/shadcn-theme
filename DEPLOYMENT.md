# 部署指南

## Vercel 部署

### 快速部署

1. **推送代码到 GitHub**：
   ```bash
   git add .
   git commit -m "feat: 完成主题自定义器开发"
   git push origin main
   ```

2. **连接 Vercel**：
   - 访问 [vercel.com](https://vercel.com)
   - 使用 GitHub 账号登录
   - 点击 "New Project"
   - 选择你的仓库
   - 点击 "Deploy"

### 环境变量

本项目不需要任何环境变量，可以直接部署。

### 构建设置

Vercel 会自动检测 Next.js 项目，使用以下默认设置：
- **Framework Preset**: Next.js
- **Build Command**: `pnpm build`
- **Output Directory**: `.next`
- **Install Command**: `pnpm install`

### 已修复的部署问题

✅ **TypeScript 编译错误**：
- 更新 `tsconfig.json` 的 `target` 从 `es5` 到 `es2017`
- 添加 `downlevelIteration: true` 支持 Set 展开语法

✅ **Next.js 配置警告**：
- 移除过时的 `experimental.appDir` 配置
- App Router 在 Next.js 13.4+ 中已经稳定

✅ **Set 展开语法兼容性**：
- 使用 `Array.from(new Set(...))` 替代 `...new Set(...)`

## 其他部署平台

### Netlify

1. **构建设置**：
   - Build command: `pnpm build && pnpm export`
   - Publish directory: `out`

2. **添加 `next.config.js` 配置**：
   ```javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: 'export',
     trailingSlash: true,
     images: {
       unoptimized: true
     }
   }
   
   module.exports = nextConfig
   ```

### GitHub Pages

1. **添加部署脚本到 `package.json`**：
   ```json
   {
     "scripts": {
       "export": "next build && next export"
     }
   }
   ```

2. **创建 GitHub Actions 工作流**：
   ```yaml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         - uses: actions/setup-node@v2
           with:
             node-version: '18'
         - uses: pnpm/action-setup@v2
           with:
             version: 8
         - run: pnpm install
         - run: pnpm build
         - run: pnpm export
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./out
   ```

## 性能优化

### 构建优化

- ✅ 使用 pnpm 包管理器，安装速度更快
- ✅ 启用 TypeScript 增量编译
- ✅ 使用 Next.js 14 的最新优化特性

### 运行时优化

- ✅ 组件懒加载和代码分割
- ✅ CSS 变量实时更新优化
- ✅ Cookie 持久化存储

## 故障排除

### 常见问题

1. **构建失败 - TypeScript 错误**：
   - 确保 `tsconfig.json` 中的 `target` 设置为 `es2017` 或更高
   - 确保启用了 `downlevelIteration`

2. **样式不生效**：
   - 检查 Tailwind CSS 配置
   - 确保 `globals.css` 正确导入

3. **主题不保存**：
   - 检查浏览器是否启用了 Cookie
   - 确保域名配置正确

### 调试命令

```bash
# 本地构建测试
pnpm build

# 本地预览构建结果
pnpm start

# 类型检查
pnpm run type-check

# 代码检查
pnpm run lint
```

## 监控和分析

### Vercel Analytics

在 Vercel 项目设置中启用：
- **Analytics**: 查看页面性能和用户行为
- **Speed Insights**: 监控 Core Web Vitals

### 自定义监控

可以添加以下监控工具：
- Google Analytics
- Plausible Analytics
- Umami Analytics

## 更新和维护

### 依赖更新

```bash
# 检查过时的依赖
pnpm outdated

# 更新依赖
pnpm update

# 更新 Next.js
pnpm add next@latest
```

### 安全更新

```bash
# 检查安全漏洞
pnpm audit

# 修复安全漏洞
pnpm audit fix
```
