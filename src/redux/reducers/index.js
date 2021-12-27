import { combineReducers } from "redux";

import { homeReducer } from "./homeReducer";

import {playlistReducer} from "./playlistReducer"

import {musicReducer} from './musicReducer'

const reducers = combineReducers({
    dataHome:homeReducer,
    playlistDetail:playlistReducer,
    musicPlayer:musicReducer,
})

export default reducers