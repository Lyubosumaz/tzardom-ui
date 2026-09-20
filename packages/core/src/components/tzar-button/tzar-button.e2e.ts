import { expect } from '@playwright/test'
import { test } from '@stencil/playwright'

test.describe('tzar-button', () => {
  test('renders the label', async ({ page }) => {
    await page.setContent('<tzar-button label="Click me"></tzar-button>')
    const button = page.locator('tzar-button')

    await expect(button).toContainText('Click me')
  })

  test('emits themeChange with the new theme when clicked', async ({
    page,
  }) => {
    await page.setContent('<tzar-button label="Click me"></tzar-button>')
    const themeChangeSpy = await page.spyOnEvent('themeChange')

    await page.locator('tzar-button').click()

    expect(themeChangeSpy).toHaveReceivedEventDetail('dark')
  })

  test('toggles back to light on a second click', async ({ page }) => {
    await page.setContent('<tzar-button label="Click me"></tzar-button>')
    const themeChangeSpy = await page.spyOnEvent('themeChange')
    const button = page.locator('tzar-button')

    await button.click()
    await button.click()

    expect(themeChangeSpy).toHaveReceivedEventTimes(2)
    expect(themeChangeSpy).toHaveReceivedEventDetail('light')
  })
})
