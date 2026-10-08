import type { ComponentPropsWithoutRef } from 'react'

export interface TzarLanguage<Code extends string = string> {
  code: Code
  short: string
  label: string
}

export type TzarLanguageSelectProps<Code extends string = string> = Omit<
  ComponentPropsWithoutRef<'div'>,
  'children' | 'onChange'
> & {
  'data-testid': string
  languages: readonly TzarLanguage<Code>[]
  value: Code
  onChange?: (code: Code) => void
  label?: string
}
