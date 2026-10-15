import type { ComponentPropsWithoutRef } from 'react'

export type TzarButtonVariant = 'primary' | 'secondary' | 'soft' | 'danger'

export type TzarButtonSize = 'sm' | 'md'

export type TzarButtonProps = ComponentPropsWithoutRef<'button'> & {
  'data-testid': string
  variant?: TzarButtonVariant
  size?: TzarButtonSize
}
