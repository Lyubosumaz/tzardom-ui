import { expect, test } from '@playwright/test'
import { USER } from '@tzardom-ui/mocks'
import { storyUrl } from '@/support/storyUrl'

test('can be used with the keyboard alone', async ({ page }) => {
  await page.goto(storyUrl('reactcomponentlibrary-tzarusermenu--default'))
  const trigger = page.getByRole('button', { name: `User menu: ${USER.email}` })
  // The menu box is the parent of the email shown inside it.
  const menu = page.getByText(USER.email).locator('..')

  await trigger.focus()
  await page.keyboard.press('Enter')
  await expect(menu).toBeVisible()

  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Account' })).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(page.getByRole('button', { name: 'Log out' })).toBeFocused()

  await page.keyboard.press('Escape')
  await expect(menu).toBeHidden()
  await expect(trigger).toBeFocused()
})

test('opens the menu below the button, lined up with its right edge', async ({
  page,
}) => {
  await page.goto(storyUrl('reactcomponentlibrary-tzarusermenu--default'))
  const trigger = page.getByRole('button', { name: `User menu: ${USER.email}` })
  const menu = page.getByText(USER.email).locator('..')

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
  const menu = page.getByText(USER.email).locator('..')

  await page.getByRole('button', { name: `User menu: ${USER.email}` }).click()
  await expect(menu).toBeVisible()

  await page.mouse.click(5, 5)
  await expect(menu).toBeHidden()
})

test('stays open when the email inside it is clicked', async ({ page }) => {
  await page.goto(storyUrl('reactcomponentlibrary-tzarusermenu--default'))
  const menu = page.getByText(USER.email).locator('..')

  await page.getByRole('button', { name: `User menu: ${USER.email}` }).click()
  await page.getByText(USER.email).click()

  await expect(menu).toBeVisible()
})
