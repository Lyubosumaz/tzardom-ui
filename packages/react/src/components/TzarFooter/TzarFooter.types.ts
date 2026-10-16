import type { ComponentPropsWithoutRef } from 'react'

export type TzarFooterProps = Omit<
  ComponentPropsWithoutRef<'footer'>,
  'children'
> & {
  copyright: string
  appName: string
  builtWith: string
}
