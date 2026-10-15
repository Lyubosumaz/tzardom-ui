import { expect, test } from '@playwright/test'
import { LANGUAGES } from '@tzardom-ui/mocks'
import { storyUrl } from '@/support/storyUrl'

const [first, second] = LANGUAGES

test('can be used with the keyboard alone', async ({ page }) => {
  await page.goto(
    storyUrl('reactcomponentlibrary-tzarlanguageselect--interactive'),
  )
  const trigger = page.getByRole('button', { name: /^Language/ })
  const menu = page.getByRole('list')

  await expect(trigger).toHaveAccessibleName(`Language: ${first.short}`)
  await trigger.focus()
  await page.keyboard.press('Enter')
  await expect(menu).toBeVisible()

  await page.keyboard.press('Tab')
  await page.keyboard.press('Tab')
  await page.keyboard.press('Enter')

  await expect(menu).toBeHidden()
  await expect(trigger).toHaveAccessibleName(`Language: ${second.short}`)
})

test('opens the menu below the button, lined up with its right edge', async ({
  page,
}) => {
  await page.goto(storyUrl('reactcomponentlibrary-tzarlanguageselect--default'))
  const trigger = page.getByRole('button', { name: /^Language/ })
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

test('closes on a click elsewhere on the page', async ({ page }) => {
  await page.goto(storyUrl('reactcomponentlibrary-tzarlanguageselect--default'))
  const menu = page.getByRole('list')

  await page.getByRole('button', { name: /^Language/ }).click()
  await expect(menu).toBeVisible()

  await page.mouse.click(5, 5)
  await expect(menu).toBeHidden()
})
