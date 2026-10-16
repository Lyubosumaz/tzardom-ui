import { useId } from 'react'
import { twMerge } from 'tailwind-merge'
import type { TzarTextFieldProps } from './TzarTextField.types'

export const TzarTextField = ({
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

  return (
    <div className={twMerge('space-y-1', className)}>
      <label
        htmlFor={inputId}
        className="block text-xs font-medium uppercase tracking-wide opacity-70"
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
      />
      {error && (
        <p id={errorId} className="text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  )
}
