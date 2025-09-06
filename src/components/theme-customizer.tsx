"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Slider } from './ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { ThemeConfig, defaultTheme, presetThemes, themeMetadata, applyTheme, saveTheme, loadTheme, hslToHex, hexToHsl } from '@/lib/theme'
import { ThemePreviewCard } from './theme-preview-card'
import { CommunityThemeBrowser } from './community-theme-browser'
import { Palette, Download, Upload, RotateCcw, Sparkles, Check, Users } from 'lucide-react'

interface ColorInputProps {
  label: string
  value: string
  onChange: (value: string) => void
}

const ColorInput: React.FC<ColorInputProps> = ({ label, value, onChange }) => {
  const [hexValue, setHexValue] = useState(hslToHex(value))

  useEffect(() => {
    setHexValue(hslToHex(value))
  }, [value])

  const handleHexChange = (hex: string) => {
    setHexValue(hex)
    if (hex.match(/^#[0-9A-Fa-f]{6}$/)) {
      onChange(hexToHsl(hex))
    }
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={label}>{label}</Label>
      <div className="flex items-center space-x-2">
        <input
          type="color"
          value={hexValue}
          onChange={(e) => handleHexChange(e.target.value)}
          className="w-12 h-10 rounded border border-input cursor-pointer"
        />
        <input
          type="text"
          value={hexValue}
          onChange={(e) => handleHexChange(e.target.value)}
          className="flex-1 h-10 px-3 py-2 text-sm border border-input rounded-md bg-background"
          placeholder="#000000"
        />
      </div>
      <div className="text-xs text-muted-foreground">HSL: {value}</div>
    </div>
  )
}

export const ThemeCustomizer: React.FC = () => {
  const [theme, setTheme] = useState<ThemeConfig>(defaultTheme)
  const [selectedPreset, setSelectedPreset] = useState<string>('slate')
  const [activeTab, setActiveTab] = useState<'presets' | 'community'>('presets')

  useEffect(() => {
    const savedTheme = loadTheme()
    setTheme(savedTheme)
    applyTheme(savedTheme, false) // 初始加载不使用动画
  }, [])

  useEffect(() => {
    applyTheme(theme)
    saveTheme(theme)
  }, [theme])

  const handlePresetChange = (presetName: string) => {
    setSelectedPreset(presetName)
    const newTheme = presetThemes[presetName as keyof typeof presetThemes]
    setTheme(newTheme)
  }

  const handleCommunityThemeSelect = (themeConfig: ThemeConfig, themeName: string) => {
    setTheme(themeConfig)
    setSelectedPreset('custom')
    // 可以在这里添加通知用户主题已应用的逻辑
  }

  const handleColorChange = (colorKey: keyof ThemeConfig, value: string | number) => {
    setTheme(prev => ({
      ...prev,
      [colorKey]: value
    }))
    setSelectedPreset('custom')
  }

  const exportTheme = () => {
    const dataStr = JSON.stringify(theme, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'theme-config.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  const importTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const importedTheme = JSON.parse(e.target?.result as string)
          setTheme(importedTheme)
          setSelectedPreset('custom')
        } catch (error) {
          console.error('Failed to import theme:', error)
          alert('导入主题失败，请检查文件格式')
        }
      }
      reader.readAsText(file)
    }
  }

  const resetTheme = () => {
    setTheme(defaultTheme)
    setSelectedPreset('slate')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* 顶部标题栏 */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Palette className="w-6 h-6" />
            主题自定义器
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            自定义你的应用主题颜色和样式，所有更改将自动保存到Cookie中
          </p>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-140px)]">
          
          {/* 左侧：主题选择和自定义区域 (1/3) */}
          <div className="lg:col-span-1 space-y-6 overflow-y-auto">
            
            {/* 主题选择区域 */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">主题库</CardTitle>
                <CardDescription>选择预设主题或浏览社区主题</CardDescription>
                
                {/* 标签页切换 */}
                <div className="flex border-b mt-4">
                  <button
                    onClick={() => setActiveTab('presets')}
                    className={`flex-1 pb-2 text-sm font-medium transition-colors ${
                      activeTab === 'presets'
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      官方主题
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab('community')}
                    className={`flex-1 pb-2 text-sm font-medium transition-colors ${
                      activeTab === 'community'
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Users className="w-4 h-4" />
                      社区主题
                    </div>
                  </button>
                </div>
              </CardHeader>
              
              <CardContent className="pt-4">
                {activeTab === 'presets' ? (
                  <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto">
                    {Object.entries(presetThemes).map(([key, themeConfig]) => (
                      <div
                        key={key}
                        className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-sm ${
                          selectedPreset === key ? 'ring-2 ring-primary ring-offset-2 bg-accent/50' : 'hover:bg-accent/20'
                        }`}
                        onClick={() => handlePresetChange(key)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-sm">
                            {themeMetadata[key as keyof typeof themeMetadata].name}
                          </h4>
                          {selectedPreset === key && (
                            <Check className="w-4 h-4 text-primary" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mb-3">
                          {themeMetadata[key as keyof typeof themeMetadata].description}
                        </p>
                        <div className="flex gap-1">
                          {[themeConfig.primary, themeConfig.secondary, themeConfig.accent, themeConfig.destructive].map((color, index) => (
                            <div
                              key={index}
                              className="w-4 h-4 rounded-sm border border-border/50"
                              style={{ backgroundColor: hslToHex(color) }}
                              title={color}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <CommunityThemeBrowser
                    onThemeSelect={handleCommunityThemeSelect}
                    currentTheme={theme}
                  />
                )}
              </CardContent>
            </Card>

            {/* 颜色自定义 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">颜色配置</CardTitle>
                <CardDescription>精细调整各种UI元素的颜色</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ColorInput
                  label="主色调 (Primary)"
                  value={theme.primary}
                  onChange={(value) => handleColorChange('primary', value)}
                />
                <ColorInput
                  label="次要色 (Secondary)"
                  value={theme.secondary}
                  onChange={(value) => handleColorChange('secondary', value)}
                />
                <ColorInput
                  label="强调色 (Accent)"
                  value={theme.accent}
                  onChange={(value) => handleColorChange('accent', value)}
                />
                <ColorInput
                  label="背景色 (Background)"
                  value={theme.background}
                  onChange={(value) => handleColorChange('background', value)}
                />
                <ColorInput
                  label="边框色 (Border)"
                  value={theme.border}
                  onChange={(value) => handleColorChange('border', value)}
                />
              </CardContent>
            </Card>

            {/* 圆角设置 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">圆角设置</CardTitle>
                <CardDescription>调整组件的圆角大小</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-sm">圆角大小</Label>
                    <span className="text-sm text-muted-foreground">{theme.radius}rem</span>
                  </div>
                  <Slider
                    value={[theme.radius]}
                    onValueChange={([value]) => handleColorChange('radius', value)}
                    max={1}
                    min={0}
                    step={0.1}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>

            {/* 操作按钮 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">主题管理</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-2">
                  <Button onClick={exportTheme} variant="outline" size="sm" className="justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    导出主题配置
                  </Button>
                  <label className="cursor-pointer">
                    <Button variant="outline" size="sm" asChild className="w-full justify-start">
                      <span>
                        <Upload className="w-4 h-4 mr-2" />
                        导入主题配置
                      </span>
                    </Button>
                    <input
                      type="file"
                      accept=".json"
                      onChange={importTheme}
                      className="hidden"
                    />
                  </label>
                  <Button onClick={resetTheme} variant="outline" size="sm" className="justify-start">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    重置为 Slate 主题
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 右侧：预览区域 (2/3) */}
          <div className="lg:col-span-2 overflow-y-auto">
            <Card className="h-full">
              <CardHeader className="sticky top-0 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 z-30 border-b">
                <CardTitle className="text-lg">实时预览</CardTitle>
                <CardDescription>查看主题在各种组件中的应用效果</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8 p-6">
                {/* 按钮组 */}
                <div className="space-y-4">
                  <h4 className="text-base font-semibold">按钮组件</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <Button>主要按钮</Button>
                    <Button variant="secondary">次要按钮</Button>
                    <Button variant="outline">边框按钮</Button>
                    <Button variant="ghost">幽灵按钮</Button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <Button size="sm">小按钮</Button>
                    <Button size="lg">大按钮</Button>
                    <Button variant="destructive">危险按钮</Button>
                  </div>
                </div>

                {/* 表单元素 */}
                <div className="space-y-4">
                  <h4 className="text-base font-semibold">表单元素</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="demo-input">输入框</Label>
                        <input
                          id="demo-input"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="请输入内容..."
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>滑块控件</Label>
                        <Slider
                          value={[theme.radius * 10]}
                          max={10}
                          min={0}
                          step={1}
                          className="w-full"
                          disabled
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>选择框</Label>
                        <Select disabled defaultValue="option1">
                          <SelectTrigger>
                            <SelectValue placeholder="选择一个选项" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="option1">选项 1</SelectItem>
                            <SelectItem value="option2">选项 2</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 卡片展示 */}
                <div className="space-y-4">
                  <h4 className="text-base font-semibold">卡片组件</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">示例卡片</CardTitle>
                        <CardDescription>
                          这是一个示例卡片，展示当前主题的效果
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">
                          卡片内容区域，可以包含各种元素和信息。
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">统计卡片</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="text-2xl font-bold">1,234</div>
                        <p className="text-sm text-muted-foreground">
                          总用户数 +20.1% 相比上月
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* 不同背景区域 */}
                <div className="space-y-4">
                  <h4 className="text-base font-semibold">背景区域</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg bg-muted/50">
                      <h5 className="font-medium mb-2">静音区域</h5>
                      <p className="text-sm text-muted-foreground">
                        这是一个使用静音色彩的区域，通常用于不太重要的内容。
                      </p>
                    </div>

                    <div className="p-4 border rounded-lg bg-accent/50">
                      <h5 className="font-medium mb-2">强调区域</h5>
                      <p className="text-sm">
                        这是一个使用强调色的区域，用于突出显示重要信息。
                      </p>
                    </div>
                  </div>
                </div>

                {/* 颜色调色板 */}
                <div className="space-y-4">
                  <h4 className="text-base font-semibold">当前主题色板</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { name: 'Primary', value: theme.primary, bg: 'bg-primary', text: 'text-primary-foreground' },
                      { name: 'Secondary', value: theme.secondary, bg: 'bg-secondary', text: 'text-secondary-foreground' },
                      { name: 'Accent', value: theme.accent, bg: 'bg-accent', text: 'text-accent-foreground' },
                      { name: 'Muted', value: theme.muted, bg: 'bg-muted', text: 'text-muted-foreground' },
                      { name: 'Background', value: theme.background, bg: 'bg-background border-2', text: 'text-foreground' },
                      { name: 'Foreground', value: theme.foreground, bg: 'bg-foreground', text: 'text-background' },
                      { name: 'Border', value: theme.border, bg: 'bg-border', text: 'text-foreground' },
                      { name: 'Destructive', value: theme.destructive, bg: 'bg-destructive', text: 'text-destructive-foreground' }
                    ].map((color) => (
                      <div key={color.name} className="text-center">
                        <div 
                          className={`w-full h-16 rounded-lg ${color.bg} ${color.text} flex flex-col items-center justify-center text-xs font-medium mb-2 shadow-sm`}
                          title={color.value}
                        >
                          <div className="font-semibold">{color.name}</div>
                          <div className="text-xs opacity-75">{hslToHex(color.value)}</div>
                        </div>
                        <div className="text-xs text-muted-foreground font-mono">
                          {color.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
