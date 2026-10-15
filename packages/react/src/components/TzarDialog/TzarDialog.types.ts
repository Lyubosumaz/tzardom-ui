import type { ComponentPropsWithoutRef, ReactNode } from 'react'

export type TzarDialogSize = 'sm' | 'lg'

export type TzarDialogProps = Omit<
  ComponentPropsWithoutRef<'dialog'>,
  'open' | 'title' | 'children'
> & {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  size?: TzarDialogSize
  confirmLabel?: string
  onConfirm?: () => void
  form?: string
  confirmVariant?: 'primary' | 'danger'
  confirmDisabled?: boolean
  cancelLabel?: string
}
