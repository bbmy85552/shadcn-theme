"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { communityThemes, CommunityTheme, fetchThemeFromUrl, parseSharedTheme, generateShareableUrl, sharePlatforms } from '@/lib/community-themes'
import { ThemeConfig, hslToHex } from '@/lib/theme'
import { Globe, Download, ExternalLink, Share2, Link, Copy, Check, Github, Star } from 'lucide-react'

interface CommunityThemeBrowserProps {
  onThemeSelect: (theme: ThemeConfig, name: string) => void
  currentTheme: ThemeConfig
}

export const CommunityThemeBrowser: React.FC<CommunityThemeBrowserProps> = ({
  onThemeSelect,
  currentTheme
}) => {
  const [selectedTag, setSelectedTag] = useState<string>('all')
  const [importUrl, setImportUrl] = useState('')
  const [isImporting, setIsImporting] = useState(false)
  const [shareUrl, setShareUrl] = useState('')
  const [copied, setCopied] = useState(false)

  // 获取所有标签
  const allTags = ['all', ...Array.from(new Set(communityThemes.flatMap(theme => theme.tags)))]
  
  // 过滤主题
  const filteredThemes = selectedTag === 'all' 
    ? communityThemes 
    : communityThemes.filter(theme => theme.tags.includes(selectedTag))

  // 从URL导入主题
  const handleImportFromUrl = async () => {
    if (!importUrl.trim()) return

    setIsImporting(true)
    try {
      // 尝试解析分享链接
      const sharedTheme = parseSharedTheme(importUrl)
      if (sharedTheme) {
        onThemeSelect(sharedTheme.config, sharedTheme.name)
        setImportUrl('')
        return
      }

      // 尝试从URL获取主题配置
      const themeConfig = await fetchThemeFromUrl(importUrl)
      onThemeSelect(themeConfig, '导入的主题')
      setImportUrl('')
    } catch (error) {
      alert('导入失败：' + (error as Error).message)
    } finally {
      setIsImporting(false)
    }
  }

  // 生成分享链接
  const handleGenerateShareUrl = () => {
    const url = generateShareableUrl(currentTheme, '我的自定义主题')
    setShareUrl(url)
  }

  // 复制到剪贴板
  const handleCopyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      // 降级方案
      const textarea = document.createElement('textarea')
      textarea.value = text
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="space-y-6">
      {/* 标签筛选 */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">主题分类</Label>
        <div className="flex flex-wrap gap-2">
          {allTags.map(tag => (
            <Button
              key={tag}
              variant={selectedTag === tag ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTag(tag)}
              className="text-xs"
            >
              {tag === 'all' ? '全部' : tag}
            </Button>
          ))}
        </div>
      </div>

      {/* 社区主题列表 */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredThemes.map(theme => (
          <CommunityThemeCard
            key={theme.id}
            theme={theme}
            onSelect={() => onThemeSelect(theme.config, theme.name)}
          />
        ))}
      </div>

      {/* 从URL导入 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Globe className="w-4 h-4" />
            从网络导入
          </CardTitle>
          <CardDescription className="text-sm">
            从GitHub、Gist或分享链接导入主题配置
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <input
              type="url"
              value={importUrl}
              onChange={(e) => setImportUrl(e.target.value)}
              placeholder="粘贴主题配置URL或分享链接..."
              className="flex-1 h-9 px-3 py-1 text-sm border border-input rounded-md bg-background"
            />
            <Button
              onClick={handleImportFromUrl}
              disabled={!importUrl.trim() || isImporting}
              size="sm"
            >
              {isImporting ? '导入中...' : '导入'}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            支持：GitHub raw文件、Gist链接、主题分享链接等
          </p>
        </CardContent>
      </Card>

      {/* 分享当前主题 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            分享当前主题
          </CardTitle>
          <CardDescription className="text-sm">
            生成分享链接或导出到各种平台
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            onClick={handleGenerateShareUrl}
            variant="outline"
            size="sm"
            className="w-full justify-start"
          >
            <Link className="w-4 h-4 mr-2" />
            生成分享链接
          </Button>
          
          {shareUrl && (
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1 h-9 px-3 py-1 text-sm border border-input rounded-md bg-muted"
                />
                <Button
                  onClick={() => handleCopyToClipboard(shareUrl)}
                  size="sm"
                  variant="outline"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label className="text-xs">快速分享到：</Label>
            <div className="grid grid-cols-1 gap-2">
              {sharePlatforms.map(platform => (
                <Button
                  key={platform.name}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (platform.name === '复制链接') {
                      const url = platform.createUrl(currentTheme, '我的自定义主题')
                      handleCopyToClipboard(url)
                    } else {
                      const url = platform.createUrl(currentTheme, '我的自定义主题')
                      window.open(url, '_blank')
                    }
                  }}
                  className="justify-start text-xs"
                >
                  <span className="mr-2">{platform.icon}</span>
                  {platform.name}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// 社区主题卡片组件
const CommunityThemeCard: React.FC<{
  theme: CommunityTheme
  onSelect: () => void
}> = ({ theme, onSelect }) => {
  return (
    <div className="p-3 border rounded-lg hover:bg-accent/20 transition-colors">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium text-sm">{theme.name}</h4>
            {theme.githubUrl && (
              <a
                href={theme.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <Github className="w-3 h-3" />
              </a>
            )}
            {theme.websiteUrl && (
              <a
                href={theme.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
          <p className="text-xs text-muted-foreground mb-2">{theme.description}</p>
          <p className="text-xs text-muted-foreground">by {theme.author}</p>
        </div>
        <Button onClick={onSelect} size="sm" variant="outline">
          <Download className="w-3 h-3 mr-1" />
          应用
        </Button>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          {[theme.config.primary, theme.config.secondary, theme.config.accent, theme.config.destructive].map((color, index) => (
            <div
              key={index}
              className="w-4 h-4 rounded-sm border border-border/50"
              style={{ backgroundColor: hslToHex(color) }}
              title={color}
            />
          ))}
        </div>
        
        <div className="flex gap-1">
          {theme.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
