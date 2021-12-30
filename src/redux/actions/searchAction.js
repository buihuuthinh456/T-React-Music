import {ActionTypes} from  '../contants/action-type'

export const setSearchResult = (result) => {
    return {
        type: ActionTypes.SET_SEARCH_RESULT,
        payload: result
    }
}

export const removeSearchResult = () => {
    return {
        type: ActionTypes.REMOVE_SEARCH_RESULT,
        payload: []
    }
}

