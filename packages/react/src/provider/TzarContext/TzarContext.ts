import { createContext } from 'react'
import type { Dispatch } from 'react'
import type {
  ThemeActionsType,
  ThemeColorMode,
} from '../TzarProvider/TzarProvider.types'

export type ThemeData = {
  theme: ThemeColorMode
}

export type ThemeAction =
  | { type: ThemeActionsType.THEME_COLOR_MODE; theme: ThemeColorMode }
  | { type: ThemeActionsType.RESET_THEME }

export type TypeContext = {
  theme: ThemeColorMode
  setTheme: Dispatch<ThemeAction>
}

export const TzarContext = createContext<TypeContext | null>(null)
