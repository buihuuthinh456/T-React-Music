import React, { useRef } from 'react'

import "../../../node_modules/slick-carousel/slick/slick.css"; 
import "../../../node_modules/slick-carousel/slick/slick-theme.css";


import SwiperCore, { Navigation, Pagination, A11y } from "swiper";
import { SwiperSlide,Swiper } from 'swiper/react';

import './CardList.scss'
import Card from '../Card/Card'


SwiperCore.use([Navigation, Pagination, A11y]);

function CardList(props) {
    const list = props.listPlaylist
    const type = props.type||''
    const swipper = useRef()
    return (
        <div className="card-list">
            <div className="card-list__title">
                {props.name}
            </div>
            <Swiper
                ref={swipper}
                grabCursor={true}
                className={"swipper"}
                spaceBetween={10}
                slidesPerView={'auto'}
                slidesPerGroup={2}
            >
                {
                    list.map((item,i)=>(
                        <SwiperSlide key={i}>
                            <Card thumbnail={item.thumbnail||item.thumbURL} title={item.title} dataKey={item.key} type={type} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}

export default CardList
