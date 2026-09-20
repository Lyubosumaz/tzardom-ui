import { useContext } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import {
  TzarProvider,
  TzarContext,
  ThemeActionsType,
  ThemeColorMode2,
} from './index'

const ThemeConsumer = () => {
  const { theme, setTheme } = useContext(TzarContext)

  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button
        onClick={() =>
          setTheme({
            type: ThemeActionsType.THEME_COLOR_MODE,
            theme:
              theme === ThemeColorMode2.DARK
                ? ThemeColorMode2.LIGHT
                : ThemeColorMode2.DARK,
          })
        }
      >
        toggle
      </button>
      <button
        onClick={() =>
          setTheme({
            type: 'UNKNOWN' as ThemeActionsType,
            theme: ThemeColorMode2.DARK,
          })
        }
      >
        unknown action
      </button>
    </div>
  )
}

describe('TzarProvider', () => {
  test('renders children and provides the default dark theme', () => {
    render(
      <TzarProvider>
        <ThemeConsumer />
      </TzarProvider>,
    )

    expect(screen.getByTestId('theme').textContent).toBe('dark')
  })

  test('updates the theme through the reducer when setTheme is dispatched', () => {
    render(
      <TzarProvider>
        <ThemeConsumer />
      </TzarProvider>,
    )

    fireEvent.click(screen.getByText('toggle'))

    expect(screen.getByTestId('theme').textContent).toBe('light')
  })

  test('reducer keeps the current state for an unrecognized action type', () => {
    render(
      <TzarProvider>
        <ThemeConsumer />
      </TzarProvider>,
    )

    fireEvent.click(screen.getByText('unknown action'))

    expect(screen.getByTestId('theme').textContent).toBe('dark')
  })

  test('default context value exposes a no-op setTheme before any provider mounts', () => {
    render(<ThemeConsumer />)

    expect(screen.getByTestId('theme').textContent).toBe('dark')
    expect(() => fireEvent.click(screen.getByText('toggle'))).not.toThrow()
    expect(screen.getByTestId('theme').textContent).toBe('dark')
  })
})
