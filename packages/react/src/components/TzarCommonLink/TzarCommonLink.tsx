import type { ComponentPropsWithoutRef, ElementType } from 'react'

// Classes from team-capacity-dashboard: `outline` is its LoginButton, `ghost`
// its HeaderNav links (which take their text size from the nav). Literal
// strings, so the app's Tailwind finds them when it scans this package.
const VARIANT_CLASSES = {
  outline:
    'rounded-full border border-border-subtle bg-background px-3 py-1 text-xs font-medium text-secondary hover:bg-main-soft hover:text-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:bg-main-soft',
  ghost:
    'rounded-full px-3 py-1 text-secondary hover:bg-main-soft hover:text-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:bg-main-soft',
}

export type TzarCommonLinkVariant = keyof typeof VARIANT_CLASSES

export type TzarCommonLinkProps<C extends ElementType = 'a'> = {
  /**
   * Element or component to render, e.g. Next.js `Link` for client-side
   * navigation. Defaults to a plain `<a>`.
   */
  as?: C
  /** `outline` (default): bordered pill. `ghost`: pill on hover only. */
  variant?: TzarCommonLinkVariant
} & Omit<ComponentPropsWithoutRef<C>, 'as' | 'variant'>

/**
 * A pill-shaped link. React only, with no core component behind it: it renders
 * the app's own link (pass it as `as`) so routing keeps working the app's way.
 */
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
