import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import { use } from 'react'
import { beforeEach, describe, expect, test } from 'vitest'
import {
  TzarProvider,
  TzarContext,
  ThemeActionsType,
  ThemeColorMode,
} from './index'

const ThemeConsumer = () => {
  const { theme, setTheme } = use(TzarContext)

  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button
        type="button"
        onClick={() => {
          setTheme({
            type: ThemeActionsType.THEME_COLOR_MODE,
            theme:
              theme === ThemeColorMode.DARK
                ? ThemeColorMode.LIGHT
                : ThemeColorMode.DARK,
          })
        }}
      >
        toggle
      </button>
      <button
        type="button"
        onClick={() => {
          setTheme({ type: ThemeActionsType.RESET_THEME })
        }}
      >
        reset
      </button>
    </div>
  )
}

describe('TzarProvider', () => {
  test('renders children and provides the default light theme', () => {
    render(
      <TzarProvider>
        <ThemeConsumer />
      </TzarProvider>,
    )

    expect(screen.getByTestId('theme').textContent).toBe(ThemeColorMode.LIGHT)
  })

  test('updates the theme through the reducer when setTheme is dispatched', () => {
    render(
      <TzarProvider>
        <ThemeConsumer />
      </TzarProvider>,
    )

    fireEvent.click(screen.getByText('toggle'))

    expect(screen.getByTestId('theme').textContent).toBe(ThemeColorMode.DARK)
  })

  test('RESET_THEME puts the theme back to the default', () => {
    render(
      <TzarProvider>
        <ThemeConsumer />
      </TzarProvider>,
    )

    fireEvent.click(screen.getByText('toggle'))
    expect(screen.getByTestId('theme').textContent).toBe(ThemeColorMode.DARK)

    fireEvent.click(screen.getByText('reset'))
    expect(screen.getByTestId('theme').textContent).toBe(ThemeColorMode.LIGHT)
  })

  test('default context value exposes a no-op setTheme before any provider mounts', () => {
    render(<ThemeConsumer />)

    expect(screen.getByTestId('theme').textContent).toBe(ThemeColorMode.LIGHT)
    expect(() => fireEvent.click(screen.getByText('toggle'))).not.toThrow()
    expect(screen.getByTestId('theme').textContent).toBe(ThemeColorMode.LIGHT)
  })

  describe('page theme and storage', () => {
    const STORAGE_KEY = 'test-theme'
    const htmlTheme = () => document.documentElement.getAttribute('data-theme')

    beforeEach(() => {
      window.localStorage.clear()
      document.documentElement.removeAttribute('data-theme')
    })

    test('applies the theme as data-theme on <html>', () => {
      render(
        <TzarProvider>
          <ThemeConsumer />
        </TzarProvider>,
      )
      expect(htmlTheme()).toBe(ThemeColorMode.LIGHT)

      fireEvent.click(screen.getByText('toggle'))
      expect(htmlTheme()).toBe(ThemeColorMode.DARK)
    })

    test('saves changes under storageKey', () => {
      render(
        <TzarProvider storageKey={STORAGE_KEY}>
          <ThemeConsumer />
        </TzarProvider>,
      )

      fireEvent.click(screen.getByText('toggle'))
      expect(window.localStorage.getItem(STORAGE_KEY)).toBe(ThemeColorMode.DARK)

      fireEvent.click(screen.getByText('reset'))
      expect(window.localStorage.getItem(STORAGE_KEY)).toBe(
        ThemeColorMode.LIGHT,
      )
    })

    test('restores the saved theme on mount', () => {
      window.localStorage.setItem(STORAGE_KEY, ThemeColorMode.DARK)

      render(
        <TzarProvider storageKey={STORAGE_KEY}>
          <ThemeConsumer />
        </TzarProvider>,
      )

      expect(screen.getByTestId('theme').textContent).toBe(ThemeColorMode.DARK)
      expect(htmlTheme()).toBe(ThemeColorMode.DARK)
    })

    test('ignores an invalid saved value', () => {
      window.localStorage.setItem(STORAGE_KEY, 'purple')

      render(
        <TzarProvider storageKey={STORAGE_KEY}>
          <ThemeConsumer />
        </TzarProvider>,
      )

      expect(screen.getByTestId('theme').textContent).toBe(ThemeColorMode.LIGHT)
    })

    test('follows data-theme when something else changes it', async () => {
      render(
        <TzarProvider>
          <ThemeConsumer />
        </TzarProvider>,
      )

      await act(async () => {
        document.documentElement.setAttribute('data-theme', ThemeColorMode.DARK)
        await Promise.resolve()
      })

      await waitFor(() => {
        expect(screen.getByTestId('theme').textContent).toBe(
          ThemeColorMode.DARK,
        )
      })
    })
  })
})
