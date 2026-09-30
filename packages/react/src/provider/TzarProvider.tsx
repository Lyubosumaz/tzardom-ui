import { createContext, useMemo, useReducer } from 'react'
import { ThemeColorMode } from '@tzardom-ui/types'
import type {
  ThemeData,
  ThemeAction,
  TypeContext,
  ITzarProviderProps,
} from './TzarProvider.types'
import { ThemeActionsType } from './TzarProvider.types'

const DEFAULT_THEME: ThemeData = { theme: ThemeColorMode.LIGHT }

const themeReducer = (state: ThemeData, action: ThemeAction): ThemeData => {
  switch (action.type) {
    case ThemeActionsType.THEME_COLOR_MODE:
      return { ...state, theme: action.theme }
    case ThemeActionsType.RESET_THEME:
      return DEFAULT_THEME
    default:
      // Unreachable in typed code, but guards against invalid actions at runtime
      // (e.g. from plain JavaScript callers).
      console.warn(
        'TzarProvider: unknown theme action, resetting theme',
        action,
      )
      return DEFAULT_THEME
  }
}

const defaultContext: TypeContext = {
  ...DEFAULT_THEME,
  setTheme: () => undefined,
}

export const TzarContext = createContext<TypeContext>(defaultContext)

export const TzarProvider = ({ children }: ITzarProviderProps) => {
  const [tzarThemeMode, setTzarThemeMode] = useReducer(
    themeReducer,
    DEFAULT_THEME,
  )

  const value = useMemo(
    () => ({ ...tzarThemeMode, setTheme: setTzarThemeMode }),
    [tzarThemeMode],
  )

  return <TzarContext value={value}>{children}</TzarContext>
}
