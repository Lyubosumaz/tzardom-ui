import { fireEvent, render } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import { TzarLanguageSelect } from './TzarLanguageSelect'

const LANGUAGES = [
  { code: 'en', short: 'EN', label: 'English' },
  { code: 'bg', short: 'BG', label: 'Bulgarian' },
  { code: 'ka', short: 'KA', label: 'Georgian' },
] as const

type Host = HTMLElement & { open?: boolean }

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

  test('lists every language and marks the current one', () => {
    const { getAllByRole } = render(
      <TzarLanguageSelect languages={LANGUAGES} value="ka" />,
    )
    const options = getAllByRole('option', { hidden: true })

    expect(options.map((o) => o.textContent)).toEqual([
      'ENEnglish',
      'BGBulgarian',
      'KAGeorgian',
    ])
    expect(options[2].getAttribute('aria-selected')).toBe('true')
    expect(options[0].getAttribute('aria-selected')).toBe('false')
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
