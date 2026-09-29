import { Dispatch, ReactNode } from 'react'
import type { ThemeColorMode } from '@tzardom-ui/types'

export enum ThemeActionsType {
  THEME_COLOR_MODE = 'THEME_COLOR_MODE',
}

export type ThemeData = {
  theme: ThemeColorMode
}

export type ThemeAction = {
  type: ThemeActionsType
  theme: ThemeColorMode
}

export type TypeContext = {
  theme: ThemeColorMode
  setTheme: Dispatch<ThemeAction>
}

export interface ITzarProviderProps {
  children: ReactNode
}
