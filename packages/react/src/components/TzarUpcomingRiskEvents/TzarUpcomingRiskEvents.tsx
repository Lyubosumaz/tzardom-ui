import { WidgetSection } from '@/support/WidgetSection'
import type { TzarUpcomingRiskEventsProps } from './TzarUpcomingRiskEvents.types'

export const TzarUpcomingRiskEvents = ({
  events,
  loadingText = 'Loading upcoming risk events…',
  errorText = 'Unable to load upcoming risk events right now.',
  emptyText = 'No upcoming vacations or critical events.',
  ...rest
}: TzarUpcomingRiskEventsProps) => {
  return (
    <WidgetSection
      {...rest}
      isEmpty={events.length === 0}
      loadingText={loadingText}
      errorText={errorText}
      emptyText={emptyText}
    >
      <ul className="space-y-2 text-xs">
        {events.map((event) => (
          <li
            key={event.id}
            className="rounded-md border border-border-subtle bg-background px-3 py-2"
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
