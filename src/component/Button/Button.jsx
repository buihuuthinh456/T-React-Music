import React from 'react'

import './Button.scss'

function Button(props) {
    return (
        <button
            className={`${props.type||'btn-outline'} ${props.className}`}
            onClick={props.onClick ? ()=>props.onClick() : null}
        >
            {props.children}
        </button>
    )
}



export default Button

