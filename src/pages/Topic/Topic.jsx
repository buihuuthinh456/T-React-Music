import React,{useEffect} from 'react'

import {getTopicDetail} from 'nhaccuatui-api-full'

import { useSelector, useDispatch } from 'react-redux'

import {setTopic} from '../../redux/actions/topicAction'

import {useParams} from 'react-router-dom'


import ContentLoading from '../../component/ContentLoading/ContentLoading'

import Card from '../../component/Card/Card'

import './Topic.scss'

function Topic() {

    const {topicID} = useParams()
    const dispatch = useDispatch();
    const topic = useSelector((state)=>state.topicPage.topic)


    function renderContent(data){
        const content = data.split('</br>');
        return content.map((item,index)=>(
            <React.Fragment key={index}>
                {item}<br/>
            </React.Fragment>
        ))
    }

    useEffect(()=>{
        const fetchTopicDetail = async ()=>{
            const data = await getTopicDetail(topicID)
            console.log(data)
            if(data.status==='success'){
                dispatch(setTopic(data.topic))
            }
            else{
                console.log('lỗi')
            }
        }
        fetchTopicDetail()
    },[topicID])

    useEffect( ()=>{
        console.log(topic)
    },[topic])

    useEffect( ()=>{
        window.scrollTo(0,0);
    },[])

    if(topic.length===0) return <ContentLoading/>


    return (
        <div className="container container--fix">
            <div className="topic-intro">
                <div className="topic-intro__thumbnail"></div>
                    <img src={topic.coverImageURL} alt={topic.title} />
                <div className="topic-intro__description">
                    <p>{renderContent(topic.description)}</p>
                </div>
            </div>
            <div className="topic-content">
                <h3 className="topic-content__title">
                    Tổng hợp Topic
                </h3>
                <div className="topic-content__list grid">
                    <div className="row distance-8">
                        {topic.playlist.map((item,index)=>(
                                <div className="column-3" key={index}>
                                    <Card 
                                            thumbnail={item.thumbnail} 
                                            title={item.title} 
                                            type='playlist'
                                            dataKey={item.key}
                                        />
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Topic
