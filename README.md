# Shadcn Theme Customizer

一个基于 Next.js 和 shadcn/ui 的主题自定义工具，让用户可以实时预览和调整应用主题。

## 功能特性

- 🎨 **实时主题预览** - 修改颜色后立即看到效果
- 🍪 **Cookie 自动保存** - 主题配置自动保存到浏览器
- 📦 **预设主题** - 内置多种精美的主题预设
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

## 构建部署

```bash
# 构建生产版本
pnpm build

# 启动生产服务器
pnpm start
```

## 许可证

MIT License
