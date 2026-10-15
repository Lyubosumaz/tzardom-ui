import { twMerge } from 'tailwind-merge'
import { TEST_ID_PREFIXES } from '@/constants/testIdPrefixes'
import type {
  TzarButtonProps,
  TzarButtonSize,
  TzarButtonVariant,
} from './TzarButton.types'

const BASE_CLASSES =
  'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-60'

const VARIANT_CLASSES: Record<TzarButtonVariant, string> = {
  primary:
    'bg-accent text-secondary-soft hover:bg-accent/90 focus-visible:ring-accent',
  secondary:
    'border border-border-subtle bg-background shadow-sm hover:bg-accent-soft focus-visible:ring-accent',
  soft: 'border border-border-subtle bg-accent-soft shadow-sm hover:bg-accent-soft/70 focus-visible:ring-accent',
  danger:
    'bg-danger text-foreground hover:bg-danger/90 focus-visible:ring-danger',
}

const SIZE_CLASSES: Record<TzarButtonSize, string> = {
  sm: 'h-8 px-3 text-xs',
  md: 'px-3 py-1.5 text-sm',
}

export const TzarButton = ({
  'data-testid': testId,
  variant = 'secondary',
  size = 'sm',
  type = 'button',
  className,
  ...rest
}: TzarButtonProps) => (
  <button
    {...rest}
    type={type}
    className={twMerge(
      BASE_CLASSES,
      VARIANT_CLASSES[variant],
      SIZE_CLASSES[size],
      className,
    )}
    data-testid={`${TEST_ID_PREFIXES.button}-${testId}`}
  />
)
