import { fireEvent, render, screen, within } from '@testing-library/react'
import { LANGUAGES } from '@tzardom-ui/mocks'
import { describe, expect, test, vi } from 'vitest'
import { TzarLanguageSelect } from './TzarLanguageSelect'

const [first, second, third] = LANGUAGES

const getMenu = () => screen.getByRole('list', { hidden: true })

describe('TzarLanguageSelect', () => {
  test('shows the current language on the trigger', () => {
    render(<TzarLanguageSelect languages={LANGUAGES} value={second.code} />)

    expect(
      screen.getByRole('button', { name: `Language: ${second.short}` })
        .textContent,
    ).toBe(second.short)
  })

  test('falls back to the first language for an unknown value', () => {
    render(
      <TzarLanguageSelect
        languages={LANGUAGES}
        value={'mock-unknown' as (typeof LANGUAGES)[number]['code']}
      />,
    )

    expect(
      screen.getByRole('button', { name: `Language: ${first.short}` })
        .textContent,
    ).toBe(first.short)
  })

  test('names the trigger with the label and the visible code', () => {
    render(
      <TzarLanguageSelect
        languages={LANGUAGES}
        value={second.code}
        label="Mock label"
      />,
    )

    expect(
      screen.getByRole('button', { name: `Mock label: ${second.short}` }),
    ).toBeTruthy()
  })

  test('lists every language and marks the current one', () => {
    render(<TzarLanguageSelect languages={LANGUAGES} value={third.code} />)
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
        value={first.code}
        onChange={handleChange}
      />,
    )
    const trigger = screen.getByRole('button', {
      name: `Language: ${first.short}`,
    })

    expect(getMenu().hidden).toBe(true)
    expect(trigger.getAttribute('aria-controls')).toBe(getMenu().id)

    fireEvent.click(trigger)
    expect(getMenu().hidden).toBe(false)
    expect(trigger.getAttribute('aria-expanded')).toBe('true')

    fireEvent.click(screen.getByText(second.label))
    expect(handleChange).toHaveBeenCalledWith(second.code)
    expect(getMenu().hidden).toBe(true)
    expect(trigger.getAttribute('aria-expanded')).toBe('false')
  })

  test('closes on Escape and moves focus back to the trigger', () => {
    render(<TzarLanguageSelect languages={LANGUAGES} value={first.code} />)
    const trigger = screen.getByRole('button', {
      name: `Language: ${first.short}`,
    })

    fireEvent.click(trigger)
    fireEvent.keyDown(trigger, { key: 'Escape' })

    expect(getMenu().hidden).toBe(true)
    expect(document.activeElement).toBe(trigger)
  })

  test('closes when focus leaves it, e.g. a click elsewhere', () => {
    render(<TzarLanguageSelect languages={LANGUAGES} value={first.code} />)
    const trigger = screen.getByRole('button', {
      name: `Language: ${first.short}`,
    })

    fireEvent.click(trigger)
    fireEvent.focusOut(trigger, { relatedTarget: document.body })

    expect(getMenu().hidden).toBe(true)
  })

  test('stays open when focus moves to one of its options', () => {
    render(<TzarLanguageSelect languages={LANGUAGES} value={first.code} />)
    const trigger = screen.getByRole('button', {
      name: `Language: ${first.short}`,
    })

    fireEvent.click(trigger)
    fireEvent.focusOut(trigger, {
      relatedTarget: screen.getByText(second.label).closest('button'),
    })

    expect(getMenu().hidden).toBe(false)
  })

  test('passes data-testid through to its root element', () => {
    const { container } = render(
      <TzarLanguageSelect
        languages={LANGUAGES}
        value={first.code}
        data-testid="mock"
      />,
    )

    expect(screen.getByTestId('mock')).toBe(container.firstChild)
  })
})
