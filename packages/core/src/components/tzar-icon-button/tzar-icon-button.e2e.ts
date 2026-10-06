import { expect } from '@playwright/test'
import { test } from '@stencil/playwright'

test.describe('tzar-icon-button', () => {
  test('is reachable by its label', async ({ page }) => {
    await page.setContent(
      '<tzar-icon-button label="Notifications"><span>★</span></tzar-icon-button>',
    )

    await expect(
      page.getByRole('button', { name: 'Notifications' }),
    ).toBeVisible()
  })

  test('fires click on the host element', async ({ page }) => {
    await page.setContent(
      '<tzar-icon-button label="Star"><span>★</span></tzar-icon-button>',
    )
    const clickSpy = await page.spyOnEvent('click')

    await page.getByRole('button', { name: 'Star' }).click()

    expect(clickSpy).toHaveReceivedEventTimes(1)
  })

  test('passes focus from the host to its button', async ({ page }) => {
    await page.setContent(
      '<tzar-icon-button label="Star"><span>★</span></tzar-icon-button>',
    )

    await page.locator('tzar-icon-button').focus()

    await expect(page.getByRole('button', { name: 'Star' })).toBeFocused()
  })

  test('does not fire click when disabled', async ({ page }) => {
    await page.setContent(
      '<tzar-icon-button label="Star" disabled><span>★</span></tzar-icon-button>',
    )
    const clickSpy = await page.spyOnEvent('click')

    await page.locator('tzar-icon-button').click({ force: true })

    expect(clickSpy).toHaveReceivedEventTimes(0)
  })
})
