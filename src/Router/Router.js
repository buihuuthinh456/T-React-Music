import React from 'react'

import { Route,Routes } from 'react-router-dom'

import Home from '../pages/Home/Home';

import Explore from '../pages/Explore/Explore';

import Search from '../pages/Search/Search';

import PlayListDetail from '../pages/PlayListDetail/PlayListDetail';

import Song from '../pages/Song/Song';

import Rank from '../pages/Rank/Rank';

import MV from '../pages/MV/MV';

import Topic from '../pages/Topic/Topic';


function Router() {
    return (
        <Routes>
              <Route  index path="/" element={<Home/>} />
              <Route  path="/search" element={<Search/>} />
              <Route  path="/topic/:topicID" element={<Topic/>} />
              <Route  path="/rank" element={<Rank/>} />
              <Route  path="/mv/:mvID" element={<MV/>} />
              <Route  path="/song/:songID" element={<Song/>} />
              <Route  path="/explore/:type" element={<Explore/>}/>
              <Route  path="/playlist/:playlistID" element={<PlayListDetail/>} />
        </Routes>
    )
}



export default Router

