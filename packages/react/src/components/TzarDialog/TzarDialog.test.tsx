import { fireEvent, render, screen } from '@testing-library/react'
import { DIALOG, TEST_ID } from '@tzardom-ui/mocks'
import { describe, expect, test, vi } from 'vitest'
import { TEST_ID_PREFIXES } from '@/constants/testIdPrefixes'
import { TzarDialog } from './TzarDialog'

const DIALOG_ID = `${TEST_ID_PREFIXES.dialog}-${TEST_ID}`

const getDialog = () => screen.getByTestId<HTMLDialogElement>(DIALOG_ID)

const renderDialog = (open: boolean, onClose = vi.fn()) =>
  render(
    <TzarDialog
      data-testid={TEST_ID}
      open={open}
      onClose={onClose}
      title={DIALOG.title}
    >
      <p>{DIALOG.text}</p>
    </TzarDialog>,
  )

describe('TzarDialog', () => {
  test('is a native dialog, closed while open is false', () => {
    renderDialog(false)

    expect(getDialog().tagName).toBe('DIALOG')
    expect(getDialog().open).toBe(false)
  })

  test('opens as a modal when open is true', () => {
    const showModal = vi.spyOn(HTMLDialogElement.prototype, 'showModal')
    renderDialog(true)

    expect(getDialog().open).toBe(true)
    expect(showModal).toHaveBeenCalledOnce()
  })

  test('closes when open goes back to false', () => {
    const onClose = vi.fn()
    const { rerender } = renderDialog(true, onClose)

    rerender(
      <TzarDialog
        data-testid={TEST_ID}
        open={false}
        onClose={onClose}
        title={DIALOG.title}
      >
        <p>{DIALOG.text}</p>
      </TzarDialog>,
    )

    expect(getDialog().open).toBe(false)
  })

  test('asks to close on Escape and leaves closing to open', () => {
    const onClose = vi.fn()
    renderDialog(true, onClose)

    const cancel = new Event('cancel', { cancelable: true })
    fireEvent(getDialog(), cancel)

    expect(onClose).toHaveBeenCalledOnce()
    expect(cancel.defaultPrevented).toBe(true)
    expect(getDialog().open).toBe(true)
  })

  test('is named by its title and shows its content', () => {
    renderDialog(true)

    expect(screen.getByRole('dialog', { name: DIALOG.title })).toBe(getDialog())
    expect(
      screen.getByRole('heading', { level: 2, name: DIALOG.title }),
    ).toBeTruthy()
    expect(screen.getByText(DIALOG.text)).toBeTruthy()
  })

  test('always has a Cancel button that asks to close', () => {
    const onClose = vi.fn()
    renderDialog(true, onClose)

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))

    expect(onClose).toHaveBeenCalledOnce()
    expect(screen.getAllByRole('button')).toHaveLength(1)
  })

  test('shows a confirm button that calls onConfirm', () => {
    const onConfirm = vi.fn()
    render(
      <TzarDialog
        data-testid={TEST_ID}
        open
        onClose={vi.fn()}
        title={DIALOG.title}
        confirmLabel="Mock confirm"
        onConfirm={onConfirm}
        confirmVariant="danger"
        cancelLabel="Mock cancel"
      >
        <p>{DIALOG.text}</p>
      </TzarDialog>,
    )
    const confirm = screen.getByRole('button', { name: 'Mock confirm' })

    fireEvent.click(confirm)

    expect(onConfirm).toHaveBeenCalledOnce()
    expect(confirm.getAttribute('type')).toBe('button')
    expect(confirm.className).toContain('bg-danger')
    expect(screen.getByRole('button', { name: 'Mock cancel' })).toBeTruthy()
  })

  test('submits a form with the confirm button when form is set', () => {
    const handleSubmit = vi.fn((event: SubmitEvent) => {
      event.preventDefault()
    })
    render(
      <TzarDialog
        data-testid={TEST_ID}
        open
        onClose={vi.fn()}
        title={DIALOG.title}
        confirmLabel="Mock save"
        form="mock-form"
      >
        <form
          id="mock-form"
          onSubmit={(event) => {
            handleSubmit(event.nativeEvent)
          }}
        />
      </TzarDialog>,
    )
    const confirm = screen.getByRole('button', { name: 'Mock save' })

    expect(confirm.getAttribute('type')).toBe('submit')
    expect(confirm.getAttribute('form')).toBe('mock-form')
    fireEvent.click(confirm)
    expect(handleSubmit).toHaveBeenCalledOnce()
  })

  test('disables the confirm button with confirmDisabled', () => {
    render(
      <TzarDialog
        data-testid={TEST_ID}
        open
        onClose={vi.fn()}
        title={DIALOG.title}
        confirmLabel="Mock confirm"
        confirmDisabled
      >
        <p>{DIALOG.text}</p>
      </TzarDialog>,
    )

    expect(
      screen.getByRole<HTMLButtonElement>('button', { name: 'Mock confirm' })
        .disabled,
    ).toBe(true)
  })

  test('puts its buttons in a footer after the content', () => {
    renderDialog(true)
    const footer = screen.getByTestId(`${DIALOG_ID}-actions`)

    expect(footer.tagName).toBe('FOOTER')
    expect(
      screen
        .getByTestId(`${DIALOG_ID}-content`)
        .compareDocumentPosition(footer) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy()
  })

  test('is compact by default and larger with size lg', () => {
    const { rerender } = renderDialog(true)
    const compact = getDialog().className.split(' ')
    expect(compact).toEqual(expect.arrayContaining(['max-w-sm', 'p-4']))
    expect(compact).not.toContain('min-h-80')

    rerender(
      <TzarDialog
        data-testid={TEST_ID}
        open
        onClose={vi.fn()}
        title={DIALOG.title}
        size="lg"
      >
        <p>{DIALOG.text}</p>
      </TzarDialog>,
    )
    expect(getDialog().className.split(' ')).toEqual(
      expect.arrayContaining(['max-w-xl', 'min-h-80', 'p-6']),
    )
  })

  test('className overrides a conflicting built-in class', () => {
    render(
      <TzarDialog
        data-testid={TEST_ID}
        open
        onClose={vi.fn()}
        title={DIALOG.title}
        className="max-w-lg"
      >
        <p>{DIALOG.text}</p>
      </TzarDialog>,
    )
    const classes = getDialog().className.split(' ')

    expect(classes).toContain('max-w-lg')
    expect(classes).not.toContain('max-w-sm')
  })

  test('gives its root and title test ids built from data-testid', () => {
    const { container } = renderDialog(true)

    expect(getDialog()).toBe(container.firstChild)
    expect(screen.getByTestId(`${DIALOG_ID}-title`).textContent).toBe(
      DIALOG.title,
    )
  })
})
