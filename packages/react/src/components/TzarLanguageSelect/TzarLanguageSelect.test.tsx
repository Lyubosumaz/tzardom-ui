import { fireEvent, render, screen, within } from '@testing-library/react'
import { LANGUAGES } from '@tzardom-ui/mocks'
import { describe, expect, test, vi } from 'vitest'
import { TzarLanguageSelect } from './TzarLanguageSelect'

const getMenu = () => screen.getByRole('list', { hidden: true })

describe('TzarLanguageSelect', () => {
  test('shows the current language on the trigger', () => {
    render(<TzarLanguageSelect languages={LANGUAGES} value="bg" />)

    expect(
      screen.getByRole('button', { name: 'Language: BG' }).textContent,
    ).toBe('BG')
  })

  test('falls back to the first language for an unknown value', () => {
    render(
      <TzarLanguageSelect
        languages={LANGUAGES}
        value={'fr' as (typeof LANGUAGES)[number]['code']}
      />,
    )

    expect(
      screen.getByRole('button', { name: 'Language: EN' }).textContent,
    ).toBe('EN')
  })

  test('names the trigger with the label and the visible code', () => {
    render(<TzarLanguageSelect languages={LANGUAGES} value="bg" label="Език" />)

    expect(screen.getByRole('button', { name: 'Език: BG' })).toBeTruthy()
  })

  test('lists every language and marks the current one', () => {
    render(<TzarLanguageSelect languages={LANGUAGES} value="ka" />)
    const items = within(getMenu()).getAllByRole('button', { hidden: true })

    expect(items.map((item) => item.textContent)).toEqual(
      LANGUAGES.map((lang) => `${lang.short}${lang.label}`),
    )
    expect(items[2].getAttribute('aria-current')).toBe('true')
    expect(items[0].getAttribute('aria-current')).toBe('false')
  })

  test('opens from the trigger, reports the picked language and closes', () => {
    const handleChange = vi.fn()
    render(
      <TzarLanguageSelect
        languages={LANGUAGES}
        value="en"
        onChange={handleChange}
      />,
    )
    const trigger = screen.getByRole('button', { name: 'Language: EN' })

    expect(getMenu().hidden).toBe(true)
    expect(trigger.getAttribute('aria-controls')).toBe(getMenu().id)

    fireEvent.click(trigger)
    expect(getMenu().hidden).toBe(false)
    expect(trigger.getAttribute('aria-expanded')).toBe('true')

    fireEvent.click(screen.getByText('Bulgarian'))
    expect(handleChange).toHaveBeenCalledWith('bg')
    expect(getMenu().hidden).toBe(true)
    expect(trigger.getAttribute('aria-expanded')).toBe('false')
  })

  test('closes on Escape and moves focus back to the trigger', () => {
    render(<TzarLanguageSelect languages={LANGUAGES} value="en" />)
    const trigger = screen.getByRole('button', { name: 'Language: EN' })

    fireEvent.click(trigger)
    fireEvent.keyDown(document, { key: 'Escape' })

    expect(getMenu().hidden).toBe(true)
    expect(document.activeElement).toBe(trigger)
  })

  test('closes on a click outside', () => {
    render(<TzarLanguageSelect languages={LANGUAGES} value="en" />)

    fireEvent.click(screen.getByRole('button', { name: 'Language: EN' }))
    fireEvent.click(document.body)

    expect(getMenu().hidden).toBe(true)
  })
})
