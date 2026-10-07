import { expect, test } from '@playwright/test'
import { storyUrl } from './storyUrl'

// The default story: an outline link reading "Log in".
const OUTLINE_LINK = storyUrl('reactcomponentlibrary-tzarcommonlink--default')

test('looks like the dashboard link, with the hover color', async ({
  page,
}) => {
  await page.goto(OUTLINE_LINK)
  const link = page.getByRole('link', { name: 'Log in' })

  // border-border-subtle (#e5e7eb) and bg-background (#f9fafb)
  await expect(link).toHaveCSS('border-top-width', '1px')
  await expect(link).toHaveCSS('border-top-color', 'rgb(229, 231, 235)')
  await expect(link).toHaveCSS('background-color', 'rgb(249, 250, 251)')

  // hover:bg-main-soft (#fdf2ff)
  await link.hover()
  await expect(link).toHaveCSS('background-color', 'rgb(253, 242, 255)')
})

test('shows a focus ring when reached with the keyboard', async ({ page }) => {
  await page.goto(OUTLINE_LINK)
  const link = page.getByRole('link', { name: 'Log in' })

  // Storybook draws the story after the page loads; a key press doesn't wait
  // for that the way click() or hover() do, so wait for the link first.
  await expect(link).toBeVisible()
  await page.keyboard.press('Tab')
  await expect(link).toBeFocused()

  // focus-visible:ring-2 focus-visible:ring-secondary (#0f172a)
  await expect(link).toHaveCSS(
    'box-shadow',
    /rgb\(15, 23, 42\) 0px 0px 0px 2px/,
  )
})
