import { expect, test } from '@playwright/test'
import { TEST_ID, THEME_COLORS } from '@tzardom-ui/mocks'
import { TEST_ID_PREFIXES } from '@tzardom-ui/react'
import { storyUrl } from '../support/storyUrl'

const THEME_TOGGLE_ID = `${TEST_ID_PREFIXES.themeToggle}-${TEST_ID}`
const TOGGLE_STORY = storyUrl('reactcomponentlibrary-tzarthemetoggle--default')
const { light, dark } = THEME_COLORS

test('switches the page to dark and keeps it after a reload', async ({
  page,
}) => {
  await page.goto(TOGGLE_STORY)
  const html = page.locator('html')
  await expect(html).toHaveAttribute('data-theme', 'light')

  await page.getByTestId(THEME_TOGGLE_ID).click()
  await expect(html).toHaveAttribute('data-theme', 'dark')

  await page.reload()
  await expect(html).toHaveAttribute('data-theme', 'dark')
})

test('takes its colors from the theme', async ({ page }) => {
  await page.goto(TOGGLE_STORY)
  const toggle = page.getByTestId(THEME_TOGGLE_ID)

  await expect(toggle).toHaveCSS('color', light.secondary)
  await toggle.click()
  await expect(toggle).toHaveCSS('color', dark.secondary)
})
