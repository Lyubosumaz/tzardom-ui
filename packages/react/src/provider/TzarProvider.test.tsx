import { render, screen, fireEvent } from '@testing-library/react'
import { THEME_STORAGE_KEY } from '@tzardom-ui/mocks'
import { beforeEach, describe, expect, test } from 'vitest'
import { TzarProvider, ThemeColorMode, useTzarTheme } from './index'

const ThemeConsumer = () => {
  const { theme, setTheme, resetTheme } = useTzarTheme()

  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button
        type="button"
        onClick={() => {
          setTheme(
            theme === ThemeColorMode.DARK
              ? ThemeColorMode.LIGHT
              : ThemeColorMode.DARK,
          )
        }}
      >
        toggle
      </button>
      <button
        type="button"
        onClick={() => {
          resetTheme()
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

  test('useTzarTheme throws outside a TzarProvider', () => {
    expect(() => render(<ThemeConsumer />)).toThrow(
      'useTzarTheme must be used inside a <TzarProvider>',
    )
  })

  describe('page theme and storage', () => {
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
        <TzarProvider storageKey={THEME_STORAGE_KEY}>
          <ThemeConsumer />
        </TzarProvider>,
      )

      fireEvent.click(screen.getByText('toggle'))
      expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe(
        ThemeColorMode.DARK,
      )

      fireEvent.click(screen.getByText('reset'))
      expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe(
        ThemeColorMode.LIGHT,
      )
    })

    test('restores the saved theme on mount', () => {
      window.localStorage.setItem(THEME_STORAGE_KEY, ThemeColorMode.DARK)

      render(
        <TzarProvider storageKey={THEME_STORAGE_KEY}>
          <ThemeConsumer />
        </TzarProvider>,
      )

      expect(screen.getByTestId('theme').textContent).toBe(ThemeColorMode.DARK)
      expect(htmlTheme()).toBe(ThemeColorMode.DARK)
    })

    test('ignores an invalid saved value', () => {
      window.localStorage.setItem(THEME_STORAGE_KEY, 'purple')

      render(
        <TzarProvider storageKey={THEME_STORAGE_KEY}>
          <ThemeConsumer />
        </TzarProvider>,
      )

      expect(screen.getByTestId('theme').textContent).toBe(ThemeColorMode.LIGHT)
    })
  })
})
