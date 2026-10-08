import type { ComponentPropsWithoutRef } from 'react'

export type TzarThemeToggleProps = Omit<
  ComponentPropsWithoutRef<'button'>,
  'children' | 'onClick' | 'type'
> & {
  'data-testid': string
  label?: string
}
