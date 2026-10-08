import { Umbrella } from 'lucide-react'
import { twMerge } from 'tailwind-merge'
import type { TzarBrandProps } from './TzarBrand.types'

export const TzarBrand = ({
  title,
  subtitle,
  icon: Icon = Umbrella,
  className,
  ...rest
}: TzarBrandProps) => (
  <div className={twMerge('flex items-center gap-3', className)} {...rest}>
    <Icon className="h-8 w-8" aria-hidden="true" />

    <div className="flex flex-col leading-4">
      <span className="text-sm font-semibold tracking-tight text-foreground">
        {title}
      </span>
      <span className="text-xs text-muted">{subtitle}</span>
    </div>
  </div>
)
