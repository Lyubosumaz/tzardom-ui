import type { ComponentPropsWithoutRef } from 'react'

export type TzarHeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export type TzarPageHeaderProps = Omit<
  ComponentPropsWithoutRef<'hgroup'>,
  'title' | 'children'
> & {
  title: string
  description: string
  as?: TzarHeadingLevel
}
