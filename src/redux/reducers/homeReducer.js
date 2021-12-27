import {ActionTypes} from '../contants/action-type'
const initialState = {
    home:[]
}

export const homeReducer = (state = initialState,action)=>{
    switch (action.type){
        case ActionTypes.SET_HOME:
            return {...state, home:action.payload}
        default:
            return state
    }
}
