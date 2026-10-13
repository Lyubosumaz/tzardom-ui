import type { ComponentPropsWithoutRef } from 'react'

export type TzarMetricCardProps = Omit<
  ComponentPropsWithoutRef<'dl'>,
  'children'
> & {
  'data-testid': string
  label: string
  value: number | string
  helperText: string
}
