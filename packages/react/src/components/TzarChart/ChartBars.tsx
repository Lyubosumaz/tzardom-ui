import { toNumber } from './chartLayout'
import type { TzarChartRow, TzarChartSeries } from './TzarChart.types'

type ChartBarsProps = {
  data: readonly TzarChartRow[]
  xKey: string
  series: readonly TzarChartSeries[]
  xAt: (index: number) => number
  yAt: (value: number) => number
  bandWidth: number
}

const MAX_BAR_WIDTH = 24
const BAR_GAP = 2
const CORNER = 4

// A bar from the baseline up, rounded only at the top: square at the base.
const barPath = (x: number, y: number, width: number, baseY: number) => {
  const radius = Math.min(CORNER, width / 2, baseY - y)
  return [
    ['M', x, baseY],
    ['V', y + radius],
    ['Q', x, y, x + radius, y],
    ['H', x + width - radius],
    ['Q', x + width, y, x + width, y + radius],
    ['V', baseY],
    ['Z'],
  ]
    .map((command) => command.join(' '))
    .join(' ')
}

// One group of bars per row, side by side, 2px apart.
export const ChartBars = ({
  data,
  xKey,
  series,
  xAt,
  yAt,
  bandWidth,
}: ChartBarsProps) => {
  const baseY = yAt(0)
  const barWidth = Math.min(
    MAX_BAR_WIDTH,
    (bandWidth * 0.7 - BAR_GAP * (series.length - 1)) / series.length,
  )
  const groupWidth = barWidth * series.length + BAR_GAP * (series.length - 1)

  return (
    <g>
      {data.map((row, index) => {
        const groupStart = xAt(index) - groupWidth / 2

        return (
          <g key={String(row[xKey])}>
            {series.map((serie, serieIndex) => {
              const y = yAt(toNumber(row[serie.key]))
              if (y >= baseY) {
                return null
              }

              return (
                <path
                  key={serie.key}
                  d={barPath(
                    groupStart + serieIndex * (barWidth + BAR_GAP),
                    y,
                    barWidth,
                    baseY,
                  )}
                  style={{ fill: serie.color }}
                />
              )
            })}
          </g>
        )
      })}
    </g>
  )
}
