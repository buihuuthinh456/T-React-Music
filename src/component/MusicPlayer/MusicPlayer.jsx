import React,{useEffect} from 'react'

import { getSong } from 'nhaccuatui-api-full'
import { useSelector } from 'react-redux'


import {useDispatch} from 'react-redux'
import {setPlayingSong, setPlayingPlaylist,slicePlayingPlaylist} from '../../redux/actions/musicAction'
import { removeAddSong } from '../../redux/actions/playlistDetailAction'


import Audio from './Audio/Audio'
import MusicPlaying from './MusicPlaying/MusicPlaying'

import './MusicPlayer.scss'

function MusicPlayer() {
    const keySelectSong = useSelector((state)=>state.playlistDetail.selectSong)
    const keyAddSong = useSelector((state)=>state.playlistDetail.addSong)

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
 

    useEffect(()=>{
        const fetchSong = async ()=>{
            const response = await getSong(keySelectSong)
            console.log('call-api-song',keySelectSong)
            dispatch(setPlayingSong(response.song))
            dispatch(setPlayingPlaylist(response.song))
            dispatch(removeAddSong())
        }
        const object = playingPlaylist.find((item)=>item.key===keySelectSong)
        if(object){
            dispatch(setPlayingSong(object))
        }
        else{
            if(keySelectSong){
                fetchSong()
            }
            console.log('khong co')
        }
        
        
    },[keySelectSong,dispatch])
    useEffect(()=>{
        const fetchAddSong = async ()=>{
            const response = await getSong(keyAddSong)
            console.log('call-api-addSong',keyAddSong)
            if(typeof response.song !== 'undefined')
            {
                dispatch(setPlayingPlaylist(response.song))
                if(playingSong.length===0){
                    dispatch(setPlayingSong(response.song))
                }
                dispatch(removeAddSong())
            }
            else{
                dispatch(removeAddSong())
                alert('Bài hát này đã bị lỗi')
            }
            
        }
        if(keyAddSong){
            fetchAddSong()
        }
    },[keyAddSong])
    if(playingSong.length <= 0){
        return (
            <div className="music-player-container">
                Music Player - Non Active
            </div>
        )
    } 
    return (
        <div className="music-player-container" >
            {console.log('re-render')}
            <div className="music-player-content">
                {/* <MusicPlaying playingSong={playingSong} /> */}
                <ul className="music-player-playlist">
                    <li className="music-player-playlist__playing">
                        <div className="music-player-playlist__playing__img">
                            <img src={playingSong.thumbnail} alt={playingSong.title} />
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
                    <h3>Danh sách phát</h3>
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
                                        <img src={item.thumbnail} alt={item.title} />
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
            </div>
            <Audio />
        </div>
    )
}

export default MusicPlayer
