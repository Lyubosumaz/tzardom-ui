import { createContext, useReducer } from 'react'
import {
  ThemeActionsType,
  ThemeData,
  ThemeAction,
  TypeContext,
  ITzarProviderProps,
} from './TzarProvider.types'

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
  setTheme: (_action: ThemeAction): void => {},
}

export const TzarContext = createContext<TypeContext>(myTheme)

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
