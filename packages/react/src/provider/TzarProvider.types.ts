import { Dispatch, ReactNode } from 'react'

export enum ThemeColorMode2 {
  LIGHT = 'light',
  DARK = 'dark',
}

export enum ThemeActionsType {
  THEME_COLOR_MODE = 'THEME_COLOR_MODE',
}

export type ThemeData = {
  theme: string
}

export type ThemeAction = {
  type: ThemeActionsType
  theme: ThemeColorMode2
}

export type TypeContext = {
  theme: string
  setTheme: Dispatch<ThemeAction>
}

export interface ITzarProviderProps {
  children: ReactNode
}
