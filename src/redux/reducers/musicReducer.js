import {ActionTypes} from '../contants/action-type'
const initialState = {
    playingPlaylist:[],
    playingSong:[]
}

export const musicReducer = (state = initialState,action)=>{
    switch (action.type){
        case ActionTypes.SET_PLAYING_SONG:
            return {...state, playingSong:action.payload}
        case ActionTypes.SET_PLAYING_PLAYLIST:
            {
                const playingPlaylist = state.playingPlaylist
                if(playingPlaylist.some((item)=>item.key === action.payload.key)){
                    return {...state, playingPlaylist}
                }
                else{
                    playingPlaylist.push(action.payload)
                    return {...state, playingPlaylist}
                }
            }
        case ActionTypes.SLICE_PLAYING_PLAYLIST:
            {
                const playingPlaylist = state.playingPlaylist
                const newPlayingPlaylist = playingPlaylist.filter((item,index)=>item.key!==action.payload.key)
                return {...state,playingPlaylist:newPlayingPlaylist}
            }
        default:
            return state
    }
}