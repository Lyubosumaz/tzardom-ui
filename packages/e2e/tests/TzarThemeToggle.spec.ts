import { expect, test } from '@playwright/test'
import { THEME_COLORS } from '@tzardom-ui/mocks'
import { storyUrl } from '../support/storyUrl'

const WITH_PROVIDER = storyUrl(
  'reactcomponentlibrary-tzarthemetoggle--with-provider',
)

test('switches the page to dark and keeps it after a reload', async ({
  page,
}) => {
  await page.goto(WITH_PROVIDER)
  const html = page.locator('html')
  await expect(html).toHaveAttribute('data-theme', 'light')

  await page.getByRole('button', { name: 'Toggle theme' }).click()
  await expect(html).toHaveAttribute('data-theme', 'dark')

  await page.reload()
  await expect(html).toHaveAttribute('data-theme', 'dark')
})

test('takes its colors from the theme', async ({ page }) => {
  await page.goto(WITH_PROVIDER)
  const toggle = page.getByRole('button', { name: 'Toggle theme' })

  await expect(toggle).toHaveCSS('color', THEME_COLORS.light.secondary)
  await toggle.click()
  await expect(toggle).toHaveCSS('color', THEME_COLORS.dark.secondary)
})
