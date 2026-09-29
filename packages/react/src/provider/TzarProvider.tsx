import { createContext, useReducer } from 'react'
import { ThemeColorMode } from '@tzardom-ui/types'
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

// Matches tzar-button's initial state, so both start from the same theme.
const DEFAULT_THEME: ThemeData = { theme: ThemeColorMode.LIGHT }

const defaultContext: TypeContext = {
  ...DEFAULT_THEME,
  setTheme: (action: ThemeAction): void => void action,
}

export const TzarContext = createContext<TypeContext>(defaultContext)

export const TzarProvider = ({ children }: ITzarProviderProps) => {
  const [tzarThemeMode, setTzarThemeMode] = useReducer(
    themeReducer,
    DEFAULT_THEME,
  )

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
