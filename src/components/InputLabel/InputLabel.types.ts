import { InputProps } from '../Input/Input.types'

export interface InputLabelProps extends Omit<InputProps, 'value' | 'type'> {
  label: string
  error?: string
  info?: string
  type?: InputProps['type'] | 'multiple-rows'
  value?: InputProps['value'] | Array<string | number>
}
