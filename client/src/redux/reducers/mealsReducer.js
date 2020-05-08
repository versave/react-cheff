import { GET_MEALS, SET_FILTERS, ADD_MEAL } from '../actions/types';

const initialState = {
    meals: [],
    filters: [],
    loaded: false
};

export default function(state = initialState, action) {
    switch(action.type) {
        case ADD_MEAL:
            const existingFilters = [];

            return {
                ...state,
                meals: [action.payload, ...state.meals],
                filters: [action.payload.tags, ...state.filters].filter(filter => {
                    if(!existingFilters.indexOf(filter)) {
                        existingFilters.push(filter);
                        return filter;
                    }
                }),
                loaded: true
            }
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