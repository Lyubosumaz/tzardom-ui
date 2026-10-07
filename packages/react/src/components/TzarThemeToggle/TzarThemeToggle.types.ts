import type { ComponentPropsWithoutRef } from 'react'
import type { ThemeColorMode } from '@/provider/TzarProvider.types'

export type TzarThemeToggleProps = Omit<
  ComponentPropsWithoutRef<'button'>,
  'children' | 'onClick' | 'type'
> & {
  theme?: ThemeColorMode
  defaultTheme?: ThemeColorMode
  onThemeChange?: (theme: ThemeColorMode) => void
  label?: string
}
