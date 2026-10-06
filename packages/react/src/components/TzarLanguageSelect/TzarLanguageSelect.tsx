'use client'

import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { TzarDropdown } from '@/generated/components'
import type { TzarLanguageSelectProps } from './TzarLanguageSelect.types'

export const TzarLanguageSelect = <Code extends string = string>({
  languages,
  value,
  onChange,
  label = 'Language',
  ...rest
}: TzarLanguageSelectProps<Code>) => {
  const [open, setOpen] = useState(false)
  const current = languages.find((lang) => lang.code === value) ?? languages[0]

  const handleSelect = (code: Code) => {
    onChange?.(code)
    setOpen(false)
  }

  return (
    <TzarDropdown
      {...rest}
      label={`${label}: ${current.short}`}
      open={open}
      onOpenChange={(event) => {
        setOpen(event.detail)
      }}
    >
      <span slot="trigger">{current.short}</span>
      <ChevronDown slot="trigger" className="h-3 w-3" aria-hidden="true" />

      <ul>
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
      </ul>
    </TzarDropdown>
  )
}
