"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Slider } from './ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { ThemeConfig, defaultTheme, presetThemes, applyTheme, saveTheme, loadTheme, hslToHex, hexToHsl } from '@/lib/theme'
import { Palette, Download, Upload, RotateCcw } from 'lucide-react'

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
  const [selectedPreset, setSelectedPreset] = useState<string>('default')

  useEffect(() => {
    const savedTheme = loadTheme()
    setTheme(savedTheme)
    applyTheme(savedTheme)
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
    setSelectedPreset('default')
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Palette className="w-8 h-8" />
          主题自定义器
        </h1>
        <p className="text-muted-foreground">
          自定义你的应用主题颜色和样式，所有更改将自动保存到Cookie中
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 预设主题 */}
        <Card>
          <CardHeader>
            <CardTitle>预设主题</CardTitle>
            <CardDescription>选择一个预设主题作为起点</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={selectedPreset} onValueChange={handlePresetChange}>
              <SelectTrigger>
                <SelectValue placeholder="选择预设主题" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">默认</SelectItem>
                <SelectItem value="blue">蓝色</SelectItem>
                <SelectItem value="green">绿色</SelectItem>
                <SelectItem value="purple">紫色</SelectItem>
                <SelectItem value="orange">橙色</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Button onClick={exportTheme} variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                导出主题
              </Button>
              <label className="cursor-pointer">
                <Button variant="outline" size="sm" asChild>
                  <span>
                    <Upload className="w-4 h-4 mr-2" />
                    导入主题
                  </span>
                </Button>
                <input
                  type="file"
                  accept=".json"
                  onChange={importTheme}
                  className="hidden"
                />
              </label>
              <Button onClick={resetTheme} variant="outline" size="sm">
                <RotateCcw className="w-4 h-4 mr-2" />
                重置
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 颜色自定义 */}
        <Card>
          <CardHeader>
            <CardTitle>颜色配置</CardTitle>
            <CardDescription>调整各种UI元素的颜色</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
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
              label="前景色 (Foreground)"
              value={theme.foreground}
              onChange={(value) => handleColorChange('foreground', value)}
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
            <CardTitle>圆角设置</CardTitle>
            <CardDescription>调整组件的圆角大小</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Label>圆角大小: {theme.radius}rem</Label>
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

        {/* 预览区域 */}
        <Card>
          <CardHeader>
            <CardTitle>组件预览</CardTitle>
            <CardDescription>查看主题应用效果</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <Button>主要按钮</Button>
              <Button variant="secondary">次要按钮</Button>
              <Button variant="outline">边框按钮</Button>
              <Button variant="ghost">幽灵按钮</Button>
            </div>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">示例卡片</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  这是一个示例卡片，展示当前主题的效果。
                </p>
              </CardContent>
            </Card>

            <div className="p-4 border rounded-lg bg-muted">
              <p className="text-sm">这是一个静音区域的示例</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
