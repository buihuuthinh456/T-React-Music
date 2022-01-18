import React from 'react'

import {useDispatch} from 'react-redux'
import {setPlayingSong,slicePlayingPlaylist} from '../../../redux/actions/musicAction'
import {useSelector} from 'react-redux'


import yourSmileThumnail from '../../../assets/thumnail/YourSmile.jpg'
import './MusicPlayingPlayList.scss'

function MusicPlayingPlayList() {
    const playingSong = useSelector((state)=>state.musicPlayer.playingSong);
    const playingPlaylist = useSelector((state)=>state.musicPlayer.playingPlaylist)
    const dispatch = useDispatch();

    function findElement(e,selector){
        const element = e.target
        const key = element.closest(selector).getAttribute('data-key')
        return key
    }

    function findMusic(e,selector){
        const music = playingPlaylist.find(item => item.key === findElement(e,selector))
        return music
    }

    return (
        <ul className="music-player-playlist">
            <li className="music-player-playlist__playing">
                <div className="music-player-playlist__playing__img">
                    <img src={playingSong.thumbnail=='custom'?yourSmileThumnail:playingSong.thumbnail} alt={playingSong.title} />
                </div>
                <div className="music-player-playlist__playing__text">
                    <div className="music-player-playlist__playing__text__title">
                        { playingSong.title }
                    </div>
                    <div className="music-player-playlist__playing__text__singer">
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
            </li>
            <h3 className="music-player-playlist-title">Danh sách phát</h3>
            {playingPlaylist.map((item,index)=>{
                if(item.key !== playingSong.key){
                    return (
                        <li className="music-player-playlist__playing" key={index}
                            data-key={item.key}
                            onClick={(e)=>{
                                dispatch(setPlayingSong(findMusic(e,'.music-player-playlist__playing')))
                            }}
                        >
                            <div className="music-player-playlist__playing__img">
                                <img src={item.thumbnail=='custom'?yourSmileThumnail:item.thumbnail} alt={item.title} />
                            </div>
                            <div className="music-player-playlist__playing__text">
                                <div className="music-player-playlist__playing__text__title">
                                    { item.title }
                                </div>
                                <div className="music-player-playlist__playing__text__singer">
                                    {item.artists.length > 0 ? item.artists.map((object,index)=>{
                                        if(index===item.artists.length-1){
                                            return <span key={index}>{object.name}</span>
                                        }
                                        else{
                                            return <span key={index}>{object.name},</span>
                                        }
                                    }) :'Không xác định'}
                                </div>
                            </div>
                            <div className="music-player-playlist__playing__options">
                                <i className="fas fa-trash-alt music-player-playlist__playing__options__item"
                                    onClick={(e)=>{
                                        dispatch(slicePlayingPlaylist(findMusic(e,'.music-player-playlist__playing')))
                                        e.stopPropagation()
                                    }}
                                ></i>
                            </div>
                        </li>
                    )
                }
                else{
                    return ''
                }
            })}
        </ul>
    )
}

export default MusicPlayingPlayList
