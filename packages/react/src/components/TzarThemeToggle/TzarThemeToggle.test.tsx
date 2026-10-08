import { fireEvent, render, screen } from '@testing-library/react'
import { TEST_ID } from '@tzardom-ui/mocks'
import type { ReactNode } from 'react'
import { beforeEach, describe, expect, test } from 'vitest'
import { TEST_ID_PREFIXES } from '../../constants/testIdPrefixes'
import { ThemeColorMode, TzarProvider, useTzarTheme } from '../../provider'
import { TzarThemeToggle } from './TzarThemeToggle'

const THEME_TOGGLE_ID = `${TEST_ID_PREFIXES.themeToggle}-${TEST_ID}`

const getToggle = () => screen.getByRole('button', { name: 'Toggle theme' })

const iconName = () =>
  screen.getByTestId(`${THEME_TOGGLE_ID}-icon`).classList.contains('lucide-sun')
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
    renderInProvider(<TzarThemeToggle data-testid={TEST_ID} />)

    expect(iconName()).toBe('moon')
  })

  test('a click changes the provider theme, and the icon and page follow', () => {
    const ProviderTheme = () => (
      <span data-testid="provider-theme">{useTzarTheme().theme}</span>
    )
    renderInProvider(
      <>
        <TzarThemeToggle data-testid={TEST_ID} />
        <ProviderTheme />
      </>,
    )

    fireEvent.click(getToggle())

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
        <TzarThemeToggle data-testid={TEST_ID} />
        <SetDark />
      </>,
    )

    fireEvent.click(screen.getByText('dark'))

    expect(iconName()).toBe('sun')
  })

  test('throws outside a TzarProvider', () => {
    expect(() => render(<TzarThemeToggle data-testid={TEST_ID} />)).toThrow(
      'useTzarTheme must be used inside a <TzarProvider>',
    )
  })

  test('className overrides a conflicting built-in class', () => {
    renderInProvider(<TzarThemeToggle data-testid={TEST_ID} className="p-4" />)
    const classes = getToggle().className.split(' ')

    expect(classes).toContain('p-4')
    expect(classes).not.toContain('p-2')
    expect(classes).toContain('rounded-full')
  })

  test('passes data-testid to its root element, the button', () => {
    renderInProvider(<TzarThemeToggle data-testid={TEST_ID} />)

    expect(screen.getByTestId(THEME_TOGGLE_ID)).toBe(getToggle())
  })

  test('gives its icon a test id built from data-testid', () => {
    renderInProvider(<TzarThemeToggle data-testid={TEST_ID} />)

    expect(
      getToggle().contains(screen.getByTestId(`${THEME_TOGGLE_ID}-icon`)),
    ).toBe(true)
  })
})
