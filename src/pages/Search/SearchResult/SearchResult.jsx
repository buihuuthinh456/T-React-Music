import React,{useEffect,useState} from 'react'

import {useSelector} from 'react-redux'

import  CardList  from '../../../component/CardList/CardList'

import './SearchResult.scss'
function SearchResult() {
    const result = useSelector(state=>state.search.searchResult)

    const [resultPlaylist,setResultPlaylist] = useState([])
    const [resultPlaylistRecommend,setResultPlaylistRecommend] = useState([])
    const [resultSongRecommend,setResultSongRecommend] = useState([])

    useEffect(()=>{
        if(result.length!==0){
            setResultPlaylist(result.search.playlist.playlist)
            setResultPlaylistRecommend(result.recommend.playlist)
            setResultSongRecommend(result.recommend.song)
        }
    },[result])
    if(result.length === 0) return (<div>Chưa có kết quả tìm kiếm</div>)
    if(result.status==='error') return (<div>Lỗi không thể tìm kiếm</div>)

    return (
        <div className="search-result">
            {console.log('re-render')}
            <div className="card-container">
                {resultPlaylistRecommend&&<CardList name={'Playlist đề xuất'} listPlaylist={resultPlaylistRecommend} type='playlist'/>}
                {resultPlaylist&&<CardList name={'Playlist liên quan'} listPlaylist={resultPlaylist} type='playlist'/>}
                {resultSongRecommend&&<CardList name={'Bài Hát liên quan'} listPlaylist={resultSongRecommend} type='song'/>}
            </div>
        </div>
    )
}

export default SearchResult
