import { use, useMemo } from 'react'
import { TzarContext } from './TzarProvider'
import { ThemeActionsType } from './TzarProvider.types'
import type { ThemeColorMode } from './TzarProvider.types'

export const useTzarTheme = () => {
  const context = use(TzarContext)
  if (!context) {
    throw new Error('useTzarTheme must be used inside a <TzarProvider>')
  }
  const { theme, setTheme } = context

  return useMemo(
    () => ({
      theme,
      setTheme: (nextTheme: ThemeColorMode) => {
        setTheme({ type: ThemeActionsType.THEME_COLOR_MODE, theme: nextTheme })
      },
      resetTheme: () => {
        setTheme({ type: ThemeActionsType.RESET_THEME })
      },
    }),
    [theme, setTheme],
  )
}
