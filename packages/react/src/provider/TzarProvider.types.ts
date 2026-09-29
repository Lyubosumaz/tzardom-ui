import type { Dispatch, ReactNode } from 'react'
import type { ThemeColorMode } from '@tzardom-ui/types'

export enum ThemeActionsType {
  THEME_COLOR_MODE = 'THEME_COLOR_MODE',
}

export interface ThemeData {
  theme: ThemeColorMode
}

export interface ThemeAction {
  type: ThemeActionsType
  theme: ThemeColorMode
}

export interface TypeContext {
  theme: ThemeColorMode
  setTheme: Dispatch<ThemeAction>
}

export interface ITzarProviderProps {
  children: ReactNode
}
