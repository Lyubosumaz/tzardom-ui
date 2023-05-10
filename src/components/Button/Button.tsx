import React, { useContext } from 'react'
import { TzarContext, ColorMode, ThemeActionsType } from '../../provider'
import './Button.scss'
import { ButtonProps } from './Button.types'

const Button = (props: ButtonProps) => {
  const { theme, setTheme } = useContext(TzarContext)

  const onClick = () => {
    setTheme({
      type: ThemeActionsType.THEME_COLOR_MODE,
      theme: theme === ColorMode.LIGHT ? ColorMode.DARK : ColorMode.LIGHT,
    })
  }

  return (
    <button className="primary-button" onClick={onClick}>
      <span>{props.label}</span>
    </button>
  )
}

export default Button
