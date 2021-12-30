import {ActionTypes} from '../contants/action-type'
const initialState = {
    searchResult:[]
}

export const searchReducer = (state = initialState,action)=>{
    switch (action.type){
        case ActionTypes.SET_SEARCH_RESULT:
            return {...state, searchResult:action.payload}
        case ActionTypes.REMOVE_SEARCH_RESULT:
            return {...state, searchResult:[]}
        default:
            return state
    }
}
