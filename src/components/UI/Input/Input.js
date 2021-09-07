import React from 'react'
import styles from './Input.module.css'

const Input = React.forwardRef(({label, input}, ref) => {
    return (
        <div className={styles.input}>
            <label htmlFor={input.id}>{label}</label>
            <input  ref={ref} {...input}/>
        </div>
    )
})

Input.defaultProps = {
    input : {
        type: 'text',
        id:''
    },
    label: 'Input Field'
    
}

export default Input
