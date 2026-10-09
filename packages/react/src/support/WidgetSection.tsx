import { useId } from 'react'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export type TzarWidgetStatus = 'loading' | 'error' | 'ready'

type WidgetSectionProps = Omit<ComponentPropsWithoutRef<'section'>, 'title'> & {
  rootTestId: string
  title: string
  status: TzarWidgetStatus
  isEmpty: boolean
  loadingText: string
  errorText: string
  emptyText: string
  children: ReactNode
}

const MESSAGE_CLASSES = 'text-xs opacity-80'

// The frame TzarTeamsOverCapacity and TzarUpcomingRiskEvents share: a section
// named by its heading, then a loading, error or empty message, or `children`
// once the data is ready.
export const WidgetSection = ({
  rootTestId,
  title,
  status,
  isEmpty,
  loadingText,
  errorText,
  emptyText,
  children,
  className,
  ...rest
}: WidgetSectionProps) => {
  const headingId = useId()

  return (
    <section
      {...rest}
      aria-labelledby={headingId}
      aria-busy={status === 'loading'}
      className={twMerge('space-y-2', className)}
      data-testid={rootTestId}
    >
      <h2
        id={headingId}
        className="text-sm font-semibold uppercase tracking-wide opacity-70"
        data-testid={`${rootTestId}-title`}
      >
        {title}
      </h2>

      {status === 'loading' && (
        <p className={MESSAGE_CLASSES} data-testid={`${rootTestId}-loading`}>
          {loadingText}
        </p>
      )}

      {status === 'error' && (
        <p className={MESSAGE_CLASSES} data-testid={`${rootTestId}-error`}>
          {errorText}
        </p>
      )}

      {status === 'ready' && isEmpty && (
        <p className={MESSAGE_CLASSES} data-testid={`${rootTestId}-empty`}>
          {emptyText}
        </p>
      )}

      {status === 'ready' && !isEmpty && children}
    </section>
  )
}
