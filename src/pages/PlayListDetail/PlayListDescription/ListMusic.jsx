import React from 'react'

import {useDispatch} from 'react-redux'

import { setSelectSong,setAddSong } from '../../../redux/actions/playlistDetailAction'




function ListMusic(props) {

    const dispatch = useDispatch();
    const data=props.data


    function findElement(e){
        const element = e.target
        const key = element.closest('.playlist-music__list__item').getAttribute('data-key')
        return key
    }
    return (
        <div className="playlist-music">
            <div className="playlist-music__title">
                <h3>Danh sách bài hát</h3>
            </div>
            <ul className="playlist-music__list">
                <li className="playlist-music__list__item">
                    <div className="playlist-music__list__item__name">
                        TIÊU ĐỀ
                    </div>
                    <div className="playlist-music__list__item__singer">
                        NGHỆ SỸ
                    </div>
                    <div className="playlist-music__list__item__views">
                        LƯỢT NGHE
                    </div>
                    <div className="playlist-music__list__item__duration">
                        THỜI GIAN
                    </div>
                </li>
                {
                    data.songs.map((item,index)=>(
                        <li 
                            className="playlist-music__list__item" 
                            key={index} data-key={item.key} 
                            onClick={(e)=>{dispatch(setSelectSong(findElement(e)))}}
                        >
                            <div className="playlist-music__list__item__name">
                                {item.title}
                            </div>
                            <div className="playlist-music__list__item__singer">
                                {item.artists.reduce((arr,current)=>{
                                    arr.push(current.name)
                                    return arr
                                },[]).join(', ')}
                            </div>
                            <div className="playlist-music__list__item__views">
                                {item.statusViewValue}
                            </div>
                            <div className="playlist-music__list__item__duration">
                                {item.duration}
                            </div>
                            <span className="playlist-music__list__item__add" 
                                onClick={(e)=>{
                                    dispatch(setAddSong(findElement(e)));
                                    e.stopPropagation();
                                }}
                            >
                                <i className="fas fa-music"></i>
                            </span>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default ListMusic
