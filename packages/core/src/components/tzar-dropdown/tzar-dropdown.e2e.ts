import { expect } from '@playwright/test'
import { test } from '@stencil/playwright'

const markup = `
  <tzar-dropdown label="Language">
    <span slot="trigger">EN</span>
    <button>BG</button>
  </tzar-dropdown>
  <p id="outside">outside</p>
`

test.describe('tzar-dropdown', () => {
  test('opens and closes from the trigger', async ({ page }) => {
    await page.setContent(markup)
    const trigger = page.getByRole('button', { name: 'Language' })

    await trigger.click()
    await expect(page.getByRole('listbox')).toBeVisible()
    await expect(trigger).toHaveAttribute('aria-expanded', 'true')

    await trigger.click()
    await expect(page.getByRole('listbox')).toHaveCount(0)
  })

  test('closes on Escape and on an outside click', async ({ page }) => {
    await page.setContent(markup)
    const trigger = page.getByRole('button', { name: 'Language' })

    await trigger.click()
    await page.keyboard.press('Escape')
    await expect(page.getByRole('listbox')).toHaveCount(0)

    await trigger.click()
    await page.locator('#outside').click()
    await expect(page.getByRole('listbox')).toHaveCount(0)
  })
})
