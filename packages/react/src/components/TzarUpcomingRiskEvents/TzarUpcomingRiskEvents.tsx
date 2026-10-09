import { TEST_ID_PREFIXES } from '@/constants/testIdPrefixes'
import { WidgetSection } from '@/support/WidgetSection'
import type { TzarUpcomingRiskEventsProps } from './TzarUpcomingRiskEvents.types'

export const TzarUpcomingRiskEvents = ({
  'data-testid': testId,
  events,
  loadingText = 'Loading upcoming risk events…',
  errorText = 'Unable to load upcoming risk events right now.',
  emptyText = 'No upcoming vacations or critical events.',
  ...rest
}: TzarUpcomingRiskEventsProps) => {
  const rootTestId = `${TEST_ID_PREFIXES.upcomingRiskEvents}-${testId}`

  return (
    <WidgetSection
      {...rest}
      rootTestId={rootTestId}
      isEmpty={events.length === 0}
      loadingText={loadingText}
      errorText={errorText}
      emptyText={emptyText}
    >
      <ul className="space-y-2 text-xs" data-testid={`${rootTestId}-list`}>
        {events.map((event) => (
          <li
            key={event.id}
            className="rounded-md border border-border-subtle bg-background px-3 py-2"
            data-testid={`${rootTestId}-event-${event.id}`}
          >
            <p className="font-medium text-accent">
              {event.label}
              {event.teamName && ` · ${event.teamName}`}
            </p>
            <p className="mt-0.5">
              {event.description}{' '}
              <time dateTime={event.date} className="opacity-70">
                ({event.date})
              </time>
            </p>
          </li>
        ))}
      </ul>
    </WidgetSection>
  )
}
