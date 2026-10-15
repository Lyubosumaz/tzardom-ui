import { fireEvent, render, screen } from '@testing-library/react'
import { BUTTON, TEST_ID } from '@tzardom-ui/mocks'
import { describe, expect, test, vi } from 'vitest'
import { TEST_ID_PREFIXES } from '@/constants/testIdPrefixes'
import { TzarButton } from './TzarButton'

const BUTTON_ID = `${TEST_ID_PREFIXES.button}-${TEST_ID}`

const getButton = () => screen.getByRole('button', { name: BUTTON.text })
const classes = () => getButton().className.split(' ')

describe('TzarButton', () => {
  test('is a native button that is not a submit button by default', () => {
    render(<TzarButton data-testid={TEST_ID}>{BUTTON.text}</TzarButton>)

    expect(getButton().tagName).toBe('BUTTON')
    expect(getButton().getAttribute('type')).toBe('button')
  })

  test('can submit a form', () => {
    const handleSubmit = vi.fn((event: SubmitEvent) => {
      event.preventDefault()
    })
    render(
      <form
        onSubmit={(event) => {
          handleSubmit(event.nativeEvent)
        }}
      >
        <TzarButton data-testid={TEST_ID} type="submit">
          {BUTTON.text}
        </TzarButton>
      </form>,
    )

    fireEvent.click(getButton())

    expect(handleSubmit).toHaveBeenCalledOnce()
  })

  test('calls onClick, but not while disabled', () => {
    const handleClick = vi.fn()
    const { rerender } = render(
      <TzarButton data-testid={TEST_ID} onClick={handleClick}>
        {BUTTON.text}
      </TzarButton>,
    )

    fireEvent.click(getButton())
    expect(handleClick).toHaveBeenCalledOnce()

    rerender(
      <TzarButton data-testid={TEST_ID} onClick={handleClick} disabled>
        {BUTTON.text}
      </TzarButton>,
    )
    fireEvent.click(getButton())
    expect(handleClick).toHaveBeenCalledOnce()
  })

  test('is an outlined small button by default', () => {
    render(<TzarButton data-testid={TEST_ID}>{BUTTON.text}</TzarButton>)

    expect(classes()).toEqual(
      expect.arrayContaining(['border', 'bg-background', 'h-8', 'text-xs']),
    )
  })

  test('has a filled look for primary and danger', () => {
    const { rerender } = render(
      <TzarButton data-testid={TEST_ID} variant="primary">
        {BUTTON.text}
      </TzarButton>,
    )
    expect(classes()).toContain('bg-accent')

    rerender(
      <TzarButton data-testid={TEST_ID} variant="danger">
        {BUTTON.text}
      </TzarButton>,
    )
    expect(classes()).toEqual(
      expect.arrayContaining(['bg-danger', 'text-foreground']),
    )
  })

  test("has the header's soft color for soft", () => {
    render(
      <TzarButton data-testid={TEST_ID} variant="soft">
        {BUTTON.text}
      </TzarButton>,
    )

    expect(classes()).toEqual(
      expect.arrayContaining(['bg-accent-soft', 'border']),
    )
  })

  test('is larger with size md', () => {
    render(
      <TzarButton data-testid={TEST_ID} size="md">
        {BUTTON.text}
      </TzarButton>,
    )

    expect(classes()).toEqual(expect.arrayContaining(['py-1.5', 'text-sm']))
    expect(classes()).not.toContain('h-8')
  })

  test('className overrides a conflicting built-in class', () => {
    render(
      <TzarButton data-testid={TEST_ID} className="px-6">
        {BUTTON.text}
      </TzarButton>,
    )

    expect(classes()).toContain('px-6')
    expect(classes()).not.toContain('px-3')
  })

  test('passes data-testid to its root element, the button', () => {
    render(<TzarButton data-testid={TEST_ID}>{BUTTON.text}</TzarButton>)

    expect(screen.getByTestId(BUTTON_ID)).toBe(getButton())
  })
})
