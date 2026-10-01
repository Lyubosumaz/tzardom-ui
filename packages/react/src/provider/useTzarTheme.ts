import { use, useMemo } from 'react'
import type { ThemeColorMode } from '@tzardom-ui/types'
import { TzarContext } from './TzarProvider'
import { ThemeActionsType } from './TzarProvider.types'

export const useTzarTheme = () => {
  const { theme, setTheme } = use(TzarContext)

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
