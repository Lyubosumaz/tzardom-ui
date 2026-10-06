import { fireEvent, render, within } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import { TzarLanguageSelect } from './TzarLanguageSelect'

const LANGUAGES = [
  { code: 'en', short: 'EN', label: 'English' },
  { code: 'bg', short: 'BG', label: 'Bulgarian' },
  { code: 'ka', short: 'KA', label: 'Georgian' },
] as const

type Host = HTMLElement & { open?: boolean; label?: string }

const getHost = (container: HTMLElement) =>
  container.querySelector('tzar-dropdown') as Host

const openDropdown = (host: Host) =>
  fireEvent(host, new CustomEvent('openChange', { detail: true }))

describe('TzarLanguageSelect', () => {
  test('shows the current language on the trigger', () => {
    const { container } = render(
      <TzarLanguageSelect languages={LANGUAGES} value="bg" />,
    )

    expect(
      getHost(container).querySelector('[slot="trigger"]')?.textContent,
    ).toBe('BG')
  })

  test('falls back to the first language for an unknown value', () => {
    const { container } = render(
      <TzarLanguageSelect
        languages={LANGUAGES}
        value={'fr' as (typeof LANGUAGES)[number]['code']}
      />,
    )

    expect(
      getHost(container).querySelector('[slot="trigger"]')?.textContent,
    ).toBe('EN')
  })

  test('names the trigger with the label and the visible code', () => {
    const { container } = render(
      <TzarLanguageSelect languages={LANGUAGES} value="bg" label="Език" />,
    )

    expect(getHost(container).label).toBe('Език: BG')
  })

  test('lists every language and marks the current one', () => {
    const { getByRole } = render(
      <TzarLanguageSelect languages={LANGUAGES} value="ka" />,
    )
    const items = within(getByRole('list', { hidden: true })).getAllByRole(
      'button',
      { hidden: true },
    )

    expect(items.map((item) => item.textContent)).toEqual([
      'ENEnglish',
      'BGBulgarian',
      'KAGeorgian',
    ])
    expect(items[2].getAttribute('aria-current')).toBe('true')
    expect(items[0].getAttribute('aria-current')).toBe('false')
  })

  test('reports the picked language and closes', () => {
    const handleChange = vi.fn()
    const { container, getByText } = render(
      <TzarLanguageSelect
        languages={LANGUAGES}
        value="en"
        onChange={handleChange}
      />,
    )
    const host = getHost(container)

    openDropdown(host)
    expect(host.open).toBe(true)

    fireEvent.click(getByText('Bulgarian'))

    expect(handleChange).toHaveBeenCalledWith('bg')
    expect(host.open).toBe(false)
  })
})
