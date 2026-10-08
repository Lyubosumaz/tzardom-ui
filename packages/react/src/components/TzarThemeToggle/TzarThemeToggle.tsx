'use client'

import { Moon, Sun } from 'lucide-react'
import { twMerge } from 'tailwind-merge'
import { TEST_ID_PREFIXES } from '@/constants/testIdPrefixes'
import { ThemeColorMode } from '@/provider/TzarProvider.types'
import { useTzarTheme } from '@/provider/useTzarTheme'
import type { TzarThemeToggleProps } from './TzarThemeToggle.types'

export const TzarThemeToggle = ({
  'data-testid': testId,
  label = 'Toggle theme',
  className,
  ...rest
}: TzarThemeToggleProps) => {
  const { theme, setTheme } = useTzarTheme()
  const rootTestId = `${TEST_ID_PREFIXES.themeToggle}-${testId}`
  const isDark = theme === ThemeColorMode.DARK
  const Icon = isDark ? Sun : Moon

  const handleClick = () => {
    setTheme(isDark ? ThemeColorMode.LIGHT : ThemeColorMode.DARK)
  }

  return (
    <button
      type="button"
      aria-label={label}
      onClick={handleClick}
      data-testid={rootTestId}
      className={twMerge(
        'inline-flex items-center gap-1.5 rounded-full p-2 text-xs font-medium text-secondary hover:bg-main-soft hover:text-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:bg-main-soft',
        className,
      )}
      {...rest}
    >
      <Icon
        className="h-4.5 w-4.5"
        aria-hidden="true"
        data-testid={`${rootTestId}-icon`}
      />
    </button>
  )
}
