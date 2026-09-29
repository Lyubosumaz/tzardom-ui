import { createContext, useReducer } from 'react'
import { ThemeColorMode } from '@tzardom-ui/types'
import type {
  ThemeData,
  ThemeAction,
  TypeContext,
  ITzarProviderProps,
} from './TzarProvider.types'
import { ThemeActionsType } from './TzarProvider.types'

const themeReducer = (state: ThemeData, action: ThemeAction): ThemeData => {
  // `action.type` can only be THEME_COLOR_MODE per the types, but the default
  // branch still guards against unknown actions at runtime (see the tests).
  switch (action.type) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
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
  setTheme: () => undefined,
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
