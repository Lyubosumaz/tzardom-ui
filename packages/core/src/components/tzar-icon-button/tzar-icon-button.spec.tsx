import { render, h } from '@stencil/vitest'
import { describe, it, expect } from 'vitest'
import './tzar-icon-button'

const getButton = (root: HTMLElement) =>
  root.shadowRoot?.querySelector('button') as HTMLButtonElement

describe('tzar-icon-button', () => {
  it('uses the label as the accessible name', async () => {
    const { root } = await render(<tzar-icon-button label="Notifications" />)

    expect(getButton(root).getAttribute('aria-label')).toBe('Notifications')
  })

  it('puts the icon in the default slot', async () => {
    const { root } = await render(
      <tzar-icon-button label="Star">
        <span class="my-icon" />
      </tzar-icon-button>,
    )
    const slot = root.shadowRoot?.querySelector('slot') as HTMLSlotElement

    expect(slot.assignedElements()[0]?.className).toBe('my-icon')
  })

  it('disables the native button and reflects the attribute', async () => {
    const { root } = await render(<tzar-icon-button label="Star" disabled />)

    expect(getButton(root).disabled).toBe(true)
    expect(root.hasAttribute('disabled')).toBe(true)
  })
})
