import { twMerge } from 'tailwind-merge'
import { TEST_ID_PREFIXES } from '../../constants/testIdPrefixes'
import type { TzarFooterProps } from './TzarFooter.types'

export const TzarFooter = ({
  'data-testid': testId,
  copyright,
  appName,
  builtWith,
  className,
  ...rest
}: TzarFooterProps) => {
  const rootTestId = `${TEST_ID_PREFIXES.footer}-${testId}`

  return (
    <footer
      className={twMerge(
        'mt-auto border-t border-border-subtle bg-background/80',
        className,
      )}
      data-testid={rootTestId}
      {...rest}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 text-xs text-muted md:px-6">
        <p data-testid={`${rootTestId}-copyright`}>{copyright}</p>
        <p
          className="font-medium text-secondary"
          data-testid={`${rootTestId}-app-name`}
        >
          {appName}
        </p>
        <p
          className="text-secondary/70"
          data-testid={`${rootTestId}-built-with`}
        >
          {builtWith}
        </p>
      </div>
    </footer>
  )
}
