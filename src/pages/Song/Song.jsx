import React,{useEffect,useRef,useState} from 'react'

import { useParams } from 'react-router-dom'

import { useDispatch,useSelector } from 'react-redux'

import { getSong,getLyric } from 'nhaccuatui-api-full'

import {setSong,setSongLyric} from '../../redux/actions/songPageAction'
import {setPlayingSong} from '../../redux/actions/musicAction'

import PlayListDescription from '../../component/PlayListDescription/PlayListDescription'

import ContentLoading from '../../component/ContentLoading/ContentLoading'

import Button from '../../component/Button/Button'


import './Song.scss'

function Song() {
    const {songID} = useParams()
    const dispatch = useDispatch();
    const song = useSelector((state)=>state.songPage.song)
    const lyric = useSelector((state)=>state.songPage.lyric)

    const lyricContent = useRef(null)
    const [full,setFull] = useState(false)

    function renderLyric(data){
        const lyric = data.split('<br />');
        return lyric.map((item,index)=>(
            <React.Fragment key={index}>
                {item}<br/>
            </React.Fragment>
        ))
    }


    useEffect(()=>{
        const fetchSong = async ()=>{
            const data = await getSong(songID)
            dispatch(setSong(data.song))
        }
        const fetchSongLyric = async ()=>{
            const data = await getLyric(songID)
            dispatch(setSongLyric(data.lyric))
          
        }
        fetchSong()
        fetchSongLyric()
        
    },[songID])

    useEffect(()=>{
        window.scrollTo(0,0)
    },[])


    if(song.length===0) return <ContentLoading/>
    

    return (
        <div className="container">
            <PlayListDescription data={song} /> 
            <div className="song-lyric">
                <h3 className="song-lyric__title">Lời bài hát</h3>
                <p className="song-lyric__content" ref={lyricContent} >
                     {(lyric.length!==0 && lyric.lyric.length!==0)?renderLyric(lyric.lyric):'Chưa có dữ liệu'}
                </p>
                <div className="song-lyric__btns">
                    <Button 
                        className='btn-small'
                        onClick={()=>{
                            if(full){
                                lyricContent.current.style.webkitLineClamp=10;
                                setFull(full=>full=!full)
                            }
                            else{
                                lyricContent.current.style.webkitLineClamp='unset';
                                setFull(full=>full=!full)
                            }
                        }}
                    >{full?'Thu gọn':'Xem thêm'}</Button>
                    <Button 
                        className='btn-small'
                        onClick={()=>{
                            if(song.streamUrls.length===0){
                                alert('Bài hát này không được hỗ trợ. Vì nhaccuatui giấu link mp3. I am sorry :D')
                            }
                            else{
                                dispatch(setPlayingSong(song))
                            }
                        }}
                    >Phát bài nhạc này</Button>
                </div>
            </div>
        </div>
    )
}

export default Song
