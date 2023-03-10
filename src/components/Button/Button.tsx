import React, { useCallback } from 'react'
import confetti from 'canvas-confetti';
import { ButtonProps } from './Button.types'
import './Button.scss'

const Button = (props: ButtonProps) => {
    const onClick = useCallback(() => {
        confetti({
            particleCount: 1024,
            spread: 360
        });
    }, []);

    return (
        <button className="button" onClick={onClick}>
            <span>🎉</span>
            <span>{props.label}</span>
        </button>
    )
}

export default Button