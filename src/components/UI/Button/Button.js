import React from 'react'
import styles from './Button.module.css'

const Button = ({type, title , onClick}) => {
    return (
        <button type={type} onClick={onClick} className={styles.button}>
            {title}
        </button>
    )
}

Button.defaultProps = {
    type: 'button',
    onClick : () => {},
    title : 'Button'
}

export default Button
