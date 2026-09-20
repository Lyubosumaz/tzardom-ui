import { fireEvent, render, waitFor } from '@testing-library/react'
import { TzarButton } from '../../generated/components'

const getHost = (container: HTMLElement) =>
  container.querySelector('tzar-button') as HTMLElement

describe('TzarButton', () => {
  test('renders the label text', async () => {
    const { container } = render(<TzarButton label="Hello world!" />)
    const host = getHost(container)

    await waitFor(() => {
      expect(host.shadowRoot?.textContent).toContain('Hello world!')
    })
  })

  test('fires onThemeChange with the new theme when clicked', async () => {
    const handleThemeChange = jest.fn()
    const { container } = render(
      <TzarButton label="Click me" onThemeChange={handleThemeChange} />,
    )
    const host = getHost(container)

    let button: HTMLButtonElement | null | undefined
    await waitFor(() => {
      button = host.shadowRoot?.querySelector('button')
      expect(button).toBeTruthy()
    })

    fireEvent.click(button as HTMLButtonElement)

    await waitFor(() => {
      expect(handleThemeChange).toHaveBeenCalledTimes(1)
    })
    expect(handleThemeChange.mock.calls[0][0].detail).toBe('dark')
  })

  test('toggles back to light on a second click', async () => {
    const handleThemeChange = jest.fn()
    const { container } = render(
      <TzarButton label="Click me" onThemeChange={handleThemeChange} />,
    )
    const host = getHost(container)

    let button: HTMLButtonElement | null | undefined
    await waitFor(() => {
      button = host.shadowRoot?.querySelector('button')
      expect(button).toBeTruthy()
    })

    fireEvent.click(button as HTMLButtonElement)
    await waitFor(() => expect(handleThemeChange).toHaveBeenCalledTimes(1))

    fireEvent.click(button as HTMLButtonElement)
    await waitFor(() => expect(handleThemeChange).toHaveBeenCalledTimes(2))

    expect(handleThemeChange.mock.calls[1][0].detail).toBe('light')
  })
})
