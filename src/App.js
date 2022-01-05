import {useState,useEffect} from 'react'

import './App.scss';

// import HeroSection from './component/HeroSection/HeroSection';
import 'swiper/swiper.min.css';

import Navbar from './component/Navbar/Navbar';
import NavbarMobile from './component/NavbarMobile/NavbarMobile';

import MusicPlayer from './component/MusicPlayer/MusicPlayer';
import MusicPlayerMobile from './component/MusicPlayerMobile/MusicPlayerMobile';

import Router from './Router/Router';

import Footer from './component/Footer/Footer';


function App() {

  const [show,setShow] = useState(false)
  let screenWidth = window.innerWidth

  useEffect(()=>{
      console.log(screenWidth)
      if(screenWidth < 1280){
        setShow(true)
      }
  },[screenWidth])
 
  return (
      <div className="App">
          <Navbar/>
          <NavbarMobile/>
          <div className="content">
            <Router/>
            <Footer/>
          </div>
          {show?<MusicPlayerMobile/>:<MusicPlayer/>}
      </div>
  );
}


export default App;
