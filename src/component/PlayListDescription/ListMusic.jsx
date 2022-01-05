import React from 'react'

import {useDispatch} from 'react-redux'

import {useNavigate} from 'react-router-dom'

import { setSelectSong,setAddSong } from '../../redux/actions/playlistDetailAction'

import './ListMusic.scss'


function ListMusic(props) {

    const dispatch = useDispatch();
    const data=props.data

    const navigate = useNavigate()


    function findElement(e){
        const element = e.target
        const key = element.closest('.playlist-music__list__item').getAttribute('data-key')
        return key
    }
    if(data.length===0) {
        return(
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
                </ul>
            </div>
        )
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
                    <div className="playlist-music__list__item__options">
                        
                    </div>
                </li>
                {   data.songs&&
                    data.songs.map((item,index)=>(
                        <li 
                            className="playlist-music__list__item" 
                            key={index} data-key={item.key} 
                            onClick={
                                item.streamUrls.length===0
                                ?()=>alert('Bài nhạc này bị lỗi. Bạn vui lòng chọn bài khác')
                                :(e)=>{
                                    dispatch(setSelectSong(findElement(e)))}}
                            data-url={item.streamUrls.length===0?'Not':'Have'}
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
                            <div className="playlist-music__list__item__options">
                                <div className="playlist-music__list__item__options__item"
                                    onClick={
                                        item.streamUrls.length===0
                                        ?(e)=>{
                                            e.stopPropagation();
                                            alert('Bài nhạc này bị lỗi. Bạn vui lòng chọn bài khác')}
                                        :(e)=>{
                                        e.stopPropagation();
                                        dispatch(setAddSong(findElement(e)));
                                    }}
                                >
                                    <i className="fas fa-music"></i><span>Nhấn vào đây để thêm vào danh sách phát</span>
                                </div>
                                <div className="playlist-music__list__item__options__item"
                                    onClick={(e)=>{
                                        e.stopPropagation();
                                        navigate(`/song/${findElement(e)}`)
                                    }}
                                >
                                    <i className="fas fa-directions"></i><span>Nhấn vào đây để xem chi tiết bài hát</span>
                                </div>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default ListMusic
