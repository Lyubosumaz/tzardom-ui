import { expect, test } from '@playwright/test'
import { CHART, TEST_ID } from '@tzardom-ui/mocks'
import { TEST_ID_PREFIXES } from '@tzardom-ui/react'
import { storyUrl } from '@/support/storyUrl'

const CHART_ID = `${TEST_ID_PREFIXES.chart}-${TEST_ID}`
const [, rowB] = CHART.data

for (const story of ['line', 'bar']) {
  test(`${story}: hovering a row shows every series for it`, async ({
    page,
  }) => {
    await page.goto(storyUrl(`reactcomponentlibrary-tzarchart--${story}`))
    const tooltip = page.getByTestId(`${CHART_ID}-tooltip`)

    await page.getByTestId(`${CHART_ID}-hover-1`).hover()
    await expect(tooltip).toBeVisible()
    await expect(tooltip).toContainText(rowB.name)
    await expect(tooltip).toContainText(String(rowB.workload))

    await page.mouse.move(0, 0)
    await expect(tooltip).toBeHidden()
  })
}

test('fills the width of its container', async ({ page }) => {
  await page.goto(storyUrl('reactcomponentlibrary-tzarchart--line'))
  const figure = page.getByTestId(CHART_ID)
  const plot = page.getByTestId(`${CHART_ID}-plot`)

  const figureBox = await figure.boundingBox()
  const plotBox = await plot.boundingBox()
  if (!figureBox || !plotBox) {
    throw new Error('The chart should be on screen')
  }
  expect(figureBox.width - plotBox.width).toBeLessThan(40)
})

test('shows the data as a table when opened', async ({ page }) => {
  await page.goto(storyUrl('reactcomponentlibrary-tzarchart--line'))
  const data = page.getByTestId(`${CHART_ID}-data`)

  await expect(data.getByRole('table')).toBeHidden()
  await data.getByText('Show data').click()
  await expect(data.getByRole('table')).toBeVisible()
})
