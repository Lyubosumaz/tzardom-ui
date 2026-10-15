'use client'

import { useEffect, useId, useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { TzarButton } from '@/components/TzarButton/TzarButton'
import { TEST_ID_PREFIXES } from '@/constants/testIdPrefixes'
import type { TzarDialogProps, TzarDialogSize } from './TzarDialog.types'

const SIZE_CLASSES: Record<
  TzarDialogSize,
  { dialog: string; title: string; actions: string }
> = {
  sm: { dialog: 'max-w-sm p-4', title: 'mb-2 text-sm', actions: 'mt-4' },
  lg: {
    dialog: 'min-h-80 max-w-xl p-6',
    title: 'mb-4 text-base',
    actions: 'mt-6',
  },
}

export const TzarDialog = ({
  'data-testid': testId,
  open,
  onClose,
  title,
  children,
  size = 'sm',
  confirmLabel,
  onConfirm,
  form,
  confirmVariant = 'primary',
  confirmDisabled = false,
  cancelLabel = 'Cancel',
  className,
  ...rest
}: TzarDialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const rootTestId = `${TEST_ID_PREFIXES.dialog}-${testId}`

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) {
      return
    }

    if (open && !dialog.open) {
      dialog.showModal()
    }
    if (!open && dialog.open) {
      dialog.close()
    }
  }, [open])

  return (
    <dialog
      {...rest}
      ref={dialogRef}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      className={twMerge(
        'm-auto max-h-[85vh] w-full overflow-y-auto rounded-lg border border-border-subtle bg-background text-foreground shadow-lg backdrop:bg-black/40 open:flex open:flex-col [scrollbar-color:var(--color-muted)_transparent] [scrollbar-width:thin]',
        SIZE_CLASSES[size].dialog,
        className,
      )}
      data-testid={rootTestId}
    >
      <h2
        id={titleId}
        className={twMerge('font-semibold', SIZE_CLASSES[size].title)}
        data-testid={`${rootTestId}-title`}
      >
        {title}
      </h2>
      <div className="flex-1" data-testid={`${rootTestId}-content`}>
        {children}
      </div>
      <footer
        className={twMerge(
          'flex justify-end gap-2',
          SIZE_CLASSES[size].actions,
        )}
        data-testid={`${rootTestId}-actions`}
      >
        <TzarButton data-testid={`${testId}-cancel`} onClick={onClose}>
          {cancelLabel}
        </TzarButton>
        {confirmLabel && (
          <TzarButton
            data-testid={`${testId}-confirm`}
            variant={confirmVariant}
            type={form ? 'submit' : 'button'}
            form={form}
            onClick={form ? undefined : onConfirm}
            disabled={confirmDisabled}
          >
            {confirmLabel}
          </TzarButton>
        )}
      </footer>
    </dialog>
  )
}
