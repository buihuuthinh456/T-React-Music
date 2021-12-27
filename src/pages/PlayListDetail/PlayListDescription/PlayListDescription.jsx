import React from 'react'

function PlayListDescription(props) {
    const data=props.data;
    return (
        <div className="playlist-detail">
                <div className="playlist-detail__thumbnail">
                    <img src={data.thumbnail} alt={data.title} />
                </div>
                <div className="playlist-detail__information">
                    <div className="playlist-detail__information__title" >
                        <span>Playlist: </span>{data.title}
                    </div>
                    <div className="playlist-detail__information__artists" >
                        {data.artists.map((item,index)=>(
                            <React.Fragment key={index}>
                                <div className="playlist-detail__information__artists__avatar">
                                    <img src={item.imageUrl} alt={item.shortLink} />
                                </div>
                                <div className="playlist-detail__information__artists__name">
                                    {item.name}
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                    <div className="playlist-detail__information__datemodify" >
                        {data.dateModify}
                    </div> 
                    <div className="playlist-detail__information__uploadby" >
                        <div className="playlist-detail__information__uploadby__avatar">
                            <img src={data.uploadBy.avatarUrl} alt={data.title}></img>
                        </div>
                        <div className="playlist-detail__information__uploadby__fullname">
                            <span>Tạo bởi: </span>{data.uploadBy.fullName}
                        </div>
                    </div> 
                    <ul className="playlist-detail__information__tags" >
                        <span>Tags:</span>
                        {data.listTag.length > 0 ? data.listTag.map((item,index)=>
                            (<li key={index}>{item.name}</li>)
                        ):<li>Chưa xác định</li>}
                    </ul>  
                </div>
            </div>
    )
}

export default PlayListDescription
