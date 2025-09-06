import { ThemeConfig } from './theme'

// 社区主题库 - 精选的第三方主题
export interface CommunityTheme {
  id: string
  name: string
  description: string
  author: string
  tags: string[]
  config: ThemeConfig
  preview?: string
  githubUrl?: string
  websiteUrl?: string
}

export const communityThemes: CommunityTheme[] = [
  {
    id: 'github-dark',
    name: 'GitHub Dark',
    description: 'GitHub 暗色主题风格，适合开发者',
    author: 'GitHub',
    tags: ['dark', 'developer', 'professional'],
    config: {
      primary: "213 94% 68%",
      secondary: "215 28% 17%",
      accent: "215 28% 17%",
      destructive: "0 84% 60%",
      background: "220 13% 9%",
      foreground: "220 9% 46%",
      muted: "215 28% 17%",
      border: "215 28% 17%",
      radius: 0.375
    },
    githubUrl: 'https://github.com/primer/primitives'
  },
  {
    id: 'dracula',
    name: 'Dracula',
    description: '经典的 Dracula 暗色主题，神秘优雅',
    author: 'Dracula Team',
    tags: ['dark', 'purple', 'popular'],
    config: {
      primary: "265 89% 78%",
      secondary: "231 15% 18%",
      accent: "326 100% 74%",
      destructive: "0 100% 67%",
      background: "230 15% 15%",
      foreground: "60 30% 96%",
      muted: "231 15% 18%",
      border: "231 15% 25%",
      radius: 0.5
    },
    websiteUrl: 'https://draculatheme.com/'
  },
  {
    id: 'nord',
    name: 'Nord',
    description: '北欧风格的冷色调主题，简洁清爽',
    author: 'Arctic Ice Studio',
    tags: ['light', 'blue', 'minimal'],
    config: {
      primary: "213 32% 52%",
      secondary: "220 16% 96%",
      accent: "354 42% 56%",
      destructive: "354 42% 56%",
      background: "0 0% 100%",
      foreground: "220 16% 22%",
      muted: "220 14% 96%",
      border: "220 13% 91%",
      radius: 0.25
    },
    websiteUrl: 'https://www.nordtheme.com/'
  },
  {
    id: 'solarized-light',
    name: 'Solarized Light',
    description: '经典的 Solarized 亮色主题，护眼舒适',
    author: 'Ethan Schoonover',
    tags: ['light', 'classic', 'comfortable'],
    config: {
      primary: "205 69% 49%",
      secondary: "44 87% 94%",
      accent: "68 100% 30%",
      destructive: "1 71% 52%",
      background: "44 87% 98%",
      foreground: "192 81% 14%",
      muted: "44 87% 94%",
      border: "45 100% 85%",
      radius: 0.375
    },
    websiteUrl: 'https://ethanschoonover.com/solarized/'
  },
  {
    id: 'catppuccin-mocha',
    name: 'Catppuccin Mocha',
    description: '温暖的咖啡色调暗色主题，现代时尚',
    author: 'Catppuccin',
    tags: ['dark', 'warm', 'modern'],
    config: {
      primary: "267 84% 81%",
      secondary: "240 21% 15%",
      accent: "189 71% 73%",
      destructive: "343 81% 75%",
      background: "240 21% 9%",
      foreground: "226 64% 88%",
      muted: "240 21% 15%",
      border: "240 21% 21%",
      radius: 0.75
    },
    githubUrl: 'https://github.com/catppuccin/catppuccin'
  },
  {
    id: 'tokyo-night',
    name: 'Tokyo Night',
    description: '东京夜景风格，深蓝紫色调',
    author: 'Tokyo Night',
    tags: ['dark', 'blue', 'night'],
    config: {
      primary: "217 92% 76%",
      secondary: "222 16% 18%",
      accent: "310 43% 84%",
      destructive: "0 73% 77%",
      background: "222 16% 12%",
      foreground: "218 27% 92%",
      muted: "222 16% 18%",
      border: "223 16% 24%",
      radius: 0.5
    },
    githubUrl: 'https://github.com/tokyo-night/tokyo-night-vscode-theme'
  },
  {
    id: 'gruvbox-light',
    name: 'Gruvbox Light',
    description: '复古温暖的亮色主题，怀旧风格',
    author: 'Pavel Pertsev',
    tags: ['light', 'warm', 'retro'],
    config: {
      primary: "24 56% 50%",
      secondary: "36 54% 92%",
      accent: "142 34% 49%",
      destructive: "4 68% 56%",
      background: "36 54% 97%",
      foreground: "25 18% 25%",
      muted: "36 54% 92%",
      border: "35 30% 82%",
      radius: 0.25
    },
    githubUrl: 'https://github.com/morhetz/gruvbox'
  },
  {
    id: 'one-dark',
    name: 'One Dark',
    description: 'Atom 编辑器的经典暗色主题',
    author: 'Atom',
    tags: ['dark', 'editor', 'classic'],
    config: {
      primary: "220 100% 66%",
      secondary: "220 13% 18%",
      accent: "187 47% 55%",
      destructive: "355 65% 65%",
      background: "220 13% 15%",
      foreground: "220 14% 71%",
      muted: "220 13% 18%",
      border: "220 13% 24%",
      radius: 0.375
    },
    githubUrl: 'https://github.com/atom/atom/tree/master/packages/one-dark-ui'
  }
]

// 从URL获取主题配置
export async function fetchThemeFromUrl(url: string): Promise<ThemeConfig> {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    
    // 验证主题配置格式
    if (!isValidThemeConfig(data)) {
      throw new Error('Invalid theme configuration format')
    }
    
    return data
  } catch (error) {
    console.error('Failed to fetch theme from URL:', error)
    throw new Error('无法从提供的URL获取主题配置')
  }
}

// 验证主题配置是否有效
function isValidThemeConfig(config: any): config is ThemeConfig {
  return (
    config &&
    typeof config === 'object' &&
    typeof config.primary === 'string' &&
    typeof config.secondary === 'string' &&
    typeof config.accent === 'string' &&
    typeof config.destructive === 'string' &&
    typeof config.background === 'string' &&
    typeof config.foreground === 'string' &&
    typeof config.muted === 'string' &&
    typeof config.border === 'string' &&
    typeof config.radius === 'number'
  )
}

// 生成主题分享URL
export function generateShareableUrl(theme: ThemeConfig, name: string = '自定义主题'): string {
  const themeData = {
    name,
    config: theme,
    timestamp: new Date().toISOString()
  }
  
  const encodedData = btoa(JSON.stringify(themeData))
  return `${window.location.origin}${window.location.pathname}?theme=${encodedData}`
}

// 从分享URL解析主题
export function parseSharedTheme(url: string): { name: string; config: ThemeConfig } | null {
  try {
    const urlObj = new URL(url)
    const themeParam = urlObj.searchParams.get('theme')
    
    if (!themeParam) return null
    
    const decodedData = JSON.parse(atob(themeParam))
    
    if (!isValidThemeConfig(decodedData.config)) {
      throw new Error('Invalid theme configuration')
    }
    
    return {
      name: decodedData.name || '导入的主题',
      config: decodedData.config
    }
  } catch (error) {
    console.error('Failed to parse shared theme:', error)
    return null
  }
}

// 常用的主题分享平台
export const sharePlatforms = [
  {
    name: 'GitHub Gist',
    icon: '🐙',
    createUrl: (theme: ThemeConfig, name: string) => {
      const content = JSON.stringify({ name, config: theme }, null, 2)
      return `https://gist.github.com/?filename=${encodeURIComponent(name + '.json')}&content=${encodeURIComponent(content)}`
    }
  },
  {
    name: 'CodePen',
    icon: '📝',
    createUrl: (theme: ThemeConfig, name: string) => {
      const css = generateThemeCSS(theme)
      return `https://codepen.io/pen/?css=${encodeURIComponent(css)}`
    }
  },
  {
    name: '复制链接',
    icon: '🔗',
    createUrl: (theme: ThemeConfig, name: string) => {
      return generateShareableUrl(theme, name)
    }
  }
]

// 生成主题的CSS代码
export function generateThemeCSS(theme: ThemeConfig): string {
  return `:root {
  --primary: ${theme.primary};
  --secondary: ${theme.secondary};
  --accent: ${theme.accent};
  --destructive: ${theme.destructive};
  --background: ${theme.background};
  --foreground: ${theme.foreground};
  --muted: ${theme.muted};
  --border: ${theme.border};
  --radius: ${theme.radius}rem;
  
  /* Derived colors */
  --primary-foreground: 210 40% 98%;
  --secondary-foreground: var(--foreground);
  --accent-foreground: var(--foreground);
  --destructive-foreground: 210 40% 98%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --card: var(--background);
  --card-foreground: var(--foreground);
  --popover: var(--background);
  --popover-foreground: var(--foreground);
  --input: var(--border);
  --ring: var(--primary);
}`
}
