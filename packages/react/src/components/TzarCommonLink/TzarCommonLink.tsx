import type { ElementType } from 'react'
import { twMerge } from 'tailwind-merge'
import type {
  TzarCommonLinkProps,
  TzarCommonLinkVariant,
} from './TzarCommonLink.types'

const VARIANT_CLASSES: Record<TzarCommonLinkVariant, string> = {
  outline:
    'rounded-full border border-border-subtle bg-background px-3 py-1 text-xs font-medium text-secondary hover:bg-main-soft hover:text-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:bg-main-soft',
  ghost:
    'rounded-full px-3 py-1 text-secondary hover:bg-main-soft hover:text-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:bg-main-soft',
  primary:
    'inline-flex items-center justify-center rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-secondary-soft hover:bg-accent/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
}

export const TzarCommonLink = <C extends ElementType = 'a'>({
  as,
  variant = 'outline',
  className,
  ...rest
}: TzarCommonLinkProps<C>) => {
  const Component: ElementType = as ?? 'a'

  return (
    <Component
      {...rest}
      className={twMerge(VARIANT_CLASSES[variant], className)}
    />
  )
}
