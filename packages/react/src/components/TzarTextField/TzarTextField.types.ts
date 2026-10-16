import type { ComponentPropsWithoutRef } from 'react'

export type TzarTextFieldProps = Omit<
  ComponentPropsWithoutRef<'input'>,
  'children'
> & {
  label: string
  error?: string
}
