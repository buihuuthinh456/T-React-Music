import React,{useRef,useEffect} from 'react'

import {useSelector,useDispatch} from 'react-redux'


import { setPlayingSong,nextSong,prevSong } from '../../../redux/actions/musicAction'

function Audio(){
    
    const playingPlaylist = useSelector((state)=>state.musicPlayer.playingPlaylist)
    const playingSong = useSelector((state)=>state.musicPlayer.playingSong);
    const dispatch = useDispatch();
    
  
    const audio = useRef(null);
    const timeCurrent = useRef(null);
    const timeProgress = useRef(null);
    const timeDuration = useRef(null);

    const playBtn = useRef(null);
    const nextBtn = useRef(null);
    const handle = {
        isPlaying:false,
        isRandom:false,
        isRepeat:false,
        handleEvent(){
            // Khi thời gian update
            audio.current.ontimeupdate = ()=>{
                if(audio.current.duration){
                    const progressPercent = Math.floor((audio.current.currentTime / audio.current.duration * 100));
                    const minutes = Math.floor(audio.current.currentTime/60);
                    const seconds = Math.floor(audio.current.currentTime-minutes*60);
                    timeProgress.current.value = progressPercent;
                    timeCurrent.current.innerHTML = `0${minutes}:${seconds>=10?seconds:"0"+seconds}`
                }
            }
        
            // Khi tua 
            timeProgress.current.oninput = (e)=>{
                const seekTime = e.target.value/100 * audio.current.duration;
                audio.current.currentTime = seekTime;
            }
            // Khi nhac dang playing
            audio.current.onplay = ()=>{
                playBtn.current.childNodes[0].classList.remove('fas','fa-play')
                playBtn.current.childNodes[0].classList.add('fas','fa-pause')
               
            }
             // Khi nhac dang pause
             audio.current.onpause = ()=>{
                 playBtn.current.childNodes[0].classList.remove('fas','fa-pause')
                playBtn.current.childNodes[0].classList.add('fas','fa-play')
               
            }
        },
        start(){
            this.handleEvent();
        }
    }
     


    useEffect(()=>{
        console.log(audio)
        handle.start()
    },[playingPlaylist.length,playingSong.key])
    useEffect(()=>{
        audio.current.play();
        handle.isPlaying = true;
    },[playingSong.key])
  

    if(playingSong.length === 0) return (<div>Nothing</div>)

    return(
        <div className="music-player-controls" >
            <audio 
                src={playingSong.streamUrls.length > 0 ? playingSong.streamUrls[0].streamUrl:''} 
                ref={audio}
                className="music-player-controls__audio"
            ></audio>
            <div className="music-player-controls__time">
                <div 
                    className="music-player-controls__time__current" 
                    ref={timeCurrent}
                >
                    00:00
                </div>
                <div className="music-player-controls__time__progress" >
                    <input type="range" min='0' max='100' ref={timeProgress} />
                </div>
                <div className="music-player-controls__time__duration" ref={timeDuration}>
                    4:18
                </div>
            </div>
            <div className="music-player-controls__buttons">
                <div className="music-player-controls__buttons__item">
                    <i className="fas fa-random"></i>
                </div>
                <div className="music-player-controls__buttons__item"
                    onClick={()=>{ 
                        dispatch(prevSong(playingSong))
                    }}
                >
                    <i className="fas fa-step-backward"></i>
                </div>
                <div className="music-player-controls__buttons__item center" ref={playBtn}
                    onClick = {()=>{
                        console.log(audio.current.currentSrc)
                        if(audio.current.currentSrc){
                            if(handle.isPlaying){
                                audio.current.pause();
                            }
                            else{
                                audio.current.play();
                            }
                            handle.isPlaying = !handle.isPlaying
                        }
                        else{
                            console.log('Bài hát này đang bị lỗi')
                        }
                    }}
                >
                    <i className="fas fa-play"></i>
                </div>
                <div className="music-player-controls__buttons__item" ref={nextBtn}
                    onClick={()=>{ 
                      
                        dispatch(nextSong(playingSong))
                        // dispatch(setPlayingSong(playingPlaylist.find((item,index)=>item.key !== playingSong.key )))
                      
                    }}
                >
                    <i className="fas fa-step-forward"></i>
                </div>
                <div className="music-player-controls__buttons__item">
                    <i className="fas fa-undo"></i>
                </div>
               
            </div>
        </div>
    )
}

export default Audio
