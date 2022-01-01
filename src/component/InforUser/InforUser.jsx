import React from 'react'

import './InforUser.scss'

function InforUser(props) {
    const data = props.data
    return (
        <div className="inforuser">
            <img src={data.src} alt={data.name} className="inforuser__image" />
            <div className="inforuser__name">{data.name}</div>
        </div>
    )
}

export default InforUser
