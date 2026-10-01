import { fireEvent, render } from '@testing-library/react'
import { TzarProvider, useTzarTheme } from '@/provider'
import { ThemeColorMode } from '@tzardom-ui/types'
import { TzarThemeToggle } from './TzarThemeToggle'

const getHost = (container: HTMLElement) =>
  container.querySelector('tzar-icon-button') as HTMLElement

const iconName = (host: HTMLElement) =>
  host.querySelector('svg')?.classList.contains('lucide-sun') ? 'sun' : 'moon'

describe('TzarThemeToggle', () => {
  test('shows the moon in light mode and labels the button', () => {
    const { container } = render(<TzarThemeToggle />)
    const host = getHost(container)

    expect(iconName(host)).toBe('moon')
    expect((host as HTMLElement & { label?: string }).label).toBe(
      'Toggle theme',
    )
  })

  test('switches to dark on click and reports it', () => {
    const handleThemeChange = jest.fn()
    const { container } = render(
      <TzarThemeToggle onThemeChange={handleThemeChange} />,
    )
    const host = getHost(container)

    fireEvent.click(host)

    expect(handleThemeChange).toHaveBeenCalledWith(ThemeColorMode.DARK)
    expect(iconName(host)).toBe('sun')
  })

  test('follows the theme prop when one is passed', () => {
    const handleThemeChange = jest.fn()
    const { container, rerender } = render(
      <TzarThemeToggle
        theme={ThemeColorMode.DARK}
        onThemeChange={handleThemeChange}
      />,
    )
    const host = getHost(container)

    expect(iconName(host)).toBe('sun')

    fireEvent.click(host)
    expect(handleThemeChange).toHaveBeenCalledWith(ThemeColorMode.LIGHT)

    rerender(
      <TzarThemeToggle
        theme={ThemeColorMode.LIGHT}
        onThemeChange={handleThemeChange}
      />,
    )
    expect(iconName(host)).toBe('moon')
  })

  describe('inside a TzarProvider', () => {
    const ProviderTheme = () => (
      <span data-testid="provider-theme">{useTzarTheme().theme}</span>
    )

    beforeEach(() => {
      document.documentElement.removeAttribute('data-theme')
    })

    test('changes the provider theme on click', () => {
      const handleThemeChange = jest.fn()
      const { container, getByTestId } = render(
        <TzarProvider>
          <TzarThemeToggle onThemeChange={handleThemeChange} />
          <ProviderTheme />
        </TzarProvider>,
      )
      const host = getHost(container)

      fireEvent.click(host)

      expect(getByTestId('provider-theme').textContent).toBe(
        ThemeColorMode.DARK,
      )
      expect(iconName(host)).toBe('sun')
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
      const { container, getByText } = render(
        <TzarProvider>
          <TzarThemeToggle />
          <SetDark />
        </TzarProvider>,
      )

      fireEvent.click(getByText('dark'))

      expect(iconName(getHost(container))).toBe('sun')
    })

    test('with a theme prop, only reports the change', () => {
      const handleThemeChange = jest.fn()
      const { container, getByTestId } = render(
        <TzarProvider>
          <TzarThemeToggle
            theme={ThemeColorMode.LIGHT}
            onThemeChange={handleThemeChange}
          />
          <ProviderTheme />
        </TzarProvider>,
      )

      fireEvent.click(getHost(container))

      expect(handleThemeChange).toHaveBeenCalledWith(ThemeColorMode.DARK)
      expect(getByTestId('provider-theme').textContent).toBe(
        ThemeColorMode.LIGHT,
      )
    })
  })
})
