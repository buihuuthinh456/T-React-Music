import {ActionTypes} from  '../contants/action-type'

export const setPlaylistDetail = (playlist) => {
    return {
        type: ActionTypes.SET_PLAYLIST,
        payload: playlist
    }
}


export const setSelectSong = (selectSong) => {
    return {
        type: ActionTypes.SET_SELECT_SONG,
        payload: selectSong
    }
}
export const removeSelectSong = () => {
    return {
        type: ActionTypes.REMOVE_SELECT_SONG,
        payload: ''
    }
}

export const setAddSong = (addSong) => {
    return {
        type: ActionTypes.SET_ADD_SONG,
        payload: addSong
    }
}
export const removeAddSong = () => {
    return {
        type: ActionTypes.REMOVE_ADD_SONG,
        payload: ''
    }
}



