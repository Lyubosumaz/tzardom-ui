import { useContext } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeColorMode } from '@tzardom-ui/types'
import { TzarProvider, TzarContext, ThemeActionsType } from './index'

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
              theme === ThemeColorMode.DARK
                ? ThemeColorMode.LIGHT
                : ThemeColorMode.DARK,
          })
        }
      >
        toggle
      </button>
      <button
        onClick={() =>
          setTheme({
            type: 'UNKNOWN' as ThemeActionsType,
            theme: ThemeColorMode.DARK,
          })
        }
      >
        unknown action
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

  test('reducer keeps the current state for an unrecognized action type', () => {
    render(
      <TzarProvider>
        <ThemeConsumer />
      </TzarProvider>,
    )

    fireEvent.click(screen.getByText('unknown action'))

    expect(screen.getByTestId('theme').textContent).toBe(ThemeColorMode.LIGHT)
  })

  test('default context value exposes a no-op setTheme before any provider mounts', () => {
    render(<ThemeConsumer />)

    expect(screen.getByTestId('theme').textContent).toBe(ThemeColorMode.LIGHT)
    expect(() => fireEvent.click(screen.getByText('toggle'))).not.toThrow()
    expect(screen.getByTestId('theme').textContent).toBe(ThemeColorMode.LIGHT)
  })
})
