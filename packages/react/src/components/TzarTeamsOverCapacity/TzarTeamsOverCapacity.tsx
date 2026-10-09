import { TEST_ID_PREFIXES } from '@/constants/testIdPrefixes'
import { WidgetSection } from '@/support/WidgetSection'
import type { TzarTeamsOverCapacityProps } from './TzarTeamsOverCapacity.types'

// Workload as a share of capacity, e.g. 15 of 10 is 150.
const toPercent = (workload: number, capacity: number) =>
  capacity === 0 ? 0 : Math.round((workload / capacity) * 100)

export const TzarTeamsOverCapacity = ({
  'data-testid': testId,
  teams,
  loadingText = 'Loading capacity data…',
  errorText = 'Unable to load capacity data right now.',
  emptyText = 'No teams are currently over capacity.',
  usedText = 'used',
  ...rest
}: TzarTeamsOverCapacityProps) => {
  const rootTestId = `${TEST_ID_PREFIXES.teamsOverCapacity}-${testId}`

  return (
    <WidgetSection
      {...rest}
      rootTestId={rootTestId}
      isEmpty={teams.length === 0}
      loadingText={loadingText}
      errorText={errorText}
      emptyText={emptyText}
    >
      <dl className="space-y-1 text-sm" data-testid={`${rootTestId}-list`}>
        {teams.map((team) => (
          <div
            key={team.id}
            className="flex items-center justify-between"
            data-testid={`${rootTestId}-team-${team.id}`}
          >
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
