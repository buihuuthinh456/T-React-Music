import React from 'react'

import './Card.scss'

function Card(props) {

    const src = props.thumbnail;
    const title = props.title;


    return (
        <div className="card-item">
            <div className="card-item__img">
                <img src={src} alt={title}/>
                <div className="card-item-overlay">
                    <div className="card-item-overlay__box-icon">
                        <i className="far fa-play-circle"></i>
                    </div>
                </div>
            </div>
            <div className="card-item__title">
                {title}
            </div>
        </div>
    )
}

export default Card
