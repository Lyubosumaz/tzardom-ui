import { render, h } from '@stencil/vitest'
import { describe, it, expect } from 'vitest'
import './tzar-dropdown'

const getTrigger = (root: HTMLElement) =>
  root.shadowRoot?.querySelector('[part="trigger"]') as HTMLButtonElement
const getMenu = (root: HTMLElement) =>
  root.shadowRoot?.querySelector('[part="menu"]')

describe('tzar-dropdown', () => {
  it('starts closed with the trigger content slotted', async () => {
    const { root } = await render(
      <tzar-dropdown>
        <span slot="trigger">EN</span>
        <button>BG</button>
      </tzar-dropdown>,
    )

    expect(getMenu(root)).toBeNull()
    expect(getTrigger(root).getAttribute('aria-expanded')).toBe('false')
    expect(getTrigger(root).getAttribute('aria-haspopup')).toBe('listbox')
  })

  it('opens on trigger click and emits openChange', async () => {
    const { root, spyOnEvent, waitForChanges } = await render(<tzar-dropdown />)
    const openChangeSpy = spyOnEvent('openChange')

    getTrigger(root).click()
    await waitForChanges()

    expect(getMenu(root)?.getAttribute('role')).toBe('listbox')
    expect(getTrigger(root).getAttribute('aria-expanded')).toBe('true')
    expect(root.hasAttribute('open')).toBe(true)
    expect(openChangeSpy.lastEvent?.detail).toBe(true)
  })

  it('closes on Escape', async () => {
    const { root, spyOnEvent, waitForChanges } = await render(
      <tzar-dropdown open />,
    )
    const openChangeSpy = spyOnEvent('openChange')

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await waitForChanges()

    expect(getMenu(root)).toBeNull()
    expect(openChangeSpy.lastEvent?.detail).toBe(false)
  })

  it('closes on a click outside, not on one inside', async () => {
    const { root, waitForChanges } = await render(
      <tzar-dropdown open>
        <button class="option">BG</button>
      </tzar-dropdown>,
    )

    ;(root.querySelector('.option') as HTMLButtonElement).click()
    await waitForChanges()
    expect(getMenu(root)).toBeTruthy()

    document.body.click()
    await waitForChanges()
    expect(getMenu(root)).toBeNull()
  })

  it('uses the label as the trigger accessible name', async () => {
    const { root } = await render(<tzar-dropdown label="Language" />)

    expect(getTrigger(root).getAttribute('aria-label')).toBe('Language')
  })
})
