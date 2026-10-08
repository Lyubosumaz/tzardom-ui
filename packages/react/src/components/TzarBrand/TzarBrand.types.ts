import type { ComponentPropsWithoutRef, ComponentType } from 'react'

export type TzarBrandProps = Omit<
  ComponentPropsWithoutRef<'div'>,
  'title' | 'children'
> & {
  'data-testid': string
  title: string
  subtitle: string
  icon?: ComponentType<{ className?: string; 'aria-hidden'?: 'true' }>
}
