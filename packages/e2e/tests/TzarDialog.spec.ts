import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'
import { BUTTON, DIALOG } from '@tzardom-ui/mocks'
import { storyUrl } from '@/support/storyUrl'

const openButton = (page: Page) =>
  page.getByRole('button', { name: BUTTON.text })
const dialog = (page: Page) => page.getByRole('dialog', { name: DIALOG.title })

test.beforeEach(async ({ page }) => {
  await page.goto(storyUrl('overlays-tzardialog--interactive'))
})

test('opens as a named modal dialog', async ({ page }) => {
  await openButton(page).click()

  await expect(dialog(page)).toBeVisible()
})

test('closes on Escape and gives focus back to the opening button', async ({
  page,
}) => {
  await openButton(page).click()
  await page.keyboard.press('Escape')

  await expect(dialog(page)).toBeHidden()
  await expect(openButton(page)).toBeFocused()
})

// A modal dialog makes the page behind it inert, but Tab may still leave to
// the browser's own UI (the address bar). That's by design, so we only check
// that focus never reaches the page behind.
test('keeps keyboard focus off the page behind while open', async ({
  page,
}) => {
  await openButton(page).click()

  for (let press = 0; press < 5; press += 1) {
    await page.keyboard.press('Tab')
    await expect(openButton(page)).not.toBeFocused()
  }
})

test('covers the page behind, so it cannot be clicked', async ({ page }) => {
  const box = await openButton(page).boundingBox()
  if (!box) {
    throw new Error('The open button should be on screen')
  }
  await openButton(page).click()

  // The backdrop now sits on top of the button.
  const isButtonOnTop = await openButton(page).evaluate(
    (button, point) => document.elementFromPoint(point.x, point.y) === button,
    { x: box.x + box.width / 2, y: box.y + box.height / 2 },
  )
  expect(isButtonOnTop).toBe(false)
})

test('closes from its own buttons', async ({ page }) => {
  await openButton(page).click()
  await dialog(page).getByRole('button', { name: 'Cancel' }).click()
  await expect(dialog(page)).toBeHidden()

  await openButton(page).click()
  await dialog(page).getByRole('button', { name: 'Confirm' }).click()
  await expect(dialog(page)).toBeHidden()
})

test('keeps the actions at the bottom of the dialog', async ({ page }) => {
  await openButton(page).click()
  const dialogBox = await dialog(page).boundingBox()
  const actionsBox = await dialog(page).locator('footer').boundingBox()
  if (!dialogBox || !actionsBox) {
    throw new Error('The dialog and its actions should be on screen')
  }

  const gapBelowActions =
    dialogBox.y + dialogBox.height - (actionsBox.y + actionsBox.height)
  // Only the dialog's padding and border sit below the actions.
  expect(gapBelowActions).toBeLessThan(30)
})
