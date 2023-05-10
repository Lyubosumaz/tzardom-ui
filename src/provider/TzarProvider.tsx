import React, { createContext, useReducer } from 'react'

export enum ColorMode {
  LIGHT = 'light',
  DARK = 'dark',
}

export enum ThemeActionsType {
  THEME_COLOR_MODE = 'THEME_COLOR_MODE',
}
export type ThemeColorMode = 'light' | 'dark'

type ThemeData = {
  theme: string
}

type ThemeAction = {
  type: ThemeActionsType
  theme: ColorMode
}

const themeReducer = (state: ThemeData, action: ThemeAction): ThemeData => {
  switch (action.type) {
    case ThemeActionsType.THEME_COLOR_MODE:
      return { ...state, theme: action.theme }
    default:
      return state
  }
}

const myTheme = {
  theme: 'dark',
  setTheme: (action: ThemeAction): void => {},
}

type TypeContext = {
  theme: string
  setTheme: React.Dispatch<ThemeAction>
}

export const TzarContext = createContext<TypeContext>(myTheme)

interface ITzarProviderProps {
  children: React.ReactNode
}

export const TzarProvider = ({ children }: ITzarProviderProps) => {
  const [tzarThemeMode, setTzarThemeMode] = useReducer(themeReducer, {
    theme: 'dark',
  })

  return (
    <TzarContext.Provider
      value={{
        ...tzarThemeMode,
        setTheme: setTzarThemeMode,
      }}
    >
      {children}
    </TzarContext.Provider>
  )
}
