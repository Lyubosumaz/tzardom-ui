import type { ComponentPropsWithoutRef } from 'react'

export type TzarTextFieldProps = Omit<
  ComponentPropsWithoutRef<'input'>,
  'children'
> & {
  'data-testid': string
  label: string
  error?: string
}
