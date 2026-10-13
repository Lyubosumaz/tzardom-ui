import { twMerge } from 'tailwind-merge'
import { TEST_ID_PREFIXES } from '@/constants/testIdPrefixes'
import type { TzarPageHeaderProps } from './TzarPageHeader.types'

export const TzarPageHeader = ({
  'data-testid': testId,
  title,
  description,
  as: Heading = 'h1',
  className,
  ...rest
}: TzarPageHeaderProps) => {
  const rootTestId = `${TEST_ID_PREFIXES.pageHeader}-${testId}`
  const isPageTitle = Heading === 'h1'

  return (
    <hgroup
      {...rest}
      className={twMerge(
        isPageTitle ? 'space-y-2 pb-10' : 'space-y-1',
        className,
      )}
      data-testid={rootTestId}
    >
      <Heading
        className={
          isPageTitle
            ? 'text-2xl font-semibold tracking-tight'
            : 'text-sm font-semibold tracking-tight'
        }
        data-testid={`${rootTestId}-title`}
      >
        {title}
      </Heading>
      <p
        className="max-w-2xl text-sm opacity-80"
        data-testid={`${rootTestId}-description`}
      >
        {description}
      </p>
    </hgroup>
  )
}
