import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { ThemeColorMode, TzarProvider, useTzarTheme } from '@/provider'
import { TzarThemeToggle } from './TzarThemeToggle'

const getToggle = () => screen.getByRole('button', { name: 'Toggle theme' })

const iconName = (button: HTMLElement) =>
  button.querySelector('svg')?.classList.contains('lucide-sun') ? 'sun' : 'moon'

describe('TzarThemeToggle', () => {
  test('shows the moon in light mode and labels the button', () => {
    render(<TzarThemeToggle />)

    expect(iconName(getToggle())).toBe('moon')
  })

  test('switches to dark on click and reports it', () => {
    const handleThemeChange = vi.fn()
    render(<TzarThemeToggle onThemeChange={handleThemeChange} />)

    fireEvent.click(getToggle())

    expect(handleThemeChange).toHaveBeenCalledWith(ThemeColorMode.DARK)
    expect(iconName(getToggle())).toBe('sun')
  })

  test('follows the theme prop when one is passed', () => {
    const handleThemeChange = vi.fn()
    const { rerender } = render(
      <TzarThemeToggle
        theme={ThemeColorMode.DARK}
        onThemeChange={handleThemeChange}
      />,
    )

    expect(iconName(getToggle())).toBe('sun')

    fireEvent.click(getToggle())
    expect(handleThemeChange).toHaveBeenCalledWith(ThemeColorMode.LIGHT)

    rerender(
      <TzarThemeToggle
        theme={ThemeColorMode.LIGHT}
        onThemeChange={handleThemeChange}
      />,
    )
    expect(iconName(getToggle())).toBe('moon')
  })

  describe('inside a TzarProvider', () => {
    const ProviderTheme = () => (
      <span data-testid="provider-theme">{useTzarTheme().theme}</span>
    )

    beforeEach(() => {
      document.documentElement.removeAttribute('data-theme')
    })

    test('changes the provider theme on click', () => {
      const handleThemeChange = vi.fn()
      render(
        <TzarProvider>
          <TzarThemeToggle onThemeChange={handleThemeChange} />
          <ProviderTheme />
        </TzarProvider>,
      )

      fireEvent.click(getToggle())

      expect(screen.getByTestId('provider-theme').textContent).toBe(
        ThemeColorMode.DARK,
      )
      expect(iconName(getToggle())).toBe('sun')
      expect(handleThemeChange).toHaveBeenCalledWith(ThemeColorMode.DARK)
    })

    test('shows a theme set elsewhere through the provider', () => {
      const SetDark = () => {
        const { setTheme } = useTzarTheme()
        return (
          <button
            type="button"
            onClick={() => {
              setTheme(ThemeColorMode.DARK)
            }}
          >
            dark
          </button>
        )
      }
      render(
        <TzarProvider>
          <TzarThemeToggle />
          <SetDark />
        </TzarProvider>,
      )

      fireEvent.click(screen.getByText('dark'))

      expect(iconName(getToggle())).toBe('sun')
    })

    test('with a theme prop, only reports the change', () => {
      const handleThemeChange = vi.fn()
      render(
        <TzarProvider>
          <TzarThemeToggle
            theme={ThemeColorMode.LIGHT}
            onThemeChange={handleThemeChange}
          />
          <ProviderTheme />
        </TzarProvider>,
      )

      fireEvent.click(getToggle())

      expect(handleThemeChange).toHaveBeenCalledWith(ThemeColorMode.DARK)
      expect(screen.getByTestId('provider-theme').textContent).toBe(
        ThemeColorMode.LIGHT,
      )
    })
  })

  test('className overrides a conflicting built-in class', () => {
    render(<TzarThemeToggle className="p-4" />)
    const classes = getToggle().className.split(' ')

    expect(classes).toContain('p-4')
    expect(classes).not.toContain('p-2')
    expect(classes).toContain('rounded-full')
  })
})
