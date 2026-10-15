import { WidgetSection } from '@/components/WidgetSection/WidgetSection'
import type { TzarTeamsOverCapacityProps } from './TzarTeamsOverCapacity.types'

// Workload as a share of capacity, e.g. 15 of 10 is 150.
const toPercent = (workload: number, capacity: number) =>
  capacity === 0 ? 0 : Math.round((workload / capacity) * 100)

export const TzarTeamsOverCapacity = ({
  teams,
  loadingText = 'Loading capacity data…',
  errorText = 'Unable to load capacity data right now.',
  emptyText = 'No teams are currently over capacity.',
  usedText = 'used',
  ...rest
}: TzarTeamsOverCapacityProps) => {
  return (
    <WidgetSection
      {...rest}
      isEmpty={teams.length === 0}
      loadingText={loadingText}
      errorText={errorText}
      emptyText={emptyText}
    >
      <dl className="space-y-1 text-sm">
        {teams.map((team) => (
          <div key={team.id} className="flex items-center justify-between">
            <dt className="font-medium">{team.name}</dt>
            <dd className="text-xs opacity-80">
              {team.workload}/{team.capacity} (
              {toPercent(team.workload, team.capacity)}% {usedText})
            </dd>
          </div>
        ))}
      </dl>
    </WidgetSection>
  )
}
