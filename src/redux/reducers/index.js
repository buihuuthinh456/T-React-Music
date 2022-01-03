import { combineReducers } from "redux";

import { homeReducer } from "./homeReducer";

import {playlistReducer} from "./playlistReducer"

import {musicReducer} from './musicReducer'

import {searchReducer} from './searchReducer'

import { exploreReducer } from "./exploreReducer";

import { songPageReducer } from './songPageReducer'

const reducers = combineReducers({
    dataHome:homeReducer,
    playlistDetail:playlistReducer,
    musicPlayer:musicReducer,
    search:searchReducer,
    explore:exploreReducer,
    songPage:songPageReducer,
})

export default reducers