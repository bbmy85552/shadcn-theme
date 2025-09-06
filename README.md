# Shadcn Theme Customizer

一个基于 Next.js 和 shadcn/ui 的主题自定义工具，让用户可以实时预览和调整应用主题。

## 功能特性

- 🎨 **实时主题预览** - 修改颜色后立即看到效果
- 🍪 **Cookie 自动保存** - 主题配置自动保存到浏览器
- 📦 **预设主题** - 内置多种精美的主题预设
- 🌍 **社区主题库** - 包含 GitHub Dark、Dracula、Nord 等热门主题
- 🔗 **网络导入** - 从 GitHub、Gist 或任意 URL 导入主题配置
- 📤 **主题分享** - 生成分享链接，一键分享到各大平台
- 🎯 **HSL 颜色支持** - 完整的 HSL 颜色空间支持
- 📱 **响应式设计** - 适配各种屏幕尺寸
- 🔧 **导入导出** - 支持主题配置的导入和导出

## 技术栈

- **Next.js 14** - React 全栈框架
- **TypeScript** - 类型安全
- **Tailwind CSS** - 原子化 CSS
- **shadcn/ui** - 高质量 React 组件库
- **Radix UI** - 无障碍的底层组件
- **js-cookie** - Cookie 管理

## 快速开始

1. 安装依赖：
```bash
pnpm install
```

2. 启动开发服务器：
```bash
pnpm dev
```

3. 打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 项目结构

```
src/
├── app/                 # Next.js App Router
│   ├── globals.css     # 全局样式和 CSS 变量
│   ├── layout.tsx      # 根布局
│   └── page.tsx        # 主页
├── components/         # React 组件
│   ├── ui/            # shadcn/ui 基础组件
│   └── theme-customizer.tsx  # 主题自定义器
└── lib/               # 工具函数
    ├── utils.ts       # 通用工具
    └── theme.ts       # 主题管理逻辑
```

## 主要组件

### ThemeCustomizer
主要的主题自定义界面，包含：
- 预设主题选择
- 颜色自定义面板
- 圆角大小调节
- 组件预览区域
- 导入/导出功能

### 主题管理 (theme.ts)
- `applyTheme()` - 应用主题到 DOM
- `saveTheme()` - 保存主题到 Cookie
- `loadTheme()` - 从 Cookie 加载主题
- `hslToHex()` / `hexToHsl()` - 颜色格式转换

## 自定义主题

主题配置包含以下属性：

```typescript
interface ThemeConfig {
  primary: string      // 主色调
  secondary: string    // 次要色
  accent: string       // 强调色
  destructive: string  // 危险色
  background: string   // 背景色
  foreground: string   // 前景色
  muted: string       // 静音色
  border: string      // 边框色
  radius: number      // 圆角大小
}
```

所有颜色值使用 HSL 格式，例如：`"221.2 83.2% 53.3%"`

## 主题分享与导入

### 分享主题

1. **生成分享链接**：在"社区主题"标签页中点击"生成分享链接"
2. **分享到平台**：支持一键分享到 GitHub Gist、CodePen 等平台
3. **复制链接**：直接复制分享链接发送给他人

### 导入主题

支持多种导入方式：

1. **从 URL 导入**：
   - GitHub raw 文件：`https://raw.githubusercontent.com/user/repo/main/theme.json`
   - Gist 链接：`https://gist.githubusercontent.com/user/id/raw/theme.json`
   - 分享链接：应用生成的主题分享链接

2. **本地文件导入**：直接上传 JSON 格式的主题配置文件

3. **示例主题**：
   ```bash
   # 导入示例主题（需要启动开发服务器）
   http://localhost:3000/themes/github-dark.json
   http://localhost:3000/themes/dracula.json
   http://localhost:3000/themes/nord.json
   ```

### 主题配置格式

```json
{
  "name": "我的主题",
  "description": "主题描述",
  "author": "作者名称",
  "config": {
    "primary": "221.2 83.2% 53.3%",
    "secondary": "210 40% 96%",
    "accent": "210 40% 96%",
    "destructive": "0 84.2% 60.2%",
    "background": "0 0% 100%",
    "foreground": "222.2 84% 4.9%",
    "muted": "210 40% 96%",
    "border": "214.3 31.8% 91.4%",
    "radius": 0.5
  }
}
```

## 构建部署

### 本地构建

```bash
# 构建生产版本
pnpm build

# 启动生产服务器
pnpm start
```

### 部署到 Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/你的用户名/shadcn-theme)

1. 点击上方按钮或访问 [vercel.com](https://vercel.com)
2. 连接你的 GitHub 仓库
3. 点击部署，Vercel 会自动处理构建和部署

### 其他部署平台

- **Netlify**: 支持静态导出部署
- **GitHub Pages**: 通过 GitHub Actions 自动部署
- **Railway**: 支持 Node.js 应用部署

详细部署指南请参考 [DEPLOYMENT.md](./DEPLOYMENT.md)

## 项目特色

- 🎨 **12个 shadcn/ui 官方主题** - Slate、Gray、Zinc、Neutral、Stone、Red、Rose、Orange、Green、Blue、Yellow、Violet
- 🌍 **8个社区精选主题** - GitHub Dark、Dracula、Nord、Solarized、Catppuccin、Tokyo Night、Gruvbox、One Dark
- 🔗 **多种分享方式** - 分享链接、GitHub Gist、CodePen 导出
- 📱 **完美响应式** - 左侧 1/3 主题选择，右侧 2/3 实时预览
- ⚡ **极速构建** - 优化的 TypeScript 配置和 Next.js 14

## 许可证

MIT License
