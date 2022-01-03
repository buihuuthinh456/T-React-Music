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
            const reponse = await getHome()
            // console.log('call-api-home')
            dispatch(setHome(reponse))
        }
        fetchHome()
    },[dispatch])
    useEffect( ()=>{
        window.scrollTo(0,0)
    },[])
    // console.log(data)
    if(data.length <= 0) return <ContentLoading/>
    return (
        <div className="home">
            <HeroSection2 heroSlide={typeof data==='object'?data.showcase:[]} />
            <div className="card-container">
                {
                    typeof data === 'object' ?  data.topicEvent.map((item,index)=>(
                            <CardList name={item.groupName.split('_')[0]} listPlaylist={item.listPlaylist} key={index}  />
                    )):'Loading'
                }
            </div>
            <Top10BaiHat data={data.song}/>
        </div>
    )

 
}
export default Home




