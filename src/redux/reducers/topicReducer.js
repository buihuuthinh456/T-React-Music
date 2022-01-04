import {ActionTypes} from  '../contants/action-type'

const initialState = {
    topic:[]
}

export const topicReducer = (state = initialState,action)=>{
    switch (action.type){
        case ActionTypes.SET_TOPIC:
            return {...state,topic:action.payload}
        default:
            return {...state}
    }
}
