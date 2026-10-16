import type { ComponentPropsWithoutRef } from 'react'

export type TzarMetricCardProps = Omit<
  ComponentPropsWithoutRef<'dl'>,
  'children'
> & {
  label: string
  value: number | string
  helperText: string
}
