import { expect, test } from '@playwright/test'
import { DIALOG, TEST_ID } from '@tzardom-ui/mocks'
import { TEST_ID_PREFIXES } from '@tzardom-ui/react'
import { storyUrl } from '@/support/storyUrl'

const DIALOG_ID = `${TEST_ID_PREFIXES.dialog}-${TEST_ID}`
const OPEN = `${TEST_ID_PREFIXES.button}-open`
const CANCEL = `${TEST_ID_PREFIXES.button}-${TEST_ID}-cancel`
const CONFIRM = `${TEST_ID_PREFIXES.button}-${TEST_ID}-confirm`

test.beforeEach(async ({ page }) => {
  await page.goto(storyUrl('reactcomponentlibrary-tzardialog--interactive'))
})

test('opens as a named modal dialog', async ({ page }) => {
  await page.getByTestId(OPEN).click()

  await expect(page.getByRole('dialog', { name: DIALOG.title })).toBeVisible()
})

test('closes on Escape and gives focus back to the opening button', async ({
  page,
}) => {
  const openButton = page.getByTestId(OPEN)
  await openButton.click()
  await page.keyboard.press('Escape')

  await expect(page.getByTestId(DIALOG_ID)).toBeHidden()
  await expect(openButton).toBeFocused()
})

test('keeps keyboard focus inside while open', async ({ page }) => {
  await page.getByTestId(OPEN).click()

  for (let press = 0; press < 5; press += 1) {
    await page.keyboard.press('Tab')
    const focusedInside = await page
      .getByTestId(DIALOG_ID)
      .evaluate((dialog) => dialog.contains(document.activeElement))
    expect(focusedInside).toBe(true)
  }
})

test('covers the page behind, so it cannot be clicked', async ({ page }) => {
  const openButton = page.getByTestId(OPEN)
  const box = await openButton.boundingBox()
  if (!box) {
    throw new Error('The open button should be on screen')
  }
  await openButton.click()

  // The backdrop now sits on top of the button.
  const isButtonOnTop = await openButton.evaluate(
    (button, point) => document.elementFromPoint(point.x, point.y) === button,
    { x: box.x + box.width / 2, y: box.y + box.height / 2 },
  )
  expect(isButtonOnTop).toBe(false)
})

test('closes from its own buttons', async ({ page }) => {
  await page.getByTestId(OPEN).click()
  await page.getByTestId(CANCEL).click()
  await expect(page.getByTestId(DIALOG_ID)).toBeHidden()

  await page.getByTestId(OPEN).click()
  await page.getByTestId(CONFIRM).click()
  await expect(page.getByTestId(DIALOG_ID)).toBeHidden()
})

test('keeps the actions at the bottom of the dialog', async ({ page }) => {
  await page.getByTestId(OPEN).click()
  const dialogBox = await page.getByTestId(DIALOG_ID).boundingBox()
  const actionsBox = await page
    .getByTestId(`${DIALOG_ID}-actions`)
    .boundingBox()
  if (!dialogBox || !actionsBox) {
    throw new Error('The dialog and its actions should be on screen')
  }

  const gapBelowActions =
    dialogBox.y + dialogBox.height - (actionsBox.y + actionsBox.height)
  // Only the dialog's padding and border sit below the actions.
  expect(gapBelowActions).toBeLessThan(30)
})
