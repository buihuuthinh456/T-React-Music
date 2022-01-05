import React from 'react'
import {useDispatch} from 'react-redux'
import {setSelectSong} from '../../redux/actions/playlistDetailAction'
import { useNavigate } from 'react-router-dom'

import './Top10BaiHat.scss'
function Top10BaiHat(props) {
    const data = props.data
    const navigate = useNavigate()
    const dispatch = useDispatch();
    function findElement(e){
        const element = e.target
        const key = element.closest('.top10-baihat-content__list__item').getAttribute('data-key')
        return key
    }
    console.log(data)
    
    if(typeof data==='undefined'||data.length===0 || !data){
        return(
            <div>Không có dữ liệu</div>
        )
    }

    return (
        <div className="top10-baihat">
                <h3>Bài hát</h3>
                <div className="top10-baihat-content">
                    <ul className="top10-baihat-content__list">
                        {data.map((item,index)=>(
                            <li className="top10-baihat-content__list__item" 
                                key={index}
                                data-key={item.key}
                                onClick={
                                    item.streamUrls.length===0
                                    ?()=>alert('API đã giấu link mp3. Hãy vào những Playlist để nghe. Cảm ơn bạn')
                                    :(e)=>{
                                        dispatch(setSelectSong(findElement(e)))}}
                                data-url={item.streamUrls.length===0?'Not':'Have'}
                            >
                                <div className="top10-baihat-content__list__item__img"
                                    style={{backgroundImage:`url(${item.thumbnail})`}}
                                ></div>
                                <div className="top10-baihat-content__list__item__text">
                                    <h3 className="top10-baihat-content__list__item__text__title">
                                        {item.title}
                                    </h3> 
                                    <p className="top10-baihat-content__list__item__text__singer">
                                        {item.artists[0].name}
                                    </p>
                                </div>
                                <div className="top10-baihat-content__list__item__views">
                                    <i className="fas fa-headphones-alt"></i>
                                    <span>{item.statusViewValue}</span>
                                </div>
                                <div className="top10-baihat-content__list__item__options">
                                    <div className="top10-baihat-content__list__item__options__item"
                                        onClick={(e)=>{
                                            e.stopPropagation();
                                            navigate(`/song/${findElement(e)}`)
                                        }}
                                    >
                                        <i className="fas fa-directions"></i>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
    )
}

export default Top10BaiHat
