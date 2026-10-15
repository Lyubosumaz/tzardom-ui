import { fireEvent, render, screen } from '@testing-library/react'
import { TEST_ID, TEXT_FIELD } from '@tzardom-ui/mocks'
import { describe, expect, test, vi } from 'vitest'
import { TEST_ID_PREFIXES } from '@/constants/testIdPrefixes'
import { TzarTextField } from './TzarTextField'

const FIELD_ID = `${TEST_ID_PREFIXES.textField}-${TEST_ID}`

const getInput = () => screen.getByLabelText(TEXT_FIELD.label)

describe('TzarTextField', () => {
  test('connects its label to the input', () => {
    render(<TzarTextField data-testid={TEST_ID} label={TEXT_FIELD.label} />)

    expect(getInput().tagName).toBe('INPUT')
    expect(getInput().getAttribute('type')).toBe('text')
  })

  test('uses the given id instead of a generated one', () => {
    render(
      <TzarTextField
        data-testid={TEST_ID}
        label={TEXT_FIELD.label}
        id="mock-id"
      />,
    )

    expect(getInput().id).toBe('mock-id')
  })

  test('passes input props to the input', () => {
    const handleChange = vi.fn()
    render(
      <TzarTextField
        data-testid={TEST_ID}
        label={TEXT_FIELD.label}
        type="email"
        name="mock-name"
        required
        value={TEXT_FIELD.value}
        onChange={handleChange}
      />,
    )
    const input = getInput() as HTMLInputElement

    expect(input.type).toBe('email')
    expect(input.name).toBe('mock-name')
    expect(input.required).toBe(true)
    expect(input.value).toBe(TEXT_FIELD.value)

    fireEvent.change(input, { target: { value: 'mock new' } })
    expect(handleChange).toHaveBeenCalledOnce()
  })

  test('has no error state without an error', () => {
    render(<TzarTextField data-testid={TEST_ID} label={TEXT_FIELD.label} />)

    expect(getInput().hasAttribute('aria-invalid')).toBe(false)
    expect(screen.queryByTestId(`${FIELD_ID}-error`)).toBeNull()
  })

  test('shows an error and links it to the input', () => {
    render(
      <TzarTextField
        data-testid={TEST_ID}
        label={TEXT_FIELD.label}
        error={TEXT_FIELD.error}
      />,
    )
    const error = screen.getByTestId(`${FIELD_ID}-error`)

    expect(error.textContent).toBe(TEXT_FIELD.error)
    expect(getInput().getAttribute('aria-invalid')).toBe('true')
    expect(getInput().getAttribute('aria-describedby')).toBe(error.id)
    expect(getInput()).toBe(
      screen.getByRole('textbox', { description: TEXT_FIELD.error }),
    )
  })

  test('className styles the wrapper, not the input', () => {
    render(
      <TzarTextField
        data-testid={TEST_ID}
        label={TEXT_FIELD.label}
        className="space-y-2"
      />,
    )
    const classes = screen.getByTestId(FIELD_ID).className.split(' ')

    expect(classes).toContain('space-y-2')
    expect(classes).not.toContain('space-y-1')
    expect(getInput().className).not.toContain('space-y-2')
  })

  test('gives its root and parts test ids built from data-testid', () => {
    const { container } = render(
      <TzarTextField
        data-testid={TEST_ID}
        label={TEXT_FIELD.label}
        error={TEXT_FIELD.error}
      />,
    )

    expect(screen.getByTestId(FIELD_ID)).toBe(container.firstChild)
    expect(screen.getByTestId(`${FIELD_ID}-label`).textContent).toBe(
      TEXT_FIELD.label,
    )
    expect(screen.getByTestId(`${FIELD_ID}-input`)).toBe(getInput())
  })
})
