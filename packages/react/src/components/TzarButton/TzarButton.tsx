import { useContext } from 'react'
import { TzarContext, ThemeColorMode2, ThemeActionsType } from '../../provider'
import { TzarButtonProps } from './TzarButton.types'
import './TzarButton.scss'

const TzarButton = (props: TzarButtonProps) => {
  const { theme, setTheme } = useContext(TzarContext)

  const onClick = () => {
    setTheme({
      type: ThemeActionsType.THEME_COLOR_MODE,
      theme:
        theme === ThemeColorMode2.LIGHT
          ? ThemeColorMode2.DARK
          : ThemeColorMode2.LIGHT,
    })
  }

  return (
    <button className="header-button" onClick={onClick}>
      <span>{props.label}</span>
    </button>
  )
}

export default TzarButton
