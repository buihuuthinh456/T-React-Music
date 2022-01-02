import React from 'react'

import {Link} from 'react-router-dom'
import './Card.scss'

function Card(props) {

    const thumbnail = props.thumbnail;
    const title = props.title;
    const type=props.type;
    const key=props.dataKey;

    return (
        <Link to={`/${type}/${key}`}>
            <div className="card-item">
                <div className="card-item__img">
                    <img src={thumbnail} alt={title}/>
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
        </Link>
    )
}

export default Card
