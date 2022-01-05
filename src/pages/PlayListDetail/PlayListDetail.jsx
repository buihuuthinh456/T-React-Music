import React,{useEffect} from 'react'

import { useParams } from 'react-router-dom'

import { useSelector,useDispatch } from 'react-redux'

import { getPlaylistDetail } from 'nhaccuatui-api-full'

import { setPlaylistDetail,removeSelectSong,removeAddSong } from '../../redux/actions/playlistDetailAction'


import './PlayListDetail.scss'


import PlayListDescription from '../../component/PlayListDescription/PlayListDescription'
import ListMusic from '../../component/PlayListDescription/ListMusic'
import ContentLoading from '../../component/ContentLoading/ContentLoading'



function PlayListDetail() {
    const {playlistID} = useParams()
    const dispatch = useDispatch();
    const data = useSelector((state)=>state.playlistDetail.playlist)
   
    useEffect(()=>{
        const fetchPlaylistDetail = async ()=>{
            const reponse = await getPlaylistDetail(playlistID)
            // console.log('call-api',playlistID)
            dispatch(setPlaylistDetail(reponse))
        }
        
        fetchPlaylistDetail()
        return(()=>{
            dispatch(removeSelectSong())
            dispatch(removeAddSong())
        })
    },[playlistID,dispatch])
    useEffect( ()=>{
        window.scrollTo(0,0)
    },[])

    console.log(data)


    if(data.length <= 0) {
        return <ContentLoading/>
    }
    else{
        return (
            <div className="playlist-detail-container">
                <PlayListDescription data={data.playlist} />
                <ListMusic data={data.playlist} />
            </div>
        )
    }
    
}

export default PlayListDetail
