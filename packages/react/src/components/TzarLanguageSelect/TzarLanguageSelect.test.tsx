import { fireEvent, render, screen, within } from '@testing-library/react'
import { LANGUAGES, TEST_ID } from '@tzardom-ui/mocks'
import { describe, expect, test, vi } from 'vitest'
import { TEST_ID_PREFIXES } from '../../constants/testIdPrefixes'
import { TzarLanguageSelect } from './TzarLanguageSelect'

const LANGUAGE_SELECT_ID = `${TEST_ID_PREFIXES.languageSelect}-${TEST_ID}`
const [first, second, third] = LANGUAGES

const getMenu = () => screen.getByRole('list', { hidden: true })

describe('TzarLanguageSelect', () => {
  test('shows the current language on the trigger', () => {
    render(
      <TzarLanguageSelect
        data-testid={TEST_ID}
        languages={LANGUAGES}
        value={second.code}
      />,
    )

    expect(
      screen.getByRole('button', { name: `Language: ${second.short}` })
        .textContent,
    ).toBe(second.short)
  })

  test('falls back to the first language for an unknown value', () => {
    render(
      <TzarLanguageSelect
        data-testid={TEST_ID}
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
        data-testid={TEST_ID}
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
    render(
      <TzarLanguageSelect
        data-testid={TEST_ID}
        languages={LANGUAGES}
        value={third.code}
      />,
    )
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
        data-testid={TEST_ID}
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
    render(
      <TzarLanguageSelect
        data-testid={TEST_ID}
        languages={LANGUAGES}
        value={first.code}
      />,
    )
    const trigger = screen.getByRole('button', {
      name: `Language: ${first.short}`,
    })

    fireEvent.click(trigger)
    fireEvent.keyDown(document, { key: 'Escape' })

    expect(getMenu().hidden).toBe(true)
    expect(document.activeElement).toBe(trigger)
  })

  test('closes on a click outside', () => {
    render(
      <TzarLanguageSelect
        data-testid={TEST_ID}
        languages={LANGUAGES}
        value={first.code}
      />,
    )

    fireEvent.click(
      screen.getByRole('button', { name: `Language: ${first.short}` }),
    )
    fireEvent.click(document.body)

    expect(getMenu().hidden).toBe(true)
  })

  test('passes data-testid to its root element, the outer div', () => {
    const { container } = render(
      <TzarLanguageSelect
        data-testid={TEST_ID}
        languages={LANGUAGES}
        value={first.code}
      />,
    )

    expect(screen.getByTestId(LANGUAGE_SELECT_ID)).toBe(container.firstChild)
  })

  test('gives its parts test ids built from data-testid', () => {
    render(
      <TzarLanguageSelect
        data-testid={TEST_ID}
        languages={LANGUAGES}
        value={first.code}
      />,
    )

    expect(screen.getByTestId(`${LANGUAGE_SELECT_ID}-trigger`)).toBe(
      screen.getByRole('button', { name: `Language: ${first.short}` }),
    )
    expect(screen.getByTestId(`${LANGUAGE_SELECT_ID}-menu`)).toBe(getMenu())
    for (const language of LANGUAGES) {
      expect(
        screen.getByTestId(`${LANGUAGE_SELECT_ID}-option-${language.code}`)
          .textContent,
      ).toBe(`${language.short}${language.label}`)
    }
  })
})
