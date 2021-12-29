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
        case ActionTypes.NEXT_SONG:
            {
                const playingPlaylist = state.playingPlaylist
                if(playingPlaylist.length > 1){
                    const newPlayingPlaylist = [...playingPlaylist.filter((item,index)=>item.key!==action.payload.key),action.payload]
                    const newPlayingSong = playingPlaylist.find(item => item.key !== action.payload.key)
                    return {...state,playingPlaylist:newPlayingPlaylist,playingSong:newPlayingSong}
                }
                else{
                    console.log('Đã hết playlist')
                    return {...state}
                }
                
            }
        case ActionTypes.PREV_SONG:
            {
                const playingPlaylist = state.playingPlaylist
                const prevSong = playingPlaylist[playingPlaylist.length-1]
                const newPlayingPlaylist = [action.payload,...playingPlaylist.filter((item,index)=>item.key!==action.payload.key)]
                return {...state,playingPlaylist:newPlayingPlaylist,playingSong:prevSong}
            }
        default:
            return state
    }
}