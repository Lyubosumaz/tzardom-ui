'use client'

import { ChevronDown } from 'lucide-react'
import { twMerge } from 'tailwind-merge'
import { useDropdown } from '@/support/useDropdown'
import type { TzarLanguageSelectProps } from './TzarLanguageSelect.types'

export const TzarLanguageSelect = <Code extends string = string>({
  languages,
  value,
  onChange,
  label = 'Language',
  className,
  ...rest
}: TzarLanguageSelectProps<Code>) => {
  const {
    open,
    menuId,
    triggerRef,
    toggle,
    close,
    closeOnEscape,
    closeOnFocusOut,
  } = useDropdown()
  const current = languages.find((lang) => lang.code === value) ?? languages[0]

  const handleSelect = (code: Code) => {
    onChange?.(code)
    close()
  }

  return (
    <div
      {...rest}
      tabIndex={-1}
      onKeyDown={closeOnEscape}
      onBlur={closeOnFocusOut}
      className={twMerge('relative outline-none', className)}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-label={`${label}: ${current.short}`}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={toggle}
        className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium text-secondary hover:bg-main-soft hover:text-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:bg-main-soft"
      >
        <span>{current.short}</span>
        <ChevronDown className="h-3 w-3" aria-hidden="true" />
      </button>

      <menu
        id={menuId}
        hidden={!open}
        className="absolute right-0 z-10 mt-2 w-32 rounded-md border border-border-subtle bg-background py-1 text-xs shadow-md"
      >
        {languages.map((lang) => (
          <li key={lang.code}>
            <button
              type="button"
              aria-current={lang.code === current.code}
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
      </menu>
    </div>
  )
}
