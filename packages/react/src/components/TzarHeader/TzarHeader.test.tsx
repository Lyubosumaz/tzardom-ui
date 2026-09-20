import { render, waitFor } from '@testing-library/react'
import { TzarHeader } from '../../generated/components'

const getHost = (container: HTMLElement) =>
  container.querySelector('tzar-header') as HTMLElement

describe('TzarHeader', () => {
  test('renders the logged-in nav items by default', async () => {
    const { container } = render(<TzarHeader />)
    const host = getHost(container)

    await waitFor(() => {
      const text = host.shadowRoot?.textContent ?? ''
      expect(text).toContain('Forest Runner')
      expect(text).toContain('House of Fame')
      expect(text).toContain('Social')
      expect(text).not.toContain('Home')
      expect(text).not.toContain('Register')
    })
  })

  test('renders the logged-out nav items when isLogged is false', async () => {
    const { container } = render(<TzarHeader isLogged={false} />)
    const host = getHost(container)

    await waitFor(() => {
      const text = host.shadowRoot?.textContent ?? ''
      expect(text).toContain('Home')
      expect(text).toContain('House of Fame')
      expect(text).toContain('Register')
      expect(text).not.toContain('Forest Runner')
      expect(text).not.toContain('Social')
    })
  })
})
