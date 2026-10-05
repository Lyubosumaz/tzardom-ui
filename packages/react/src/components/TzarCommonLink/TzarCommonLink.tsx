import type { ElementType } from 'react'
import type {
  TzarCommonLinkProps,
  TzarCommonLinkVariant,
} from './TzarCommonLink.types'

const VARIANT_CLASSES: Record<TzarCommonLinkVariant, string> = {
  outline:
    'rounded-full border border-border-subtle bg-background px-3 py-1 text-xs font-medium text-secondary hover:bg-main-soft hover:text-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:bg-main-soft',
  ghost:
    'rounded-full px-3 py-1 text-secondary hover:bg-main-soft hover:text-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:bg-main-soft',
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
      className={`${VARIANT_CLASSES[variant]} ${(className as string | undefined) ?? ''}`}
    />
  )
}
