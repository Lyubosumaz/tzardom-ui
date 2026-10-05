'use client'

import { ChevronDown } from 'lucide-react'
import type { ComponentProps } from 'react'
import { useState } from 'react'
import { TzarDropdown } from '@/generated/components'

export interface TzarLanguage<Code extends string = string> {
  code: Code
  short: string
  label: string
}

export type TzarLanguageSelectProps<Code extends string = string> = Omit<
  ComponentProps<typeof TzarDropdown>,
  'children' | 'open' | 'onOpenChange' | 'onChange'
> & {
  languages: readonly TzarLanguage<Code>[]
  value: Code
  onChange?: (code: Code) => void
}

export const TzarLanguageSelect = <Code extends string = string>({
  languages,
  value,
  onChange,
  className,
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
      open={open}
      onOpenChange={(event) => {
        setOpen(event.detail)
      }}
      className={`relative [&::part(trigger)]:border-0 [&::part(trigger)]:bg-transparent [&::part(trigger)]:[font-family:inherit] [&::part(trigger)]:inline-flex [&::part(trigger)]:items-center [&::part(trigger)]:gap-1 [&::part(trigger)]:rounded-full [&::part(trigger)]:px-2 [&::part(trigger)]:py-1 [&::part(trigger)]:text-xs [&::part(trigger)]:font-medium [&::part(trigger)]:text-secondary [&::part(trigger)]:hover:bg-main-soft [&::part(trigger)]:hover:text-secondary [&::part(trigger)]:transition-colors [&::part(trigger)]:focus-visible:outline-none [&::part(trigger)]:focus-visible:ring-2 [&::part(trigger)]:focus-visible:ring-secondary [&::part(trigger)]:focus-visible:bg-main-soft [&::part(menu)]:absolute [&::part(menu)]:right-0 [&::part(menu)]:z-10 [&::part(menu)]:mt-2 [&::part(menu)]:w-32 [&::part(menu)]:rounded-md [&::part(menu)]:border [&::part(menu)]:border-border-subtle [&::part(menu)]:bg-background [&::part(menu)]:py-1 [&::part(menu)]:text-xs [&::part(menu)]:shadow-md ${className ?? ''}`}
    >
      <span slot="trigger">{current.short}</span>
      <ChevronDown slot="trigger" className="h-3 w-3" aria-hidden="true" />

      {languages.map((lang) => (
        <button
          key={lang.code}
          type="button"
          role="option"
          aria-selected={lang.code === current.code}
          onClick={() => {
            handleSelect(lang.code)
          }}
          className="flex w-full items-center justify-between px-2 py-1 text-left hover:bg-main-soft hover:text-secondary"
        >
          <span>{lang.short}</span>
          <span>{lang.label}</span>
        </button>
      ))}
    </TzarDropdown>
  )
}
