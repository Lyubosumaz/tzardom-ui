import { render, h } from '@stencil/vitest'
import { describe, it, expect } from 'vitest'
import './tzar-button'

describe('tzar-button', () => {
  it('renders the label text', async () => {
    const { root } = await render(<tzar-button label="Click me" />)
    expect(root.shadowRoot?.textContent).toContain('Click me')
  })

  it('emits themeChange with the new theme when clicked', async () => {
    const { root, spyOnEvent, waitForChanges } = await render(
      <tzar-button label="Click me" />,
    )
    const themeChangeSpy = spyOnEvent('themeChange')

    root.shadowRoot?.querySelector('button')?.click()
    await waitForChanges()

    expect(themeChangeSpy.length).toBe(1)
    expect(themeChangeSpy.lastEvent?.detail).toBe('dark')
  })

  it('toggles back to light on a second click', async () => {
    const { root, spyOnEvent, waitForChanges } = await render(
      <tzar-button label="Click me" />,
    )
    const themeChangeSpy = spyOnEvent('themeChange')
    const button = root.shadowRoot?.querySelector('button')

    button?.click()
    await waitForChanges()
    button?.click()
    await waitForChanges()

    expect(themeChangeSpy.length).toBe(2)
    expect(themeChangeSpy.lastEvent?.detail).toBe('light')
  })
})
