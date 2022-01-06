import React,{useEffect,useState} from 'react'

import { getSong } from 'nhaccuatui-api-full'
import { useSelector } from 'react-redux'


import {useDispatch} from 'react-redux'
import {setPlayingSong, setPlayingPlaylist} from '../../redux/actions/musicAction'
import { removeAddSong,removeSelectSong } from '../../redux/actions/playlistDetailAction'

import Audio from '../../component/MusicPlayer/Audio/Audio'

import MusicPlayingPlayList from '../MusicPlayer/MusicPlayingPlayList/MusicPlayingPlayList'

import './MusicPlayerMobile.scss'

function MusicPlayerMobile() {

    const keySelectSong = useSelector((state)=>state.playlistDetail.selectSong)
    const keyAddSong = useSelector((state)=>state.playlistDetail.addSong)
    const playingSong = useSelector((state)=>state.musicPlayer.playingSong);
    const playingPlaylist = useSelector((state)=>state.musicPlayer.playingPlaylist)
    const [showPlayingList,setShowPlayingList] = useState(false)
    const dispatch = useDispatch();

   
 

    useEffect(()=>{
        const fetchSong = async ()=>{
            const response = await getSong(keySelectSong)
            // console.log('call-api-song',keySelectSong)
            dispatch(setPlayingSong(response.song))
            dispatch(setPlayingPlaylist(response.song))
            dispatch(removeAddSong())
            dispatch(removeSelectSong())
        }
        const object = playingPlaylist.find((item)=>item.key===keySelectSong)
        if(object){
            dispatch(setPlayingSong(object))
        }
        else{
            if(keySelectSong){
                fetchSong()
            }
        }
        
        
    },[keySelectSong,dispatch])
    useEffect(()=>{
        const fetchAddSong = async ()=>{
            const response = await getSong(keyAddSong)
            // console.log('call-api-addSong',keyAddSong)
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
                // console.log('Bài hát này đã bị lỗi')
            }
            
        }
        if(keyAddSong){
            fetchAddSong()
        }
    },[keyAddSong])
    if(playingSong.length <= 0){
        return (
            <div className="music-player-mobile">
                Chưa chọn bài hát
            </div>
        )
    }

    return (
        <div className="music-player-mobile">
            {!showPlayingList === true
                ?''
                :<div className="music-player-mobile__playing-playlist-content">   
                    <MusicPlayingPlayList />
                </div>
            }
            <Audio/>
            <button 
                className="music-player-mobile-change-state"
                onClick={()=>setShowPlayingList(!showPlayingList)}
            >{showPlayingList===true?'Đóng danh sách phát':'Mở danh sách phát'}</button>
        </div>
    )
}

export default MusicPlayerMobile 
