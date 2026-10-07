import { expect, test } from '@playwright/test'
import { storyUrl } from './storyUrl'

test('can be used with the keyboard alone', async ({ page }) => {
  // In this story the picked language becomes the current one.
  await page.goto(
    storyUrl('reactcomponentlibrary-tzarlanguageselect--interactive'),
  )
  const menu = page.getByRole('list')

  await page.getByRole('button', { name: 'Language: EN' }).focus()
  await page.keyboard.press('Enter')
  await expect(menu).toBeVisible()

  await page.keyboard.press('Tab') // English
  await page.keyboard.press('Tab') // Bulgarian
  await page.keyboard.press('Enter')

  await expect(menu).toBeHidden()
  await expect(page.getByRole('button', { name: 'Language: BG' })).toBeVisible()
})

test('opens the menu below the button, lined up with its right edge', async ({
  page,
}) => {
  await page.goto(storyUrl('reactcomponentlibrary-tzarlanguageselect--default'))
  const trigger = page.getByRole('button', { name: 'Language: EN' })
  const menu = page.getByRole('list')

  await trigger.click()
  await expect(menu).toBeVisible()

  const triggerBox = await trigger.boundingBox()
  const menuBox = await menu.boundingBox()
  if (!triggerBox || !menuBox) {
    throw new Error('The button and the menu should both be on screen')
  }
  expect(menuBox.y).toBeGreaterThan(triggerBox.y + triggerBox.height)
  expect(menuBox.x + menuBox.width).toBeCloseTo(
    triggerBox.x + triggerBox.width,
    0,
  )
})
