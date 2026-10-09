import { expect, test } from '@playwright/test'
import { TEST_ID, USER } from '@tzardom-ui/mocks'
import { TEST_ID_PREFIXES } from '@tzardom-ui/react'
import { storyUrl } from '@/support/storyUrl'

const USER_MENU_ID = `${TEST_ID_PREFIXES.userMenu}-${TEST_ID}`
const TRIGGER = `${USER_MENU_ID}-trigger`
const MENU = `${USER_MENU_ID}-menu`
const ACCOUNT = `${TEST_ID_PREFIXES.commonLink}-${USER_MENU_ID}-account`
const LOGOUT = `${TEST_ID_PREFIXES.commonLink}-${USER_MENU_ID}-logout`

test('can be used with the keyboard alone', async ({ page }) => {
  await page.goto(storyUrl('reactcomponentlibrary-tzarusermenu--default'))
  const trigger = page.getByTestId(TRIGGER)
  const menu = page.getByTestId(MENU)

  await expect(trigger).toHaveAccessibleName(`User menu: ${USER.email}`)
  await trigger.focus()
  await page.keyboard.press('Enter')
  await expect(menu).toBeVisible()

  await page.keyboard.press('Tab')
  await expect(page.getByTestId(ACCOUNT)).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(page.getByTestId(LOGOUT)).toBeFocused()

  await page.keyboard.press('Escape')
  await expect(menu).toBeHidden()
  await expect(trigger).toBeFocused()
})

test('opens the menu below the button, lined up with its right edge', async ({
  page,
}) => {
  await page.goto(storyUrl('reactcomponentlibrary-tzarusermenu--default'))
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

test('closes on a click elsewhere on the page', async ({ page }) => {
  await page.goto(storyUrl('reactcomponentlibrary-tzarusermenu--default'))
  const menu = page.getByTestId(MENU)

  await page.getByTestId(TRIGGER).click()
  await expect(menu).toBeVisible()

  await page.mouse.click(5, 5)
  await expect(menu).toBeHidden()
})

test('stays open when the email inside it is clicked', async ({ page }) => {
  await page.goto(storyUrl('reactcomponentlibrary-tzarusermenu--default'))
  const menu = page.getByTestId(MENU)

  await page.getByTestId(TRIGGER).click()
  await page.getByTestId(`${USER_MENU_ID}-email`).click()

  await expect(menu).toBeVisible()
})
