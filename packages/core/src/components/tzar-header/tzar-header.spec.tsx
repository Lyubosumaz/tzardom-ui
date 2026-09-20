import { render, h } from '@stencil/vitest'
import { describe, it, expect } from 'vitest'
import './tzar-header'

describe('tzar-header', () => {
  it('renders the logged-in nav items by default', async () => {
    const { root } = await render(<tzar-header />)
    const text = root.shadowRoot?.textContent ?? ''

    expect(text).toContain('Forest Runner')
    expect(text).toContain('House of Fame')
    expect(text).toContain('Social')
    expect(text).not.toContain('Home')
    expect(text).not.toContain('Register')
  })

  it('renders the logged-out nav items when isLogged is false', async () => {
    const { root } = await render(<tzar-header isLogged={false} />)
    const text = root.shadowRoot?.textContent ?? ''

    expect(text).toContain('Home')
    expect(text).toContain('House of Fame')
    expect(text).toContain('Register')
    expect(text).not.toContain('Forest Runner')
    expect(text).not.toContain('Social')
  })
})
