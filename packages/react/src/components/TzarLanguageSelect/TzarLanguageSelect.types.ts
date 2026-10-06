import type { ComponentProps } from 'react'
import type { TzarDropdown } from '@/generated/components'

export interface TzarLanguage<Code extends string = string> {
  code: Code
  short: string
  label: string
}

export type TzarLanguageSelectProps<Code extends string = string> = Omit<
  ComponentProps<typeof TzarDropdown>,
  'children' | 'open' | 'onOpenChange' | 'onChange' | 'label'
> & {
  languages: readonly TzarLanguage<Code>[]
  value: Code
  onChange?: (code: Code) => void
  label?: string
}
