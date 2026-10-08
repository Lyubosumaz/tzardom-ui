import type { ComponentPropsWithoutRef } from 'react'

export type TzarFooterProps = Omit<
  ComponentPropsWithoutRef<'footer'>,
  'children'
> & {
  'data-testid': string
  copyright: string
  appName: string
  builtWith: string
}
