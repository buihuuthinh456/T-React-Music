import { combineReducers } from "redux";

import { homeReducer } from "./homeReducer";

import {playlistReducer} from "./playlistReducer"

import {musicReducer} from './musicReducer'

import {searchReducer} from './searchReducer'

import { exploreReducer } from "./exploreReducer";

import { songPageReducer } from './songPageReducer'

import {topicReducer} from './topicReducer'

import {videoReducer} from './videoReducer'

const reducers = combineReducers({
    dataHome:homeReducer,
    playlistDetail:playlistReducer,
    musicPlayer:musicReducer,
    search:searchReducer,
    explore:exploreReducer,
    songPage:songPageReducer,
    topicPage:topicReducer,
    videoPage:videoReducer,
})

export default reducers