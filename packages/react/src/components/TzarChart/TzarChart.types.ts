import type { ComponentPropsWithoutRef } from 'react'

export type TzarChartType = 'line' | 'bar'

export interface TzarChartSeries {
  key: string
  label: string
}

export type TzarChartRow = Record<string, string | number>

export type TzarChartProps = Omit<
  ComponentPropsWithoutRef<'figure'>,
  'title' | 'children'
> & {
  'data-testid': string
  type: TzarChartType
  title: string
  subtitle?: string
  data: readonly TzarChartRow[]
  xKey: string
  xLabel?: string
  series: readonly TzarChartSeries[]
  emptyText?: string
  tableLabel?: string
}
