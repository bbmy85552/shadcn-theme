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

export const presetThemes = {
  default: defaultTheme,
  blue: {
    primary: "221.2 83.2% 53.3%",
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
    primary: "142.1 76.2% 36.3%",
    secondary: "210 40% 96%",
    accent: "210 40% 96%",
    destructive: "0 84.2% 60.2%",
    background: "0 0% 100%",
    foreground: "222.2 84% 4.9%",
    muted: "210 40% 96%",
    border: "214.3 31.8% 91.4%",
    radius: 0.5
  },
  purple: {
    primary: "262.1 83.3% 57.8%",
    secondary: "210 40% 96%",
    accent: "210 40% 96%",
    destructive: "0 84.2% 60.2%",
    background: "0 0% 100%",
    foreground: "222.2 84% 4.9%",
    muted: "210 40% 96%",
    border: "214.3 31.8% 91.4%",
    radius: 0.5
  },
  orange: {
    primary: "24.6 95% 53.1%",
    secondary: "210 40% 96%",
    accent: "210 40% 96%",
    destructive: "0 84.2% 60.2%",
    background: "0 0% 100%",
    foreground: "222.2 84% 4.9%",
    muted: "210 40% 96%",
    border: "214.3 31.8% 91.4%",
    radius: 0.5
  }
}

export function applyTheme(theme: ThemeConfig) {
  const root = document.documentElement
  
  root.style.setProperty('--primary', theme.primary)
  root.style.setProperty('--secondary', theme.secondary)
  root.style.setProperty('--accent', theme.accent)
  root.style.setProperty('--destructive', theme.destructive)
  root.style.setProperty('--background', theme.background)
  root.style.setProperty('--foreground', theme.foreground)
  root.style.setProperty('--muted', theme.muted)
  root.style.setProperty('--border', theme.border)
  root.style.setProperty('--radius', `${theme.radius}rem`)
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
