import { combineReducers } from "redux";

import { homeReducer } from "./homeReducer";

import {playlistReducer} from "./playlistReducer"

import {musicReducer} from './musicReducer'

import {searchReducer} from './searchReducer'

const reducers = combineReducers({
    dataHome:homeReducer,
    playlistDetail:playlistReducer,
    musicPlayer:musicReducer,
    search:searchReducer,
})

export default reducers