import { InputHTMLAttributes } from 'react'

export interface InputProps {
  id: string
  value?: string | number | boolean
  type?: InputHTMLAttributes<HTMLInputElement>['type']
  readOnly?: boolean
  required?: boolean
}
