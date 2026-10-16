import { twMerge } from 'tailwind-merge'
import type { TzarPageHeaderProps } from './TzarPageHeader.types'

export const TzarPageHeader = ({
  title,
  description,
  as: Heading = 'h1',
  className,
  ...rest
}: TzarPageHeaderProps) => {
  const isPageTitle = Heading === 'h1'

  return (
    <hgroup
      {...rest}
      className={twMerge(
        isPageTitle ? 'space-y-2 pb-10' : 'space-y-1',
        className,
      )}
    >
      <Heading
        className={
          isPageTitle
            ? 'text-2xl font-semibold tracking-tight'
            : 'text-sm font-semibold tracking-tight'
        }
      >
        {title}
      </Heading>
      <p className="max-w-2xl text-sm opacity-80">{description}</p>
    </hgroup>
  )
}
