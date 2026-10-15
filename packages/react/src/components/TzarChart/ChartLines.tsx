import { toNumber } from './chartLayout'
import type { TzarChartRow, TzarChartSeries } from './TzarChart.types'

interface ChartLinesProps {
  data: readonly TzarChartRow[]
  xKey: string
  series: readonly TzarChartSeries[]
  xAt: (index: number) => number
  yAt: (value: number) => number
}

// A 2px line per series with a dot on every point.
export const ChartLines = ({
  data,
  xKey,
  series,
  xAt,
  yAt,
}: ChartLinesProps) => (
  <g>
    {series.map((serie) => {
      const points = data.map((row, index) => ({
        name: String(row[xKey]),
        x: xAt(index),
        y: yAt(toNumber(row[serie.key])),
      }))
      const path = points
        .map((point, index) =>
          [index === 0 ? 'M' : 'L', point.x, point.y].join(' '),
        )
        .join(' ')

      return (
        <g key={serie.key}>
          <path
            d={path}
            className="fill-none"
            style={{ stroke: serie.color }}
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          {points.map((point) => (
            <circle
              key={point.name}
              cx={point.x}
              cy={point.y}
              r={4}
              className="stroke-background"
              style={{ fill: serie.color }}
              strokeWidth={2}
            />
          ))}
        </g>
      )
    })}
  </g>
)
