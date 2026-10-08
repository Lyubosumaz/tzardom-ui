'use client'

import { ChevronDown } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { TEST_ID_PREFIXES } from '../../constants/testIdPrefixes'
import type { TzarLanguageSelectProps } from './TzarLanguageSelect.types'

export const TzarLanguageSelect = <Code extends string = string>({
  'data-testid': testId,
  languages,
  value,
  onChange,
  label = 'Language',
  className,
  ...rest
}: TzarLanguageSelectProps<Code>) => {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuId = useId()
  const rootTestId = `${TEST_ID_PREFIXES.languageSelect}-${testId}`
  const current = languages.find((lang) => lang.code === value) ?? languages[0]

  useEffect(() => {
    if (!open) {
      return
    }

    const closeOnClickOutside = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }

    document.addEventListener('click', closeOnClickOutside)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('click', closeOnClickOutside)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [open])

  const handleSelect = (code: Code) => {
    onChange?.(code)
    setOpen(false)
  }

  return (
    <div
      {...rest}
      ref={rootRef}
      className={twMerge('relative', className)}
      data-testid={rootTestId}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-label={`${label}: ${current.short}`}
        aria-expanded={open}
        aria-controls={menuId}
        data-testid={`${rootTestId}-trigger`}
        onClick={() => {
          setOpen(!open)
        }}
        className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium text-secondary hover:bg-main-soft hover:text-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:bg-main-soft"
      >
        <span>{current.short}</span>
        <ChevronDown className="h-3 w-3" aria-hidden="true" />
      </button>

      <ul
        id={menuId}
        hidden={!open}
        data-testid={`${rootTestId}-menu`}
        className="absolute right-0 z-10 mt-2 w-32 rounded-md border border-border-subtle bg-background py-1 text-xs shadow-md"
      >
        {languages.map((lang) => (
          <li key={lang.code}>
            <button
              type="button"
              aria-current={lang.code === current.code}
              data-testid={`${rootTestId}-option-${lang.code}`}
              onClick={() => {
                handleSelect(lang.code)
              }}
              className="flex w-full items-center justify-between px-2 py-1 text-left hover:bg-main-soft hover:text-secondary"
            >
              <span>{lang.short}</span>
              <span>{lang.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
