import {ActionTypes} from '../contants/action-type'
const initialState = {
    playlist:[],
    selectSong:'',
    addSong:''
}

export const playlistReducer = (state = initialState,action)=>{
    switch (action.type){
        case ActionTypes.SET_PLAYLIST:
            return {...state, playlist:action.payload}

        case ActionTypes.SET_SELECT_SONG:
            return {...state, selectSong:action.payload}

        case ActionTypes.REMOVE_SELECT_SONG:
            return {...state, selectSong:''}

        case ActionTypes.SET_ADD_SONG:
            return {...state, addSong:action.payload}
            
        case ActionTypes.REMOVE_ADD_SONG:
            return {...state, addSong:''}

        default:
            return state
    }
}