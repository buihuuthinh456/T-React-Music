import {ActionTypes} from '../contants/action-type'
const initialState = {
    data:[],

}

export const exploreReducer = (state = initialState,action)=>{
    switch (action.type){
        case ActionTypes.SET_EXPLORE:
            {
                if(action.payload){
                    return {...state, data:action.payload}
                }
                else{
                    return {...state}
                }
            }
        case ActionTypes.ADD_EXPLORE:
            {
                const data = state.data
                return {...state, data:[...data,...action.payload]}
            }
        default:
            return state
    }
}