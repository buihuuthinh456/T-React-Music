import React,{useEffect,useState} from 'react'

import { getSong } from 'nhaccuatui-api-full'
import { useSelector } from 'react-redux'


import {useDispatch} from 'react-redux'
import {setPlayingSong, setPlayingPlaylist} from '../../redux/actions/musicAction'
import { removeAddSong,removeSelectSong } from '../../redux/actions/playlistDetailAction'


import Audio from './Audio/Audio'
import MusicPlaying from './MusicPlaying/MusicPlaying'
import MusicPlayingPlayList from './MusicPlayingPlayList/MusicPlayingPlayList'

import './MusicPlayer.scss'

function MusicPlayer() {
    const keySelectSong = useSelector((state)=>state.playlistDetail.selectSong)
    const keyAddSong = useSelector((state)=>state.playlistDetail.addSong)
    const playingSong = useSelector((state)=>state.musicPlayer.playingSong);
    const playingPlaylist = useSelector((state)=>state.musicPlayer.playingPlaylist)
    const [showPlayingList,setShowPlayingList] = useState(false)
    const dispatch = useDispatch();

    useEffect(()=>{
        const initPlayingSong = {
            key:"buihuuthinh_InitPlayingSong",
            title:"Your Smile - Live",
            thumbnail:'custom',
            artists:[{
                name:'Obito'
            },{
                name:'HnhNgan'
            }],
            streamUrls:[{
                streamUrl:'custom',
            }],
            duration:'3:22',
        }
        dispatch(setPlayingSong(initPlayingSong))
        dispatch(setPlayingPlaylist(initPlayingSong))

        console.log(initPlayingSong)
    },[])
   
 

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
            <div className="music-player-container">
                Chưa chọn bài hát
            </div>
        )
    } 
    return (
        <div className="music-player-container" >
            {/* {console.log('re-render')} */}
            <div className="music-player-content">
                {
                    !showPlayingList === true
                    ?<MusicPlaying />
                    :<MusicPlayingPlayList />
                }
            </div>
            <button 
                className="music-player-change-state"
                onClick={()=>setShowPlayingList(!showPlayingList)}
            >{showPlayingList===true?'Đang phát':'Danh sách phát'}</button>
            <Audio />
        </div>
    )
}

export default MusicPlayer
