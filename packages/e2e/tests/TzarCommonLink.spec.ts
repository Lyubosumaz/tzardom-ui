import { expect, test } from '@playwright/test'
import { LOGIN_LINK, THEME_COLORS } from '@tzardom-ui/mocks'
import { storyUrl } from '../support/storyUrl'

const OUTLINE_LINK = storyUrl('reactcomponentlibrary-tzarcommonlink--default')
const { light } = THEME_COLORS

test('looks like the dashboard link, with the hover color', async ({
  page,
}) => {
  await page.goto(OUTLINE_LINK)
  const link = page.getByRole('link', { name: LOGIN_LINK.text })

  await expect(link).toHaveCSS('border-top-width', '1px')
  await expect(link).toHaveCSS('border-top-color', light.borderSubtle)
  await expect(link).toHaveCSS('background-color', light.background)

  await link.hover()
  await expect(link).toHaveCSS('background-color', light.mainSoft)
})

test('shows a focus ring when reached with the keyboard', async ({ page }) => {
  await page.goto(OUTLINE_LINK)
  const link = page.getByRole('link', { name: LOGIN_LINK.text })

  await expect(link).toBeVisible()
  await page.keyboard.press('Tab')
  await expect(link).toBeFocused()

  const boxShadow = await link.evaluate(
    (element) => getComputedStyle(element).boxShadow,
  )
  expect(boxShadow).toContain(`${light.secondary} 0px 0px 0px 2px`)
})
