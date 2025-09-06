import Cookies from 'js-cookie'

export interface ThemeConfig {
  primary: string
  secondary: string
  accent: string
  destructive: string
  background: string
  foreground: string
  muted: string
  border: string
  radius: number
}

export const defaultTheme: ThemeConfig = {
  primary: "222.2 47.4% 11.2%",
  secondary: "210 40% 96%",
  accent: "210 40% 96%",
  destructive: "0 84.2% 60.2%",
  background: "0 0% 100%",
  foreground: "222.2 84% 4.9%",
  muted: "210 40% 96%",
  border: "214.3 31.8% 91.4%",
  radius: 0.5
}

// 主题元数据，用于显示名称和描述
export const themeMetadata = {
  slate: { name: "Slate", description: "蓝灰色主题，简洁专业" },
  blue: { name: "Blue", description: "明亮蓝色，专业可信" },
  green: { name: "Green", description: "清新绿色，自然舒适" },
  violet: { name: "Violet", description: "优雅紫色，神秘高贵" },
  orange: { name: "Orange", description: "活力橙色，热情创意" },
  red: { name: "Red", description: "热情红色，充满活力" },
  rose: { name: "Rose", description: "温柔玫瑰，浪漫优雅" },
  yellow: { name: "Yellow", description: "明亮黄色，阳光乐观" },
  emerald: { name: "Emerald", description: "翡翠绿色，清新典雅" },
  indigo: { name: "Indigo", description: "深邃靛蓝，沉稳大气" },
  pink: { name: "Pink", description: "活泼粉色，青春时尚" }
}

export const presetThemes = {
  // shadcn/ui 官方默认主题 - 重新优化，增强视觉差异
  slate: {
    primary: "215.4 16.3% 46.9%", // 更明显的蓝灰色
    secondary: "210 40% 96%",
    accent: "215.3 25% 26.7%", // 深蓝灰色强调
    destructive: "0 84.2% 60.2%",
    background: "0 0% 100%",
    foreground: "222.2 84% 4.9%",
    muted: "210 40% 96%",
    border: "214.3 31.8% 91.4%",
    radius: 0.5
  },
  blue: {
    primary: "221.2 83.2% 53.3%", // 明亮的蓝色
    secondary: "210 40% 96%",
    accent: "210 40% 96%",
    destructive: "0 84.2% 60.2%",
    background: "0 0% 100%",
    foreground: "222.2 84% 4.9%",
    muted: "210 40% 96%",
    border: "214.3 31.8% 91.4%",
    radius: 0.5
  },
  green: {
    primary: "142.1 76.2% 36.3%", // 清新的绿色
    secondary: "210 40% 96%",
    accent: "142.1 76.2% 36.3%",
    destructive: "0 84.2% 60.2%",
    background: "0 0% 100%",
    foreground: "222.2 84% 4.9%",
    muted: "210 40% 96%",
    border: "214.3 31.8% 91.4%",
    radius: 0.5
  },
  violet: {
    primary: "262.1 83.3% 57.8%", // 优雅的紫色
    secondary: "210 40% 96%",
    accent: "262.1 83.3% 57.8%",
    destructive: "0 84.2% 60.2%",
    background: "0 0% 100%",
    foreground: "222.2 84% 4.9%",
    muted: "210 40% 96%",
    border: "214.3 31.8% 91.4%",
    radius: 0.5
  },
  orange: {
    primary: "24.6 95% 53.1%", // 活力橙色
    secondary: "210 40% 96%",
    accent: "24.6 95% 53.1%",
    destructive: "0 84.2% 60.2%",
    background: "0 0% 100%",
    foreground: "222.2 84% 4.9%",
    muted: "210 40% 96%",
    border: "214.3 31.8% 91.4%",
    radius: 0.5
  },
  red: {
    primary: "0 72.2% 50.6%", // 热情的红色
    secondary: "0 0% 96.1%",
    accent: "0 72.2% 50.6%",
    destructive: "0 84.2% 60.2%",
    background: "0 0% 100%",
    foreground: "0 0% 3.9%",
    muted: "0 0% 96.1%",
    border: "0 0% 89.8%",
    radius: 0.5
  },
  rose: {
    primary: "346.8 77.2% 49.8%", // 温柔的玫瑰色
    secondary: "0 0% 96.1%",
    accent: "346.8 77.2% 49.8%",
    destructive: "0 84.2% 60.2%",
    background: "0 0% 100%",
    foreground: "0 0% 3.9%",
    muted: "0 0% 96.1%",
    border: "0 0% 89.8%",
    radius: 0.75
  },
  yellow: {
    primary: "47.9 95.8% 53.1%", // 明亮的黄色
    secondary: "60 4.8% 95.9%",
    accent: "47.9 95.8% 53.1%",
    destructive: "0 84.2% 60.2%",
    background: "0 0% 100%",
    foreground: "0 0% 3.9%",
    muted: "60 4.8% 95.9%",
    border: "60 4.8% 89.8%",
    radius: 0.25
  },
  emerald: {
    primary: "160 84% 39%", // 翡翠绿
    secondary: "210 40% 96%",
    accent: "160 84% 39%",
    destructive: "0 84.2% 60.2%",
    background: "0 0% 100%",
    foreground: "222.2 84% 4.9%",
    muted: "210 40% 96%",
    border: "214.3 31.8% 91.4%",
    radius: 0.5
  },
  indigo: {
    primary: "239 84% 67%", // 靛蓝色
    secondary: "210 40% 96%",
    accent: "239 84% 67%",
    destructive: "0 84.2% 60.2%",
    background: "0 0% 100%",
    foreground: "222.2 84% 4.9%",
    muted: "210 40% 96%",
    border: "214.3 31.8% 91.4%",
    radius: 0.5
  },
  pink: {
    primary: "330 81% 60%", // 活泼的粉色
    secondary: "210 40% 96%",
    accent: "330 81% 60%",
    destructive: "0 84.2% 60.2%",
    background: "0 0% 100%",
    foreground: "222.2 84% 4.9%",
    muted: "210 40% 96%",
    border: "214.3 31.8% 91.4%",
    radius: 1.0
  }
}

export function applyTheme(theme: ThemeConfig, withAnimation = true) {
  const root = document.documentElement
  
  if (withAnimation) {
    // 添加过渡效果类
    document.body.classList.add('theme-transition')
    
    // 在动画完成后移除类
    setTimeout(() => {
      document.body.classList.remove('theme-transition')
    }, 300)
  }
  
  // 批量更新CSS变量以获得更好的性能
  requestAnimationFrame(() => {
    root.style.setProperty('--primary', theme.primary)
    root.style.setProperty('--secondary', theme.secondary)
    root.style.setProperty('--accent', theme.accent)
    root.style.setProperty('--destructive', theme.destructive)
    root.style.setProperty('--background', theme.background)
    root.style.setProperty('--foreground', theme.foreground)
    root.style.setProperty('--muted', theme.muted)
    root.style.setProperty('--border', theme.border)
    root.style.setProperty('--radius', `${theme.radius}rem`)
    
    // 更新相关的衍生颜色
    root.style.setProperty('--primary-foreground', '210 40% 98%')
    root.style.setProperty('--secondary-foreground', theme.foreground)
    root.style.setProperty('--accent-foreground', theme.foreground)
    root.style.setProperty('--destructive-foreground', '210 40% 98%')
    root.style.setProperty('--muted-foreground', '215.4 16.3% 46.9%')
    root.style.setProperty('--card', theme.background)
    root.style.setProperty('--card-foreground', theme.foreground)
    root.style.setProperty('--popover', theme.background)
    root.style.setProperty('--popover-foreground', theme.foreground)
    root.style.setProperty('--input', theme.border)
    root.style.setProperty('--ring', theme.primary)
  })
}

export function saveTheme(theme: ThemeConfig) {
  Cookies.set('theme-config', JSON.stringify(theme), { expires: 365 })
}

export function loadTheme(): ThemeConfig {
  const saved = Cookies.get('theme-config')
  if (saved) {
    try {
      return JSON.parse(saved)
    } catch (e) {
      console.error('Failed to parse saved theme:', e)
    }
  }
  return defaultTheme
}

export function hslToHex(hsl: string): string {
  const [h, s, l] = hsl.split(' ').map((v, i) => {
    if (i === 0) return parseFloat(v)
    return parseFloat(v.replace('%', ''))
  })
  
  const hDecimal = h / 360
  const sDecimal = s / 100
  const lDecimal = l / 100
  
  const c = (1 - Math.abs(2 * lDecimal - 1)) * sDecimal
  const x = c * (1 - Math.abs(((hDecimal * 6) % 2) - 1))
  const m = lDecimal - c / 2
  
  let r = 0, g = 0, b = 0
  
  if (0 <= hDecimal && hDecimal < 1/6) {
    r = c; g = x; b = 0
  } else if (1/6 <= hDecimal && hDecimal < 1/3) {
    r = x; g = c; b = 0
  } else if (1/3 <= hDecimal && hDecimal < 1/2) {
    r = 0; g = c; b = x
  } else if (1/2 <= hDecimal && hDecimal < 2/3) {
    r = 0; g = x; b = c
  } else if (2/3 <= hDecimal && hDecimal < 5/6) {
    r = x; g = 0; b = c
  } else if (5/6 <= hDecimal && hDecimal < 1) {
    r = c; g = 0; b = x
  }
  
  r = Math.round((r + m) * 255)
  g = Math.round((g + m) * 255)
  b = Math.round((b + m) * 255)
  
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

export function hexToHsl(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0, s = 0, l = (max + min) / 2
  
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
    }
    h /= 6
  }
  
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`
}
