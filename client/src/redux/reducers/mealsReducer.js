import { GET_MEALS, SET_FILTERS } from '../actions/types';

const initialState = {
    meals: [],
    filters: [],
    loaded: false
};

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_MEALS: 
            return {
                ...state,
                meals: action.payload,
                loaded: true
            }
        case SET_FILTERS:
            return {
                ...state,
                filters: action.payload
            }
        default:
            return state;
    }
}