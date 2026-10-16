import { expect, test } from '@playwright/test'
import { CHART } from '@tzardom-ui/mocks'
import { storyUrl } from '@/support/storyUrl'

// The hover areas and the tooltip have no role or name (see the TODO in
// TzarChart), so they are found by tag and position.
const [, rowB] = CHART.data

for (const story of ['line', 'bar']) {
  test(`${story}: hovering a row shows every series for it`, async ({
    page,
  }) => {
    await page.goto(storyUrl(`data-display-tzarchart--${story}`))
    const tooltip = page.locator('figure svg + div')

    await page.locator('figure svg rect').nth(1).hover()
    await expect(tooltip).toBeVisible()
    await expect(tooltip).toContainText(rowB.name)
    await expect(tooltip).toContainText(String(rowB.workload))

    await page.mouse.move(0, 0)
    await expect(tooltip).toBeHidden()
  })
}

test('fills the width of its container', async ({ page }) => {
  await page.goto(storyUrl('data-display-tzarchart--line'))
  const figure = page.getByRole('figure')
  const plot = figure.locator('svg')

  const figureBox = await figure.boundingBox()
  const plotBox = await plot.boundingBox()
  if (!figureBox || !plotBox) {
    throw new Error('The chart should be on screen')
  }
  expect(figureBox.width - plotBox.width).toBeLessThan(40)
})

test('shows the data as a table when opened', async ({ page }) => {
  await page.goto(storyUrl('data-display-tzarchart--line'))
  const table = page.getByRole('table')

  await expect(table).toBeHidden()
  await page.getByText('Show data').click()
  await expect(table).toBeVisible()
})
