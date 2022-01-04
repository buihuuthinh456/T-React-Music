import {ActionTypes} from  '../contants/action-type'

export const setTopic = (topic) => {
    return {
        type: ActionTypes.SET_TOPIC,
        payload:topic
    }
}