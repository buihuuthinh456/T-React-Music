import React,{useEffect,useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {setExplore,addExplore} from '../../redux/actions/exploreAction'
import {explore} from 'nhaccuatui-api-full'

import {Link, useParams, useLocation} from 'react-router-dom'

import Button from '../../component/Button/Button'
import ContentLoading from '../../component/ContentLoading/ContentLoading'
import Card from '../../component/Card/Card'


import './Explore.scss'

function Explore() {

    const exploreData = useSelector(state=>state.explore.data)
    const [page,setPage] = useState(1)
    const {type} = useParams()
    const pathname = useLocation().pathname
    const dispatch = useDispatch();
    const nav = [
        {
            name:'BÀI HÁT',
            path:'/explore/song',
        },
        {
            name:'PLAYLIST',
            path:'/explore/playlist',
        },
        {
            name:'MV',
            path:'/explore/mv',
        },
    ]
    
    useEffect(()=>{
        const fetchExplore = async ()=>{
            const data = await explore({
                type: type,
                key: "moi-hot",
                page: 1,
                pageSize: 24,
              });
              dispatch(setExplore(data.data))
        }
        setPage(1)
        fetchExplore()    
    },[type])
    useEffect(()=>{
        const fetchExplore = async ()=>{
            const data = await explore({
                type: type,
                key: "moi-hot",
                page: page,
                pageSize: 24,
              });
              dispatch(addExplore(data.data))
        }
        fetchExplore()
    },[page])

    if(exploreData.length===0) return <ContentLoading/>

    return (
        <div className="explore">
            {console.log('re-render')}
            <div className="explore-container">
                <div className="explore-title">
                    <h3>EXPLORE MUSIC WORLD</h3>
                </div>
                <nav className="explore-options">
                    {nav.map((item,index)=>(
                        <div className={`explore-options__item ${item.path===pathname?'--active':''}`} key={index}>
                            <Link to={item.path}>{item.name}</Link>
                        </div>
                    ))}
                    
                </nav>
                <div className="explore-content grid">
                    <div className="row distance-8">
                        {exploreData.map((item,index)=>(
                            <div className="column-4" key={index}>
                                <Card 
                                        thumbnail={item.thumbnail} 
                                        title={item.title} 
                                        type={type}
                                        dataKey={item.key}
                                    />
                            </div>
                        ))}
                    </div>
                </div>
                {/* <button onClick={()=>setPage(page=>page+1)}>LoadMore</button> */}
                <Button className='btn-large' type='btn-default' onClick={()=>setPage(page=>page+1)}>Tải thêm</Button>
            </div>
        </div>
    )
}

export default Explore
