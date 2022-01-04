import React,{useState,useEffect} from 'react';

import {Link} from 'react-router-dom'

import './HeroSection2.scss';

function HeroSection2(props) {

    const [slider,setSlider] = useState(0);
    const heroSlide = props.heroSlide;
    
    // Xu ly slider autoplay
    useEffect(()=>{
       const countSlider = ()=>{
               setSlider(value =>{
                   if(value >= heroSlide.length -1)
                   {
                       return 0
                   }
                   else{
                       return value + 1
                   }
               } )
        }
       const autoCountSlider = setInterval(countSlider,5000);
        return(()=>{
            clearInterval(autoCountSlider);
        })
    },[slider,heroSlide])

    const clickNext = () => {
        setSlider(value =>{
            if(value >= heroSlide.length -1)
            {
                return 0
            }
            else{
                return value + 1
            }
        });
    }
    const clickPrev = () => {
        setSlider(value =>{
            if(value <= 0)
            {
                return heroSlide.length-1
            }
            else{
                return value - 1
            }
        });
    }
    const clickDot = (element) =>{
        const index = element.getAttribute('data-index');
        setSlider(+index);
    }
    return (
        <div className="slider-container">
            <div className="slider-wrapper">
                {
                    heroSlide.map((item,index)=>
                    (<div key={index} className={`slider-item ${ index===slider ? 'active' : ''}`} style={{backgroundImage:`url(${item.thumbnail})`}} />))
                    //  heroSlide.map((item,index)=>
                    // (<img key={index} className={`slider-item ${ index===slider ? 'active' : ''}`} src={item.thumbnail} alt={item.title} />))
                }
            </div>
            <div className="dot-wrapper">
                {
                    heroSlide.map((item,index)=>(
                        <span onClick={(e)=> clickDot(e.target)}  key={item.key} data-index={index} className={`dot ${ index===slider ? 'active' : ''}`}></span>
                    ))
                }
            </div>
            <div className="button-prev" onClick={clickPrev}>
                <i className="fas fa-chevron-left"></i>
            </div>
            <div className="button-next" onClick={clickNext}>
                <i className="fas fa-chevron-right"></i>
            </div>
        </div>
    )
}

export default HeroSection2
