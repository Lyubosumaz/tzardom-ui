'use client'

import { Moon, Sun } from 'lucide-react'
import { use, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { isDefaultTzarContext, TzarContext } from '@/provider/TzarProvider'
import { ThemeActionsType } from '@/provider/TzarProvider.types'
import { ThemeColorMode } from '@tzardom-ui/types'
import type { TzarThemeToggleProps } from './TzarThemeToggle.types'

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
    <button
      {...rest}
      type="button"
      aria-label={label}
      onClick={handleClick}
      className={twMerge(
        'inline-flex items-center gap-1.5 rounded-full p-2 text-xs font-medium text-secondary hover:bg-main-soft hover:text-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:bg-main-soft',
        className,
      )}
    >
      <Icon className="h-4.5 w-4.5" aria-hidden="true" />
    </button>
  )
}
