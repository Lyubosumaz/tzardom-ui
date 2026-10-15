import { twMerge } from 'tailwind-merge'
import type { TzarMetricCardProps } from './TzarMetricCard.types'

export const TzarMetricCard = ({
  label,
  value,
  helperText,
  className,
  ...rest
}: TzarMetricCardProps) => {
  return (
    <dl
      {...rest}
      className={twMerge(
        'rounded-lg border border-border-subtle bg-background p-4 shadow-lg',
        className,
      )}
    >
      <dt className="text-xs font-medium uppercase tracking-wide opacity-70">
        {label}
      </dt>
      <dd className="mt-2 text-2xl font-semibold">{value}</dd>
      <dd className="mt-1 text-xs opacity-70">{helperText}</dd>
    </dl>
  )
}
