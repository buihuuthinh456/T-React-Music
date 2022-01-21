import React,{useEffect} from 'react'


import { getHome } from 'nhaccuatui-api-full'
import {useDispatch,useSelector} from 'react-redux'
import { setHome } from '../../redux/actions/homeAction'

import HeroSection2 from '../../component/HeroSection/HeroSection2'
import CardList from '../../component/CardList/CardList'
import Top10BaiHat from '../../component/Top10BaiHat/Top10BaiHat'

import ContentLoading from '../../component/ContentLoading/ContentLoading'



import './Home.scss'

function Home() {
    const dispatch = useDispatch();
    const data = useSelector((state)=>state.dataHome.home)

    useEffect(()=>{
        const fetchHome = async ()=>{
            const response = await getHome()
            console.log('call-api-home')
            if(response.status === 'error'){
                fetchHome()
            }
            else{
                dispatch(setHome(response))
            }
            // dispatch(setHome(reponse))
        }
        fetchHome()
    },[dispatch])
    useEffect( ()=>{
        window.scrollTo(0,0)
    },[])

    console.log(data)
    if(data.length <= 0) return <ContentLoading/>
    if(typeof data==='string') return <div className='home'>
        Vì vấn đề về CORS. Bạn hãy bật devtool và tắt disable cache đi. Cảm ơn bạn .</div>
    return (
        <div className="home">
            <HeroSection2 heroSlide={typeof data==='object'?data.showcase:[]} />
            <div className="card-container">
                {
                    typeof data === 'object' ?  data.topicEvent.map((item,index)=>(
                            <CardList name={item.groupName.split('_')[0]} listPlaylist={item.listPlaylist} key={index} type="playlist"  />
                    )):'Loading'
                }
                {
                    typeof data === 'object' && <CardList name='Chủ đề nổi bật' listPlaylist={data.topic} type="topic" />
                    
                }
            </div>
            <Top10BaiHat data={data.song}/>
            {
                    typeof data === 'object' && <CardList name='Video/MV' listPlaylist={data.video} type="mv" />
                    
            }
        </div>
    )

 
}
export default Home




