'use client'

import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { useElementWidth } from '@/support/useElementWidth'
import { ChartBars } from './ChartBars'
import {
  CHART_HEIGHT,
  MARGIN,
  formatTick,
  getTicks,
  toNumber,
} from './chartLayout'
import { ChartLines } from './ChartLines'
import type { TzarChartProps } from './TzarChart.types'

// Leave about this much room per x label before skipping some.
const MIN_LABEL_WIDTH = 56

export const TzarChart = ({
  type,
  title,
  subtitle,
  data,
  xKey,
  xLabel = xKey,
  series,
  emptyText = 'No data to show.',
  tableLabel = 'Show data',
  className,
  ...rest
}: TzarChartProps) => {
  const { ref, width } = useElementWidth(480)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  // Plot area and scales.
  const plotWidth = Math.max(width - MARGIN.left - MARGIN.right, 0)
  const plotHeight = CHART_HEIGHT - MARGIN.top - MARGIN.bottom
  let maxValue = 0
  for (const row of data) {
    for (const serie of series) {
      maxValue = Math.max(maxValue, toNumber(row[serie.key]))
    }
  }
  const ticks = getTicks(maxValue)
  const yMax = ticks[ticks.length - 1]
  const bandWidth = data.length > 0 ? plotWidth / data.length : 0
  const xAt = (index: number) => MARGIN.left + bandWidth * (index + 0.5)
  const yAt = (value: number) =>
    MARGIN.top + plotHeight - (value / yMax) * plotHeight
  const labelEvery = Math.max(1, Math.ceil(MIN_LABEL_WIDTH / bandWidth))

  const activeRow = activeIndex === null ? null : data[activeIndex]
  const tooltipOnLeft = activeIndex !== null && xAt(activeIndex) > width / 2

  return (
    <figure
      {...rest}
      className={twMerge(
        'min-w-0 rounded-lg border border-border-subtle bg-background p-4 shadow-sm',
        className,
      )}
    >
      <figcaption className="mb-2">
        <p className="text-sm font-semibold uppercase tracking-wide opacity-70">
          {title}
        </p>
        {subtitle && <p className="text-xs opacity-70">{subtitle}</p>}
      </figcaption>

      {data.length === 0 ? (
        <p className="text-xs opacity-80">{emptyText}</p>
      ) : (
        <>
          {series.length > 1 && (
            <ul className="mb-2 flex flex-wrap gap-4 text-xs text-foreground">
              {series.map((serie) => (
                <li key={serie.key} className="flex items-center gap-1.5">
                  <span
                    aria-hidden="true"
                    className={
                      type === 'line' ? 'h-0.5 w-3' : 'h-2.5 w-2.5 rounded-sm'
                    }
                    style={{ backgroundColor: serie.color }}
                  />
                  {serie.label}
                </li>
              ))}
            </ul>
          )}

          <div ref={ref} className="relative">
            {/* The table below carries the same data for screen readers. */}
            <svg
              width={width}
              height={CHART_HEIGHT}
              aria-hidden="true"
              className="block overflow-visible"
              onPointerLeave={() => {
                setActiveIndex(null)
              }}
            >
              {ticks.map((tick) => (
                <g key={tick}>
                  <line
                    x1={MARGIN.left}
                    x2={MARGIN.left + plotWidth}
                    y1={yAt(tick)}
                    y2={yAt(tick)}
                    className="stroke-border-subtle"
                    strokeWidth={1}
                  />
                  <text
                    x={MARGIN.left - 8}
                    y={yAt(tick)}
                    textAnchor="end"
                    dominantBaseline="middle"
                    className="fill-muted text-xs tabular-nums"
                  >
                    {formatTick(tick)}
                  </text>
                </g>
              ))}

              {data.map((row, index) =>
                index % labelEvery === 0 ? (
                  <text
                    key={String(row[xKey])}
                    x={xAt(index)}
                    y={CHART_HEIGHT - 8}
                    textAnchor="middle"
                    className="fill-muted text-xs"
                  >
                    {String(row[xKey])}
                  </text>
                ) : null,
              )}

              {activeIndex !== null &&
                (type === 'line' ? (
                  <line
                    x1={xAt(activeIndex)}
                    x2={xAt(activeIndex)}
                    y1={MARGIN.top}
                    y2={MARGIN.top + plotHeight}
                    className="stroke-muted"
                    strokeWidth={1}
                  />
                ) : (
                  <rect
                    x={xAt(activeIndex) - bandWidth / 2}
                    y={MARGIN.top}
                    width={bandWidth}
                    height={plotHeight}
                    className="fill-secondary-soft"
                  />
                ))}

              {type === 'line' ? (
                <ChartLines
                  data={data}
                  xKey={xKey}
                  series={series}
                  xAt={xAt}
                  yAt={yAt}
                />
              ) : (
                <ChartBars
                  data={data}
                  xKey={xKey}
                  series={series}
                  xAt={xAt}
                  yAt={yAt}
                  bandWidth={bandWidth}
                />
              )}

              {/* Invisible hover areas, one full-height band per row. */}
              {/* TODO: the hover areas and the tooltip have no role or name,
                  so tests find them by position (Playwright) or by tag. Give
                  them a testable hook if hover needs unit tests. */}
              {data.map((row, index) => (
                <rect
                  key={String(row[xKey])}
                  x={xAt(index) - bandWidth / 2}
                  y={MARGIN.top}
                  width={bandWidth}
                  height={plotHeight}
                  className="fill-transparent"
                  onPointerEnter={() => {
                    setActiveIndex(index)
                  }}
                />
              ))}
            </svg>

            {activeRow && activeIndex !== null && (
              <div
                className="pointer-events-none absolute top-0 z-10 min-w-28 rounded-md border border-border-subtle bg-background px-2 py-1.5 text-xs shadow-md"
                style={{
                  left: xAt(activeIndex),
                  transform: tooltipOnLeft
                    ? 'translateX(calc(-100% - 8px))'
                    : 'translateX(8px)',
                }}
              >
                <p className="mb-1 text-muted">{String(activeRow[xKey])}</p>
                {series.map((serie) => (
                  <p key={serie.key} className="flex items-center gap-1.5">
                    <span
                      aria-hidden="true"
                      className="h-0.5 w-3"
                      style={{ backgroundColor: serie.color }}
                    />
                    <strong className="font-semibold text-foreground tabular-nums">
                      {toNumber(activeRow[serie.key])}
                    </strong>
                    <span className="text-muted">{serie.label}</span>
                  </p>
                ))}
              </div>
            )}
          </div>

          <details className="mt-2 text-xs">
            <summary className="cursor-pointer text-muted">
              {tableLabel}
            </summary>
            <table className="mt-2 w-full text-left tabular-nums">
              <thead>
                <tr>
                  <th scope="col" className="py-1 font-medium">
                    {xLabel}
                  </th>
                  {series.map((serie) => (
                    <th
                      key={serie.key}
                      scope="col"
                      className="py-1 font-medium"
                    >
                      {serie.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row) => (
                  <tr
                    key={String(row[xKey])}
                    className="border-t border-border-subtle"
                  >
                    <th scope="row" className="py-1 font-normal">
                      {String(row[xKey])}
                    </th>
                    {series.map((serie) => (
                      <td key={serie.key} className="py-1">
                        {toNumber(row[serie.key])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </details>
        </>
      )}
    </figure>
  )
}
