import { fireEvent, render, screen } from '@testing-library/react'
import type { ReactNode } from 'react'
import { beforeEach, describe, expect, test } from 'vitest'
import { ThemeColorMode, TzarProvider, useTzarTheme } from '@/provider'
import { TzarThemeToggle } from './TzarThemeToggle'

const getToggle = () => screen.getByRole('button', { name: 'Dark theme' })

const iconName = () =>
  getToggle().querySelector('svg')?.classList.contains('lucide-sun')
    ? 'sun'
    : 'moon'

const pageTheme = () => document.documentElement.getAttribute('data-theme')

const renderInProvider = (children: ReactNode) =>
  render(<TzarProvider>{children}</TzarProvider>)

describe('TzarThemeToggle', () => {
  beforeEach(() => {
    document.documentElement.removeAttribute('data-theme')
  })

  test('shows the moon in light mode and labels the button', () => {
    renderInProvider(<TzarThemeToggle />)

    expect(iconName()).toBe('moon')
  })

  test('a click changes the provider theme, and the icon and page follow', () => {
    const ProviderTheme = () => (
      <span data-testid="provider-theme">{useTzarTheme().theme}</span>
    )
    renderInProvider(
      <>
        <TzarThemeToggle />
        <ProviderTheme />
      </>,
    )

    expect(getToggle().getAttribute('aria-pressed')).toBe('false')

    fireEvent.click(getToggle())

    expect(getToggle().getAttribute('aria-pressed')).toBe('true')
    expect(screen.getByTestId('provider-theme').textContent).toBe(
      ThemeColorMode.DARK,
    )
    expect(iconName()).toBe('sun')
    expect(pageTheme()).toBe(ThemeColorMode.DARK)

    fireEvent.click(getToggle())

    expect(iconName()).toBe('moon')
    expect(pageTheme()).toBe(ThemeColorMode.LIGHT)
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
    renderInProvider(
      <>
        <TzarThemeToggle />
        <SetDark />
      </>,
    )

    fireEvent.click(screen.getByText('dark'))

    expect(iconName()).toBe('sun')
  })

  test('throws outside a TzarProvider', () => {
    expect(() => render(<TzarThemeToggle />)).toThrow(
      'useTzarTheme must be used inside a <TzarProvider>',
    )
  })

  test('className overrides a conflicting built-in class', () => {
    renderInProvider(<TzarThemeToggle className="p-4" />)
    const classes = getToggle().className.split(' ')

    expect(classes).toContain('p-4')
    expect(classes).not.toContain('p-2')
    expect(classes).toContain('rounded-full')
  })

  test('passes data-testid through to the button', () => {
    renderInProvider(<TzarThemeToggle data-testid="mock" />)

    expect(screen.getByTestId('mock')).toBe(getToggle())
  })
})
