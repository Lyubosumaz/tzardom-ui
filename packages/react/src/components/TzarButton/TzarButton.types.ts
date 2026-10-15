import type { ComponentPropsWithoutRef } from 'react'

export type TzarButtonVariant = 'primary' | 'secondary' | 'soft' | 'danger'

export type TzarButtonSize = 'sm' | 'md'

export type TzarButtonProps = ComponentPropsWithoutRef<'button'> & {
  variant?: TzarButtonVariant
  size?: TzarButtonSize
}
