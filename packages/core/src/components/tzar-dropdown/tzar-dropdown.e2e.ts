import { expect } from '@playwright/test'
import { test } from '@stencil/playwright'

const markup = `
  <tzar-dropdown label="Language: EN">
    <span slot="trigger">EN</span>
    <ul>
      <li><button type="button">BG</button></li>
    </ul>
  </tzar-dropdown>
  <p id="outside">outside</p>
`

test.describe('tzar-dropdown', () => {
  test('opens and closes from the trigger', async ({ page }) => {
    await page.setContent(markup)
    const trigger = page.getByRole('button', { name: 'Language: EN' })
    const item = page.getByRole('button', { name: 'BG' })

    await expect(item).toBeHidden()

    await trigger.click()
    await expect(item).toBeVisible()
    await expect(trigger).toHaveAttribute('aria-expanded', 'true')

    await trigger.click()
    await expect(item).toBeHidden()
  })

  test('closes on Escape and on an outside click', async ({ page }) => {
    await page.setContent(markup)
    const trigger = page.getByRole('button', { name: 'Language: EN' })
    const item = page.getByRole('button', { name: 'BG' })

    await trigger.click()
    await page.keyboard.press('Escape')
    await expect(item).toBeHidden()
    await expect(trigger).toBeFocused()

    await trigger.click()
    await page.locator('#outside').click()
    await expect(item).toBeHidden()
  })
})
