import Input from '../Input'
import { InputProps } from '../Input/Input.types'
import { InputLabelProps } from './InputLabel.types'

const InputLabel = ({
  label,
  error,
  info,
  value,
  ...inputProps
}: InputLabelProps) => {
  return (
    <p className="input-label">
      <label htmlFor={inputProps.id}>{label}</label>
      {inputProps.type === 'multiple-rows' ? (
        <>
          {(value as Array<string | number>).map((element) => (
            <Input
              key={element}
              value={element}
              {...(inputProps as Omit<InputProps, 'value'>)}
            />
          ))}
        </>
      ) : (
        <Input
          value={value as InputProps['value']}
          {...(inputProps as Omit<InputProps, 'value'>)}
        />
      )}
      {error && <span className="input-label__error">{error}</span>}
      {info && <span className="input-label__info">{info}</span>}
    </p>
  )
}

export default InputLabel
