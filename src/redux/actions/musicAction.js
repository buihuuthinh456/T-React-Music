import {ActionTypes} from  '../contants/action-type'

export const setPlayingSong = (song) => {
    return {
        type: ActionTypes.SET_PLAYING_SONG,
        payload: song
    }
}
export const setPlayingPlaylist = (playlist) => {
    return {
        type: ActionTypes.SET_PLAYING_PLAYLIST,
        payload: playlist
    }
}

export const slicePlayingPlaylist = (item) => {
    return {
        type: ActionTypes.SLICE_PLAYING_PLAYLIST,
        payload: item
    }
}

export const nextSong = (song) => {
    return {
        type: ActionTypes.NEXT_SONG,
        payload: song
    }
}

export const prevSong = (song) => {
    return {
        type: ActionTypes.PREV_SONG,
        payload: song
    }
}