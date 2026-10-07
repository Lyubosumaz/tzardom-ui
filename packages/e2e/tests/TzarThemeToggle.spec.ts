import { expect, test } from '@playwright/test'
import { storyUrl } from './storyUrl'

// In this story the toggle sits inside a TzarProvider that saves the theme.
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

  // text-secondary: #0f172a in the light theme, #38bdf8 in the dark one
  await expect(toggle).toHaveCSS('color', 'rgb(15, 23, 42)')
  await toggle.click()
  await expect(toggle).toHaveCSS('color', 'rgb(56, 189, 248)')
})
