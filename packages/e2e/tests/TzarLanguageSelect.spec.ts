import { expect, test } from '@playwright/test'
import { LANGUAGES, TEST_ID } from '@tzardom-ui/mocks'
import { TEST_ID_PREFIXES } from '@tzardom-ui/react'
import { storyUrl } from '../support/storyUrl'

const LANGUAGE_SELECT_ID = `${TEST_ID_PREFIXES.languageSelect}-${TEST_ID}`
const [english, bulgarian] = LANGUAGES
const TRIGGER = `${LANGUAGE_SELECT_ID}-trigger`
const MENU = `${LANGUAGE_SELECT_ID}-menu`

test('can be used with the keyboard alone', async ({ page }) => {
  await page.goto(
    storyUrl('reactcomponentlibrary-tzarlanguageselect--interactive'),
  )
  const trigger = page.getByTestId(TRIGGER)
  const menu = page.getByTestId(MENU)

  await expect(trigger).toHaveAccessibleName(`Language: ${english.short}`)
  await trigger.focus()
  await page.keyboard.press('Enter')
  await expect(menu).toBeVisible()

  await page.keyboard.press('Tab')
  await page.keyboard.press('Tab')
  await page.keyboard.press('Enter')

  await expect(menu).toBeHidden()
  await expect(trigger).toHaveAccessibleName(`Language: ${bulgarian.short}`)
})

test('opens the menu below the button, lined up with its right edge', async ({
  page,
}) => {
  await page.goto(storyUrl('reactcomponentlibrary-tzarlanguageselect--default'))
  const trigger = page.getByTestId(TRIGGER)
  const menu = page.getByTestId(MENU)

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
