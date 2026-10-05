'use client'

import { Moon, Sun } from 'lucide-react'
import type { ComponentProps } from 'react'
import { use, useState } from 'react'
import { TzarIconButton } from '@/generated/components'
import { isDefaultTzarContext, TzarContext } from '@/provider/TzarProvider'
import { ThemeActionsType } from '@/provider/TzarProvider.types'
import { ThemeColorMode } from '@tzardom-ui/types'

export type TzarThemeToggleProps = Omit<
  ComponentProps<typeof TzarIconButton>,
  'label' | 'children' | 'onClick'
> & {
  theme?: ThemeColorMode
  defaultTheme?: ThemeColorMode
  onThemeChange?: (theme: ThemeColorMode) => void
  label?: string
}

export const TzarThemeToggle = ({
  theme,
  defaultTheme = ThemeColorMode.LIGHT,
  onThemeChange,
  label = 'Toggle theme',
  className,
  ...rest
}: TzarThemeToggleProps) => {
  const context = use(TzarContext)
  const hasProvider = !isDefaultTzarContext(context)
  const [ownTheme, setOwnTheme] = useState(defaultTheme)

  const currentTheme = theme ?? (hasProvider ? context.theme : ownTheme)
  const isDark = currentTheme === ThemeColorMode.DARK
  const Icon = isDark ? Sun : Moon

  const handleClick = () => {
    const nextTheme = isDark ? ThemeColorMode.LIGHT : ThemeColorMode.DARK
    if (theme === undefined) {
      if (hasProvider) {
        context.setTheme({
          type: ThemeActionsType.THEME_COLOR_MODE,
          theme: nextTheme,
        })
      } else {
        setOwnTheme(nextTheme)
      }
    }
    onThemeChange?.(nextTheme)
  }

  return (
    <TzarIconButton
      {...rest}
      className={`[&::part(button)]:border-0 [&::part(button)]:bg-transparent [&::part(button)]:inline-flex [&::part(button)]:items-center [&::part(button)]:gap-1.5 [&::part(button)]:rounded-full [&::part(button)]:p-2 [&::part(button)]:text-xs [&::part(button)]:font-medium [&::part(button)]:text-secondary [&::part(button)]:hover:bg-main-soft [&::part(button)]:hover:text-secondary [&::part(button)]:transition-colors [&::part(button)]:focus-visible:outline-none [&::part(button)]:focus-visible:ring-2 [&::part(button)]:focus-visible:ring-secondary [&::part(button)]:focus-visible:bg-main-soft ${className ?? ''}`}
      label={label}
      onClick={handleClick}
    >
      <Icon className="h-4.5 w-4.5" aria-hidden="true" />
    </TzarIconButton>
  )
}
