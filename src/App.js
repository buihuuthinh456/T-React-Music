

import './App.scss';

// import HeroSection from './component/HeroSection/HeroSection';
import 'swiper/swiper.min.css';

import Navbar from './component/Navbar/Navbar';

import MusicPlayer from './component/MusicPlayer/MusicPlayer';

import Router from './Router/Router';

import Footer from './component/Footer/Footer';





function App() {
 
  return (
      <div className="App">
          <Navbar/>
          <div className="content">
            <Router/>
            <Footer/>
          </div>
          <MusicPlayer/>
      </div>
  );
}


export default App;
