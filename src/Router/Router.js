import React from 'react'

import { Route,Routes } from 'react-router-dom'

import Home from '../pages/Home/Home';

import Explore from '../pages/Explore/Explore';

import Search from '../pages/Search/Search';

import PlayListDetail from '../pages/PlayListDetail/PlayListDetail';


function Router() {
    return (
        <Routes>
              <Route  index path="/" element={<Home/>} />
              <Route  index path="/search" element={<Search/>} />
              <Route  path="/explore/:type" element={<Explore/>}/>
              <Route  path="/playlist/:playlistID" element={<PlayListDetail/>} />
        </Routes>
    )
}



export default Router

