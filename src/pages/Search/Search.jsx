import React,{useEffect,useRef,useState} from 'react'

import { useSearchParams } from 'react-router-dom'

import {useDispatch,useSelector} from 'react-redux'

import { setSearchResult,removeSearchResult } from '../../redux/actions/searchAction'

import ListMusic from '../../component/PlayListDescription/ListMusic'

import SearchResult from './SearchResult/SearchResult'


import './Search.scss'

import {searchByKeyword} from 'nhaccuatui-api-full'
function Search() {
    // let params = (new URL(document.location)).searchParams;
    // let name = params.get('keyword'); 

    const result = useSelector(state=>state.search.searchResult)
    const [resultSong,setResultSong] = useState([])
    const dispatch = useDispatch();

    const [keyword,setKeyword] = useState('')
    const [params,setParams] = useSearchParams()
    const keywordInput = useRef(null)
    useEffect(()=>{
        const searchKeyword = async ()=>{
            const result = await searchByKeyword(params.get('keyword'))
            console.log('call-api-search')
            console.log(result)
            dispatch(setSearchResult(result))
        }
        if(params.get('keyword')){
            searchKeyword()
        }
        return ()=>{
            dispatch(removeSearchResult())
        }
    },[params])
    useEffect(()=>{
        if(result.length!==0){
            console.log(result.search.song.song)
            const song = {
                songs:result.search.song.song
            }
            setResultSong(song)
        }
    },[result])

    useEffect(()=>{
        window.scrollTo(0,0)
    },[])


    return (
        <div className="search">
            <div className="search-container">
                <div className="search-header">
                    <form 
                        className="search-keyword" 
                        onSubmit={(e)=>{
                            e.preventDefault()
                            setParams(`keyword=${keyword}`)}
                    }>
                        <input type="text" name='keyword' 
                            className="search-keyword__input" 
                            placeholder='Tìm kiếm'
                            ref={keywordInput} 
                            value={keyword}
                            onChange={(e)=>{setKeyword(e.target.value)}}
                        />
                        <button type='submit' className="search-keyword__submit">
                            <i className="fas fa-search"></i>
                        </button>
                    </form>
                </div>
                <SearchResult />
                <ListMusic data={resultSong}/>
            </div>
        </div>
    )
}

export default Search
