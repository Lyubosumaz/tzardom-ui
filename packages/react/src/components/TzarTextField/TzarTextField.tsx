import { useId } from 'react'
import { twMerge } from 'tailwind-merge'
import { TEST_ID_PREFIXES } from '@/constants/testIdPrefixes'
import type { TzarTextFieldProps } from './TzarTextField.types'

export const TzarTextField = ({
  'data-testid': testId,
  label,
  error,
  id,
  type = 'text',
  className,
  ...inputProps
}: TzarTextFieldProps) => {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const errorId = `${inputId}-error`
  const rootTestId = `${TEST_ID_PREFIXES.textField}-${testId}`

  return (
    <div className={twMerge('space-y-1', className)} data-testid={rootTestId}>
      <label
        htmlFor={inputId}
        className="block text-xs font-medium uppercase tracking-wide opacity-70"
        data-testid={`${rootTestId}-label`}
      >
        {label}
      </label>
      <input
        {...inputProps}
        id={inputId}
        type={type}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className="w-full rounded-md border border-border-subtle bg-background px-2 py-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent aria-invalid:border-danger aria-invalid:focus-visible:ring-danger"
        data-testid={`${rootTestId}-input`}
      />
      {error && (
        <p
          id={errorId}
          className="text-xs text-danger"
          data-testid={`${rootTestId}-error`}
        >
          {error}
        </p>
      )}
    </div>
  )
}
