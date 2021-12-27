import React from 'react'
function MusicPlaying(props) {
    const playingSong = props.playingSong
    return (
        <div className="music-player-playing">
            <div className="music-player-playing__thumnail">
                {<img src={playingSong.thumbnail} alt={playingSong.title} />}
            </div>
            <div className="music-player-playing__title">
                <p>Bài hát: { playingSong.title }</p>
            </div>
            <div className="music-player-playing__singer">
                {playingSong.artists.map((item,index)=>{
                    if(index===playingSong.artists.length-1){
                        return <span key={index}>{item.name}</span>
                    }
                    else{
                        return <span key={index}>{item.name},</span>
                    }
                }) }
            </div>
        </div>
    )
}

export default MusicPlaying
