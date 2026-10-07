'use client'

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react'
import type {
  ThemeData,
  ThemeAction,
  TypeContext,
  ITzarProviderProps,
} from './TzarProvider.types'
import { ThemeActionsType, ThemeColorMode } from './TzarProvider.types'

const DEFAULT_THEME: ThemeData = { theme: ThemeColorMode.LIGHT }

// The theme lives on <html data-theme="…">, where app CSS can key off it.
const THEME_ATTRIBUTE = 'data-theme'

const themeReducer = (state: ThemeData, action: ThemeAction): ThemeData => {
  switch (action.type) {
    case ThemeActionsType.THEME_COLOR_MODE:
      return state.theme === action.theme
        ? state
        : { ...state, theme: action.theme }
    case ThemeActionsType.RESET_THEME:
      return DEFAULT_THEME
    default:
      console.warn(
        'TzarProvider: unknown theme action, resetting theme',
        action,
      )
      return DEFAULT_THEME
  }
}

const isThemeColorMode = (value: unknown): value is ThemeColorMode =>
  value === ThemeColorMode.LIGHT || value === ThemeColorMode.DARK

const readStoredTheme = (key: string): ThemeColorMode | null => {
  try {
    const stored = window.localStorage.getItem(key)
    return isThemeColorMode(stored) ? stored : null
  } catch {
    return null
  }
}

const storeTheme = (key: string, theme: ThemeColorMode) => {
  try {
    window.localStorage.setItem(key, theme)
  } catch {
    console.warn('TzarProvider: failed to save the theme to localStorage')
  }
}

const defaultContext: TypeContext = {
  ...DEFAULT_THEME,
  setTheme: () => undefined,
}

export const TzarContext = createContext<TypeContext>(defaultContext)

export const isDefaultTzarContext = (context: TypeContext) =>
  context === defaultContext

export const TzarProvider = ({ children, storageKey }: ITzarProviderProps) => {
  const [tzarThemeMode, dispatch] = useReducer(themeReducer, DEFAULT_THEME)

  const setTheme = useCallback(
    (action: ThemeAction) => {
      dispatch(action)
      if (storageKey) {
        storeTheme(
          storageKey,
          action.type === ThemeActionsType.THEME_COLOR_MODE
            ? action.theme
            : DEFAULT_THEME.theme,
        )
      }
    },
    [storageKey],
  )

  useEffect(() => {
    const stored = storageKey ? readStoredTheme(storageKey) : null
    if (stored) {
      dispatch({ type: ThemeActionsType.THEME_COLOR_MODE, theme: stored })
    }
  }, [storageKey])

  const appliedTheme = useRef(tzarThemeMode.theme)

  useEffect(() => {
    appliedTheme.current = tzarThemeMode.theme
    document.documentElement.setAttribute(THEME_ATTRIBUTE, tzarThemeMode.theme)
  }, [tzarThemeMode.theme])

  useEffect(() => {
    const root = document.documentElement
    const observer = new MutationObserver(() => {
      const value = root.getAttribute(THEME_ATTRIBUTE)
      if (isThemeColorMode(value) && value !== appliedTheme.current) {
        dispatch({ type: ThemeActionsType.THEME_COLOR_MODE, theme: value })
      }
    })
    observer.observe(root, {
      attributes: true,
      attributeFilter: [THEME_ATTRIBUTE],
    })
    return () => {
      observer.disconnect()
    }
  }, [])

  const value = useMemo(
    () => ({ ...tzarThemeMode, setTheme }),
    [tzarThemeMode, setTheme],
  )

  return <TzarContext value={value}>{children}</TzarContext>
}
