import { Umbrella } from 'lucide-react'
import { twMerge } from 'tailwind-merge'
import { TEST_ID_PREFIXES } from '@/constants/testIdPrefixes'
import type { TzarBrandProps } from './TzarBrand.types'

export const TzarBrand = ({
  'data-testid': testId,
  title,
  subtitle,
  icon: Icon = Umbrella,
  className,
  ...rest
}: TzarBrandProps) => {
  const rootTestId = `${TEST_ID_PREFIXES.brand}-${testId}`

  return (
    <div
      className={twMerge('flex items-center gap-3', className)}
      data-testid={rootTestId}
      {...rest}
    >
      <Icon
        className="h-8 w-8"
        aria-hidden="true"
        data-testid={`${rootTestId}-icon`}
      />

      <div className="flex flex-col leading-4">
        <span
          className="text-sm font-semibold tracking-tight text-foreground"
          data-testid={`${rootTestId}-title`}
        >
          {title}
        </span>
        <span
          className="text-xs text-muted"
          data-testid={`${rootTestId}-subtitle`}
        >
          {subtitle}
        </span>
      </div>
    </div>
  )
}
