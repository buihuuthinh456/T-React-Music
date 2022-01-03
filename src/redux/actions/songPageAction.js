import {ActionTypes} from  '../contants/action-type'

export const setSong = (result) => {
    return {
        type: ActionTypes.SET_SONG,
        payload: result
    }
}

export const setSongLyric = (result) => {
    return {
        type: ActionTypes.SET_SONG_LYRIC,
        payload: result
    }
}
