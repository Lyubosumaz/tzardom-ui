import { expect, test } from '@playwright/test'
import { TEST_ID, THEME_COLORS } from '@tzardom-ui/mocks'
import { TEST_ID_PREFIXES } from '@tzardom-ui/react'
import { storyUrl } from '@/support/storyUrl'

const LINK_ID = `${TEST_ID_PREFIXES.commonLink}-${TEST_ID}`
const OUTLINE_LINK = storyUrl('reactcomponentlibrary-tzarcommonlink--default')
const { light } = THEME_COLORS

test('looks like the dashboard link, with the hover color', async ({
  page,
}) => {
  await page.goto(OUTLINE_LINK)
  const link = page.getByTestId(LINK_ID)

  await expect(link).toHaveCSS('border-top-width', '1px')
  await expect(link).toHaveCSS('border-top-color', light.borderSubtle)
  await expect(link).toHaveCSS('background-color', light.background)

  await link.hover()
  await expect(link).toHaveCSS('background-color', light.mainSoft)
})

test('shows a focus ring when reached with the keyboard', async ({ page }) => {
  await page.goto(OUTLINE_LINK)
  const link = page.getByTestId(LINK_ID)

  await expect(link).toBeVisible()
  await page.keyboard.press('Tab')
  await expect(link).toBeFocused()

  const boxShadow = await link.evaluate(
    (element) => getComputedStyle(element).boxShadow,
  )
  expect(boxShadow).toContain(`${light.secondary} 0px 0px 0px 2px`)
})
