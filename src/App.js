

import './App.scss';

import { Route,Routes } from 'react-router-dom'

// import HeroSection from './component/HeroSection/HeroSection';
import Navbar from './component/Navbar/Navbar';

import Home from './pages/Home/Home';

import MusicPlayer from './component/MusicPlayer/MusicPlayer';

import BaiHat from './pages/BaiHat/BaiHat';

import Search from './pages/Search/Search';

import PlayListDetail from './pages/PlayListDetail/PlayListDetail';

import 'swiper/swiper.min.css';





function App() {
 
  return (
      <div className="App">
          <Navbar/>
          <div className="content">
            <Routes>
              <Route  index path="/" element={<Home/>} />
              <Route  index path="/search" element={<Search/>} />
              <Route  path="/baihat" element={<BaiHat/>} />
              <Route  path="/playlist/:playlistID" element={<PlayListDetail/>} />
            </Routes>
          </div>
          <MusicPlayer/>
      </div>
  );
}


export default App;
