import React from 'react'

import './PlayListDescription.scss'

function PlayListDescription(props) {
    const data=props.data;
    return (
        <div className="playlist-detail">
                <div className="playlist-detail__thumbnail">
                    <img src={data.thumbnail} alt={data.title} />
                </div>
                <div className="playlist-detail__information">
                    <div className="playlist-detail__information__title" >
                        <span>{data.type}: </span>{data.title}
                    </div>
                    <div className="playlist-detail__information__artists" >
                        {data.artists.map((item,index)=>(
                            <div className="playlist-detail__information__artists__item" key={index}>
                                <div className="playlist-detail__information__artists__item__avatar">
                                    <img src={item.imageUrl} alt={item.shortLink} />
                                </div>
                                <div className="playlist-detail__information__artists__item__name">
                                    {item.name}
                                </div>
                            </div>
                        ))}
                    </div>
                    {data.dateModify&&
                    <div className="playlist-detail__information__datemodify" >
                        {data.dateModify}
                    </div> }
                    {data.uploadBy&&
                    (<div className="playlist-detail__information__uploadby" >
                        <div className="playlist-detail__information__uploadby__avatar">
                            <img src={data.uploadBy.avatarUrl} alt={data.title}></img>
                        </div>
                        <div className="playlist-detail__information__uploadby__fullname">
                            <span>Tạo bởi: </span>{data.uploadBy.fullName}
                        </div>
                    </div>)}
                    {data.listTag&&(
                    <ul className="playlist-detail__information__tags" >
                        <span>Tags:</span>
                        {data.listTag.length > 0 ? data.listTag.map((item,index)=>
                            (<li key={index}>{item.name}</li>)
                        ):<li>Chưa xác định</li>}
                    </ul>  
                    )}
                </div>
            </div>
    )
}

export default PlayListDescription
