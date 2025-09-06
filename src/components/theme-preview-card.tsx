"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { ThemeConfig, hslToHex } from '@/lib/theme'
import { Check } from 'lucide-react'

interface ThemePreviewCardProps {
  theme: ThemeConfig
  name: string
  description: string
  isSelected: boolean
  onClick: () => void
}

export const ThemePreviewCard: React.FC<ThemePreviewCardProps> = ({
  theme,
  name,
  description,
  isSelected,
  onClick
}) => {
  const primaryColor = hslToHex(theme.primary)
  const backgroundColor = hslToHex(theme.background)
  const foregroundColor = hslToHex(theme.foreground)
  const secondaryColor = hslToHex(theme.secondary)
  const mutedColor = hslToHex(theme.muted)
  const borderColor = hslToHex(theme.border)

  return (
    <Card 
      className={`relative cursor-pointer transition-all duration-200 hover:shadow-md ${
        isSelected ? 'ring-2 ring-primary ring-offset-2' : ''
      }`}
      onClick={onClick}
    >
      {isSelected && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center z-10">
          <Check className="w-4 h-4 text-primary-foreground" />
        </div>
      )}
      
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{name}</CardTitle>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {/* 颜色色板预览 */}
        <div className="grid grid-cols-6 gap-1 h-8">
          <div 
            className="rounded-sm flex-1" 
            style={{ backgroundColor: primaryColor }}
            title={`Primary: ${theme.primary}`}
          />
          <div 
            className="rounded-sm flex-1" 
            style={{ backgroundColor: secondaryColor }}
            title={`Secondary: ${theme.secondary}`}
          />
          <div 
            className="rounded-sm flex-1" 
            style={{ backgroundColor: mutedColor }}
            title={`Muted: ${theme.muted}`}
          />
          <div 
            className="rounded-sm flex-1" 
            style={{ backgroundColor: hslToHex(theme.accent) }}
            title={`Accent: ${theme.accent}`}
          />
          <div 
            className="rounded-sm flex-1" 
            style={{ backgroundColor: hslToHex(theme.destructive) }}
            title={`Destructive: ${theme.destructive}`}
          />
          <div 
            className="rounded-sm flex-1 border" 
            style={{ backgroundColor: backgroundColor, borderColor: borderColor }}
            title={`Background: ${theme.background}`}
          />
        </div>

        {/* 组件预览 */}
        <div 
          className="p-3 rounded-lg border space-y-2 transition-all duration-200"
          style={{ 
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderRadius: `${theme.radius}rem`
          }}
        >
          <div 
            className="text-xs font-medium"
            style={{ color: foregroundColor }}
          >
            组件预览
          </div>
          
          <div className="flex gap-1">
            <div
              className="px-2 py-1 text-xs rounded font-medium"
              style={{ 
                backgroundColor: primaryColor,
                color: hslToHex("210 40% 98%"),
                borderRadius: `calc(${theme.radius}rem - 2px)`
              }}
            >
              主要
            </div>
            <div
              className="px-2 py-1 text-xs rounded border"
              style={{ 
                backgroundColor: secondaryColor,
                color: foregroundColor,
                borderColor: borderColor,
                borderRadius: `calc(${theme.radius}rem - 2px)`
              }}
            >
              次要
            </div>
          </div>
          
          <div 
            className="h-1 rounded-full"
            style={{ 
              backgroundColor: mutedColor,
              borderRadius: `${theme.radius}rem`
            }}
          >
            <div 
              className="h-full w-1/3 rounded-full"
              style={{ 
                backgroundColor: primaryColor,
                borderRadius: `${theme.radius}rem`
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
