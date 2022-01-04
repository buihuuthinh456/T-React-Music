import {ActionTypes} from  '../contants/action-type'

export const setVideo = (video) => {
    return {
        type: ActionTypes.SET_VIDEO,
        payload:video
    }
}