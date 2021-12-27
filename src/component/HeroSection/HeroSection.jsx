import React,{useEffect,useState} from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
    Autoplay,Pagination,Navigation
  } from 'swiper';

import { getHome } from 'nhaccuatui-api-full';



import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

import './HeroSection.scss';

SwiperCore.use([Autoplay,Pagination,Navigation]);


export default function HeroSection(props) {

    const [heroSlide,setHeroSlide] = useState([]);

  
    useEffect( ()=>{
      async function fetchHome(){
          const data = await getHome().then(response => setHeroSlide(response.newRelease.song));
      } 
      fetchHome();
    },[])
    console.log(heroSlide)



  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      onSlideChange={() => console.log('slide change')}
      autoplay={{
        "delay": 5000,
      }}
      pagination={{
        "clickable": true
      }}
      navigation={true}
    >
      {
          heroSlide.map((item,index)=>(
            <SwiperSlide key={index}>
                <img src={item.thumbnail} alt={item.title} />
            </SwiperSlide>
          ))
      }
    </Swiper>
  );
};