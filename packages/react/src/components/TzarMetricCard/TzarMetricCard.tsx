import { twMerge } from 'tailwind-merge'
import { TEST_ID_PREFIXES } from '@/constants/testIdPrefixes'
import type { TzarMetricCardProps } from './TzarMetricCard.types'

export const TzarMetricCard = ({
  'data-testid': testId,
  label,
  value,
  helperText,
  className,
  ...rest
}: TzarMetricCardProps) => {
  const rootTestId = `${TEST_ID_PREFIXES.metricCard}-${testId}`

  return (
    <dl
      {...rest}
      className={twMerge(
        'rounded-lg border border-border-subtle bg-background p-4 shadow-lg',
        className,
      )}
      data-testid={rootTestId}
    >
      <dt
        className="text-xs font-medium uppercase tracking-wide opacity-70"
        data-testid={`${rootTestId}-label`}
      >
        {label}
      </dt>
      <dd
        className="mt-2 text-2xl font-semibold"
        data-testid={`${rootTestId}-value`}
      >
        {value}
      </dd>
      <dd
        className="mt-1 text-xs opacity-70"
        data-testid={`${rootTestId}-helper-text`}
      >
        {helperText}
      </dd>
    </dl>
  )
}
