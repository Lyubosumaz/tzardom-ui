import Input from '../Input'
import React from 'react'

const InputLabel = ({ label, error, info, value, ...inputProps }: any) => {
  return (
    <p className="input-label">
      <label htmlFor={inputProps.id}>{label}</label>
      {inputProps.type === 'multiple-rows' ? (
        <>
          {value.map((element: any) => (
            <Input key={element} value={element} {...inputProps} />
          ))}
        </>
      ) : (
        <Input value={value} {...inputProps} />
      )}
    </p>
  )
}

export default InputLabel
