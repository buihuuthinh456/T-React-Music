import {ActionTypes} from  '../contants/action-type'

export const setExplore = (data) => {
    return {
        type: ActionTypes.SET_EXPLORE,
        payload: data
    }
}
export const addExplore = (data) => {
    return {
        type: ActionTypes.ADD_EXPLORE,
        payload: data
    }
}
