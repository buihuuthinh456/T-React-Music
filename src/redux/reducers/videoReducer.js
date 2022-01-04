import {ActionTypes} from  '../contants/action-type'

const initialState = {
    video:[]
}

export const videoReducer = (state= initialState,action)=>{

    switch(action.type){
        case ActionTypes.SET_VIDEO:
            return {...state,video:action.payload}
        default:
            return {...state}
    }


}