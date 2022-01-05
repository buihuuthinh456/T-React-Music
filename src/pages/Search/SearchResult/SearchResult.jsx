import React,{useEffect,useState} from 'react'

import {useSelector} from 'react-redux'

import  CardList  from '../../../component/CardList/CardList'

import './SearchResult.scss'
function SearchResult() {
    const result = useSelector(state=>state.search.searchResult)

    const [resultPlaylist,setResultPlaylist] = useState([])
   
    useEffect(()=>{
        if(result.length!==0){
            setResultPlaylist(result.search.playlist.playlist)
        }
    },[result])
    if(result.length === 0) return (<div>Chưa có kết quả tìm kiếm</div>)
    if(result.status==='error') return (<div>Lỗi không thể tìm kiếm</div>)

    return (
        <div className="search-result">
            {console.log('re-render')}
            <div className="card-container">
                <CardList name={'Playlist đề xuất'} listPlaylist={resultPlaylist} type='playlist'/>
            </div>
        </div>
    )
}

export default SearchResult
