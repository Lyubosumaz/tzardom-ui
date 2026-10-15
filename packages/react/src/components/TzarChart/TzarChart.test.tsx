import { fireEvent, render, screen, within } from '@testing-library/react'
import { CHART, TEST_ID } from '@tzardom-ui/mocks'
import { describe, expect, test } from 'vitest'
import { TEST_ID_PREFIXES } from '@/constants/testIdPrefixes'
import { TzarChart } from './TzarChart'
import type { TzarChartProps } from './TzarChart.types'

const ROOT_ID = `${TEST_ID_PREFIXES.chart}-${TEST_ID}`
const [rowA, rowB] = CHART.data
const [capacity, workload] = CHART.series

const renderChart = (props: Partial<TzarChartProps> = {}) =>
  render(
    <TzarChart
      data-testid={TEST_ID}
      type="line"
      title={CHART.title}
      subtitle={CHART.subtitle}
      data={CHART.data}
      xKey={CHART.xKey}
      xLabel={CHART.xLabel}
      series={CHART.series}
      {...props}
    />,
  )

const plot = () => screen.getByTestId(`${ROOT_ID}-plot`)

describe('TzarChart', () => {
  test('is a figure captioned with its title and subtitle', () => {
    renderChart()
    const figure = screen.getByRole('figure')
    const caption = figure.querySelector('figcaption')

    expect(figure).toBe(screen.getByTestId(ROOT_ID))
    expect(caption?.textContent).toBe(`${CHART.title}${CHART.subtitle}`)
    expect(screen.getByTestId(`${ROOT_ID}-title`).textContent).toBe(CHART.title)
    expect(screen.getByTestId(`${ROOT_ID}-subtitle`).textContent).toBe(
      CHART.subtitle,
    )
  })

  test('shows a legend for two or more series, and none for one', () => {
    const { unmount } = renderChart()
    const legend = screen.getByTestId(`${ROOT_ID}-legend`)

    expect(
      within(legend)
        .getAllByRole('listitem')
        .map((item) => item.textContent),
    ).toEqual([capacity.label, workload.label])

    unmount()
    renderChart({ series: [capacity] })
    expect(screen.queryByTestId(`${ROOT_ID}-legend`)).toBeNull()
  })

  test('draws a line and a dot per point for each series', () => {
    renderChart()

    expect(plot().querySelectorAll('path')).toHaveLength(2)
    expect(plot().querySelectorAll('circle')).toHaveLength(
      CHART.series.length * CHART.data.length,
    )
  })

  test('draws a bar per value, and none for a 0', () => {
    renderChart({
      type: 'bar',
      data: [...CHART.data, { name: 'Mock D', capacity: 4, workload: 0 }],
    })

    expect(plot().querySelectorAll('path')).toHaveLength(
      CHART.series.length * CHART.data.length + 1,
    )
  })

  test('labels the y axis with round ticks and the x axis with each row', () => {
    renderChart()
    const labels = [...plot().querySelectorAll('text')].map(
      (text) => text.textContent,
    )

    expect(labels).toEqual(
      expect.arrayContaining(['0', '5', '10', '15', 'Mock A', 'Mock C']),
    )
  })

  test('shows every series for the hovered row, and hides on leave', () => {
    renderChart()

    fireEvent.pointerEnter(screen.getByTestId(`${ROOT_ID}-hover-1`))
    const tooltip = screen.getByTestId(`${ROOT_ID}-tooltip`)

    expect(tooltip.textContent).toBe(
      `${rowB.name}${String(rowB.capacity)}${capacity.label}${String(rowB.workload)}${workload.label}`,
    )

    fireEvent.pointerLeave(plot())
    expect(screen.queryByTestId(`${ROOT_ID}-tooltip`)).toBeNull()
  })

  test('hides the drawing from screen readers and offers a data table', () => {
    renderChart()

    expect(plot().getAttribute('aria-hidden')).toBe('true')
    const table = within(screen.getByTestId(`${ROOT_ID}-data`)).getByRole(
      'table',
      { hidden: true },
    )
    const rows = within(table).getAllByRole('row', { hidden: true })

    expect(rows[0].textContent).toBe(
      `${CHART.xLabel}${capacity.label}${workload.label}`,
    )
    expect(rows[1].textContent).toBe(
      `${rowA.name}${String(rowA.capacity)}${String(rowA.workload)}`,
    )
    expect(rows).toHaveLength(CHART.data.length + 1)
  })

  test('uses custom texts', () => {
    const { unmount } = renderChart({ tableLabel: 'Mock table' })
    expect(screen.getByText('Mock table')).toBeTruthy()

    unmount()
    renderChart({ data: [], emptyText: 'Mock empty' })
    expect(screen.getByTestId(`${ROOT_ID}-empty`).textContent).toBe(
      'Mock empty',
    )
  })

  test('shows the empty text instead of a plot when there is no data', () => {
    renderChart({ data: [] })

    expect(screen.getByTestId(`${ROOT_ID}-empty`).textContent).toBe(
      'No data to show.',
    )
    expect(screen.queryByTestId(`${ROOT_ID}-plot`)).toBeNull()
  })

  test('colors each series with its own color', () => {
    renderChart()
    const lines = plot().querySelectorAll('path')
    const swatches = screen
      .getByTestId(`${ROOT_ID}-legend`)
      .querySelectorAll('span')

    expect(lines[0].style.stroke).toBe(capacity.color)
    expect(lines[1].style.stroke).toBe(workload.color)
    expect(swatches[0].style.backgroundColor).toBe(capacity.color)
    expect(swatches[1].style.backgroundColor).toBe(workload.color)
  })

  test('fills bars with their series color', () => {
    renderChart({ type: 'bar' })
    const bars = plot().querySelectorAll('path')

    expect(bars[0].style.fill).toBe(capacity.color)
    expect(bars[1].style.fill).toBe(workload.color)
  })

  test('className overrides a conflicting built-in class', () => {
    renderChart({ className: 'p-2' })
    const classes = screen.getByTestId(ROOT_ID).className.split(' ')

    expect(classes).toContain('p-2')
    expect(classes).not.toContain('p-4')
  })

  test('passes data-testid to its root element, the figure', () => {
    const { container } = renderChart()

    expect(screen.getByTestId(ROOT_ID)).toBe(container.firstChild)
    expect(screen.getByTestId(ROOT_ID).tagName).toBe('FIGURE')
  })
})
