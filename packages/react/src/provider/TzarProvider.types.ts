import type { Dispatch, ReactNode } from 'react'
import type { ThemeColorMode } from '@tzardom-ui/types'

export enum ThemeActionsType {
  THEME_COLOR_MODE = 'THEME_COLOR_MODE',
  RESET_THEME = 'RESET_THEME',
}

export interface ThemeData {
  theme: ThemeColorMode
}

export type ThemeAction =
  | { type: ThemeActionsType.THEME_COLOR_MODE; theme: ThemeColorMode }
  | { type: ThemeActionsType.RESET_THEME }

export interface TypeContext {
  theme: ThemeColorMode
  setTheme: Dispatch<ThemeAction>
}

export interface ITzarProviderProps {
  children: ReactNode
  storageKey?: string
}
