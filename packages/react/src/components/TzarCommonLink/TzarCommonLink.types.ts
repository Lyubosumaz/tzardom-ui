import type { ComponentPropsWithoutRef, ElementType } from 'react'

export type TzarCommonLinkVariant = 'outline' | 'ghost'

export type TzarCommonLinkProps<C extends ElementType = 'a'> = {
  as?: C
  variant?: TzarCommonLinkVariant
} & Omit<ComponentPropsWithoutRef<C>, 'as' | 'variant'>
