import { fireEvent, render, screen, within } from '@testing-library/react'
import { CHART } from '@tzardom-ui/mocks'
import { describe, expect, test } from 'vitest'
import { TzarChart } from './TzarChart'
import type { TzarChartProps } from './TzarChart.types'

const [rowA, rowB] = CHART.data
const [capacity, workload] = CHART.series

const renderChart = (props: Partial<TzarChartProps> = {}) =>
  render(
    <TzarChart
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

const figure = () => screen.getByRole('figure')
const plot = () => figure().getElementsByTagName('svg')[0]
const legend = () => screen.getByRole('list')
const hoverAreas = () => plot().querySelectorAll('rect')
const tooltip = () => plot().nextElementSibling

describe('TzarChart', () => {
  test('is a figure captioned with its title and subtitle', () => {
    renderChart()
    const caption = figure().querySelector('figcaption')

    expect(caption?.textContent).toBe(`${CHART.title}${CHART.subtitle}`)
    expect(screen.getByText(CHART.title)).toBeTruthy()
    expect(screen.getByText(CHART.subtitle)).toBeTruthy()
  })

  test('shows a legend for two or more series, and none for one', () => {
    const { unmount } = renderChart()

    expect(
      within(legend())
        .getAllByRole('listitem')
        .map((item) => item.textContent),
    ).toEqual([capacity.label, workload.label])

    unmount()
    renderChart({ series: [capacity] })
    expect(screen.queryByRole('list')).toBeNull()
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

    expect(tooltip()).toBeNull()

    fireEvent.pointerEnter(hoverAreas()[1])

    expect(tooltip()?.textContent).toBe(
      `${rowB.name}${String(rowB.capacity)}${capacity.label}${String(rowB.workload)}${workload.label}`,
    )

    fireEvent.pointerLeave(plot())
    expect(tooltip()).toBeNull()
  })

  test('hides the drawing from screen readers and offers a data table', () => {
    renderChart()

    expect(plot().getAttribute('aria-hidden')).toBe('true')
    const table = screen.getByRole('table', { hidden: true })
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
    expect(screen.getByText('Mock empty')).toBeTruthy()
  })

  test('shows the empty text instead of a plot when there is no data', () => {
    renderChart({ data: [] })

    expect(screen.getByText('No data to show.')).toBeTruthy()
    expect(figure().querySelector('svg')).toBeNull()
  })

  test('colors each series with its own color', () => {
    renderChart()
    const lines = plot().querySelectorAll('path')
    const swatches = legend().querySelectorAll('span')

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
    const classes = figure().className.split(' ')

    expect(classes).toContain('p-2')
    expect(classes).not.toContain('p-4')
  })

  test('passes data-testid to its root element, the figure', () => {
    render(
      <TzarChart
        type="line"
        title={CHART.title}
        data={CHART.data}
        xKey={CHART.xKey}
        series={CHART.series}
        data-testid="mock"
      />,
    )

    expect(screen.getByTestId('mock')).toBe(figure())
  })
})
