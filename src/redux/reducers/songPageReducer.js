import {ActionTypes} from  '../contants/action-type'

const initialState = {
    song:[],
    lyric:[],
}

export const songPageReducer = (state = initialState,action)=>{
    switch (action.type){
        case ActionTypes.SET_SONG:
            return {...state, song:action.payload}
        case ActionTypes.SET_SONG_LYRIC:
            return {...state, lyric:action.payload}
        default:
            return state
    }
}