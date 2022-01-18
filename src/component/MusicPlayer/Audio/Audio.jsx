import React,{useRef,useEffect,useState} from 'react'

import {useSelector,useDispatch} from 'react-redux'

import {nextSong,prevSong,setPlayingSong } from '../../../redux/actions/musicAction'

import yourSmileMp3 from '../../../assets/music/YourSmileLive.mp3'


import './Audio.scss'

function Audio(){
    
    const [valueVolume,setValueVolume] = useState(100)
    const [isRepeat,setIsRepeat] = useState(false)
    const [isRandom,setIsRandom] = useState(false)
    const playingPlaylist = useSelector((state)=>state.musicPlayer.playingPlaylist)
    const playingSong = useSelector((state)=>state.musicPlayer.playingSong);
    const dispatch = useDispatch();
    
  
    const audio = useRef(null);
    const timeCurrent = useRef(null);
    const timeProgress = useRef(null);
    const timeDuration = useRef(null);
    const volumeProgress = useRef(null);

    const playBtn = useRef(null);
    const randomBtn = useRef(null);
    const repeatBtn = useRef(null);
    const handle = {
        isPlaying:true,
        isRandom:isRandom,
        isRepeat:isRepeat,
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
            // Khi endSong
            audio.current.onended = ()=>{
                if(this.isRepeat){
                    audio.current.play()
                }
                else{
                    if(isRandom){
                        this.randomSong()
                    }
                    else{
                        dispatch(nextSong(playingSong))
                    }
                }
            }
            // Khi thay doi volume
            volumeProgress.current.oninput = (e)=>{
                const seekVolume = e.target.value/100;
                setValueVolume(seekVolume*100)
                audio.current.volume = seekVolume;
     
            }
            // Khi isRepeat
            if(this.isRepeat){
                repeatBtn.current.childNodes[0].classList.add('main-color')
              
            }
            else{
                repeatBtn.current.childNodes[0].classList.remove('main-color')
            }
            // Khi isRandom
            if(this.isRandom){
                randomBtn.current.childNodes[0].classList.add('main-color')
            }
            else{
                randomBtn.current.childNodes[0].classList.remove('main-color')
            }
            

        },
        randomSong(){
            let newIndex
            do {
                newIndex = Math.floor(Math.random()*playingPlaylist.length);
            }while(playingPlaylist[newIndex].key===playingSong.key);
            dispatch(setPlayingSong(playingPlaylist[newIndex]))
        },
        start(){
            this.handleEvent();
        }
    }
    useEffect(()=>{
        handle.start()
    },[playingPlaylist.length,playingSong.key,handle.isRepeat,handle.isRandom,handle])
    useEffect(()=>{
        audio.current.play();
        handle.isPlaying = true;
    },[playingSong.key])
  

    if(playingSong.length === 0) return (<div>Nothing</div>)

    return(
        <div className="music-player-controls" >
            <audio 
                src={playingSong.streamUrls.length > 0 && playingSong.streamUrls[0].streamUrl!='custom' 
                    ?playingSong.streamUrls[0].streamUrl
                    :playingSong.streamUrls[0].streamUrl=='custom'
                    ?yourSmileMp3
                    :''} 
                ref={audio}
                className="music-player-controls__audio"
            >
            </audio>
            <div className="music-player-controls__volume" >
                <i className="fas fa-volume-up"></i>
                <div className="music-player-controls__volume__input">
                    <input type="range" min='0' max='100' value={valueVolume} ref={volumeProgress}/>
                </div>
            </div>
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
                    {playingSong.duration}
                </div>
            </div>
            <div className="music-player-controls__buttons">
                <div className="music-player-controls__buttons__item" 
                    ref={randomBtn}
                    onClick={()=>{setIsRandom(!isRandom)}}
                >
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
                                console.log(handle.isPlaying)
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
                <div className="music-player-controls__buttons__item" 
                    onClick={()=>{ 
                        if(isRandom){
                            handle.randomSong()
                        }
                        else{
                            dispatch(nextSong(playingSong))
                        }
                        // dispatch(setPlayingSong(playingPlaylist.find((item,index)=>item.key !== playingSong.key )))
                      
                    }}
                >
                    <i className="fas fa-step-forward"></i>
                </div>
                <div className="music-player-controls__buttons__item" 
                    ref={repeatBtn} 
                    onClick={()=>{
                        setIsRepeat(!isRepeat)
                    }}
                >
                    <i className='fas fa-undo'></i>
                </div>
            </div>
        </div>
    )
}

export default Audio
