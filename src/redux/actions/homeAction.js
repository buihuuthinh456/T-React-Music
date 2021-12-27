import {ActionTypes} from  '../contants/action-type'

export const setHome = (home) => {
    return {
        type: ActionTypes.SET_HOME,
        payload: home
    }
}

