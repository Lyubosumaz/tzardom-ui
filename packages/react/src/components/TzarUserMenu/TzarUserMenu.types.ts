import type { ComponentPropsWithoutRef, ElementType } from 'react'

export type TzarUserMenuProps = Omit<
  ComponentPropsWithoutRef<'div'>,
  'children'
> & {
  email: string
  accountHref: string
  onLogout: () => void
  linkAs?: ElementType
  label?: string
  accountLabel?: string
  logoutLabel?: string
}
