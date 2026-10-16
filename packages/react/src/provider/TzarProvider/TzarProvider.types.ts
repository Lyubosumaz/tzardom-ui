import type { ReactNode } from 'react'

export enum ThemeColorMode {
  LIGHT = 'light',
  DARK = 'dark',
}

export enum ThemeActionsType {
  THEME_COLOR_MODE = 'THEME_COLOR_MODE',
  RESET_THEME = 'RESET_THEME',
}

export type TzarProviderProps = {
  children: ReactNode
  storageKey?: string
}
