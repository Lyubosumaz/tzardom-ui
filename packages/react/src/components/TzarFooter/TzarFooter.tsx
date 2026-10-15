import { twMerge } from 'tailwind-merge'
import type { TzarFooterProps } from './TzarFooter.types'

export const TzarFooter = ({
  copyright,
  appName,
  builtWith,
  className,
  ...rest
}: TzarFooterProps) => {
  return (
    <footer
      className={twMerge(
        'mt-auto border-t border-border-subtle bg-background/80',
        className,
      )}
      {...rest}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 text-xs text-muted md:px-6">
        <small>{copyright}</small>
        <p className="font-medium text-secondary">{appName}</p>
        <p className="text-secondary/70">{builtWith}</p>
      </div>
    </footer>
  )
}
