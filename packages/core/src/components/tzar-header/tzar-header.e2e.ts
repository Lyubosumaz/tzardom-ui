import { expect } from '@playwright/test'
import { test } from '@stencil/playwright'

test.describe('tzar-header', () => {
  test('renders the logged-in nav items by default', async ({ page }) => {
    await page.setContent('<tzar-header></tzar-header>')
    const header = page.locator('tzar-header')

    await expect(header).toContainText('Forest Runner')
    await expect(header).toContainText('House of Fame')
    await expect(header).toContainText('Social')
    await expect(header).not.toContainText('Register')
  })

  test('renders the logged-out nav items when isLogged is false', async ({
    page,
  }) => {
    await page.setContent('<tzar-header></tzar-header>')
    const header = page.locator('tzar-header')
    await header.evaluate((el: HTMLElement & { isLogged: boolean }) => {
      el.isLogged = false
    })

    await expect(header).toContainText('Home')
    await expect(header).toContainText('House of Fame')
    await expect(header).toContainText('Register')
    await expect(header).not.toContainText('Forest Runner')
  })
})
