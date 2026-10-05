import type { ComponentProps } from 'react'
import type { TzarIconButton } from '@/generated/components'
import type { ThemeColorMode } from '@tzardom-ui/types'

export type TzarThemeToggleProps = Omit<
  ComponentProps<typeof TzarIconButton>,
  'label' | 'children' | 'onClick'
> & {
  theme?: ThemeColorMode
  defaultTheme?: ThemeColorMode
  onThemeChange?: (theme: ThemeColorMode) => void
  label?: string
}
