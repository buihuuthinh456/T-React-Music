import React,{useEffect} from 'react'

import {getVideoDetail} from 'nhaccuatui-api-full'

import { useSelector, useDispatch } from 'react-redux'

import {setVideo} from '../../redux/actions/videoPage'

import {useParams} from 'react-router-dom'

import ContentLoading from '../../component/ContentLoading/ContentLoading'

import Video from '../../component/Video/Video'

import PlayListDescription from '../../component/PlayListDescription/PlayListDescription'

import './MV.scss'
function MV() {

    const {mvID} = useParams();
    const dispatch = useDispatch();
    const video = useSelector((state)=>state.videoPage.video)

    useEffect(()=>{
        const fetchVideo = async ()=>{
            const data = await getVideoDetail(mvID)
            if(data.status==='success'){
                dispatch(setVideo(data.video))
            }
            else{

            }
        }
        fetchVideo()

    },[mvID])
    

    useEffect( ()=>{
        window.scrollTo(0,0);
    },[])


    if(video.length===0) return <ContentLoading/>

    return (
        <div className="container video-container">
            {video.streamUrls.length>0
                ?<Video src={video.streamUrls[0].streamUrl}/>
                :<img className="thumbnail" src={video.thumbnail} 

            />}
            <div className="video-infor">
                <PlayListDescription data={video}/>
            </div>
        </div>
    )
}

export default MV
