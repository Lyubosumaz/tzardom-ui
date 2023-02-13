import confetti from 'canvas-confetti';
import React, { useContext } from 'react';
import { TzarContext, ThemeColorMode2, ThemeActionsType} from '../../provider'
import './Button.scss';
import { ButtonProps } from './Button.types';

const Button = (props: ButtonProps) => {
    const { theme, setTheme } = useContext(TzarContext)

    const onClick = () => {
        setTheme({
            type: ThemeActionsType.THEME_COLOR_MODE,
            theme: theme === ThemeColorMode2.LIGHT ? ThemeColorMode2.DARK: ThemeColorMode2.LIGHT
        });

        confetti({
            particleCount: 1024,
            spread: 360
        });
    };

    return (
        <button className="button" onClick={onClick}>
            <div>|4|</div>
            <span>🎉</span>
            <span>{props.label}</span>
        </button>
    )
}

export default Button