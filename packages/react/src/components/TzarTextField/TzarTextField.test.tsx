import { fireEvent, render, screen } from '@testing-library/react'
import { TEXT_FIELD } from '@tzardom-ui/mocks'
import { describe, expect, test, vi } from 'vitest'
import { TzarTextField } from './TzarTextField'

const getInput = () => screen.getByLabelText(TEXT_FIELD.label)

describe('TzarTextField', () => {
  test('connects its label to the input', () => {
    render(<TzarTextField label={TEXT_FIELD.label} />)

    expect(getInput().tagName).toBe('INPUT')
    expect(getInput().getAttribute('type')).toBe('text')
  })

  test('uses the given id instead of a generated one', () => {
    render(<TzarTextField label={TEXT_FIELD.label} id="mock-id" />)

    expect(getInput().id).toBe('mock-id')
  })

  test('passes input props to the input', () => {
    const handleChange = vi.fn()
    render(
      <TzarTextField
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
    render(<TzarTextField label={TEXT_FIELD.label} />)

    expect(getInput().hasAttribute('aria-invalid')).toBe(false)
    expect(getInput().hasAttribute('aria-describedby')).toBe(false)
  })

  test('shows an error and links it to the input', () => {
    render(<TzarTextField label={TEXT_FIELD.label} error={TEXT_FIELD.error} />)
    const error = screen.getByText(TEXT_FIELD.error)

    expect(error.textContent).toBe(TEXT_FIELD.error)
    expect(getInput().getAttribute('aria-invalid')).toBe('true')
    expect(getInput().getAttribute('aria-describedby')).toBe(error.id)
    expect(getInput()).toBe(
      screen.getByRole('textbox', { description: TEXT_FIELD.error }),
    )
  })

  test('className styles the wrapper, not the input', () => {
    const { container } = render(
      <TzarTextField label={TEXT_FIELD.label} className="space-y-2" />,
    )
    const classes = (container.firstChild as HTMLElement).className.split(' ')

    expect(classes).toContain('space-y-2')
    expect(classes).not.toContain('space-y-1')
    expect(getInput().className).not.toContain('space-y-2')
  })

  test('passes data-testid through to the input', () => {
    render(<TzarTextField label={TEXT_FIELD.label} data-testid="mock" />)

    expect(screen.getByTestId('mock')).toBe(getInput())
  })
})
