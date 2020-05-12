import { GET_MEALS, SET_FILTERS, ADD_MEAL, EDIT_MEAL, DELETE_MEAL, SET_ACTIVE_FILTERS } from '../actions/types';

const initialState = {
    meals: [],
    filters: [],
    activeFilters: [],
    loaded: false
};

export default function(state = initialState, action) {
    switch(action.type) {
        case ADD_MEAL:
            const addFilters = [];

            return {
                ...state,
                meals: [action.payload, ...state.meals],
                filters: [action.payload.tags, ...state.filters].filter(filter => {
                    if(!addFilters.indexOf(filter)) {
                        addFilters.push(filter);
                        return filter;
                    } else {
                        return false;
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
        case EDIT_MEAL:
            const [id, mealObject] = action.payload;
            const editFilters = [];

            return {
                ...state,
                meals: state.meals.map(meal => {

                    if(meal._id === id) {
                        meal = mealObject
                    }

                    return meal;
                }),
                filters: [action.payload.tags, ...state.filters].filter(filter => {
                    if(!editFilters.indexOf(filter)) {
                        editFilters.push(filter);
                        return filter;
                    } else {
                        return false;
                    }
                })
            }
        case DELETE_MEAL:
            const [deletedId, tags] = action.payload;

            return {
                ...state,
                meals: state.meals.filter(meal => meal._id !== deletedId),
                filters: state.filters.filter(filter => {
                    if(tags.indexOf(filter) !== -1) {
                        return false;
                    } else {
                        return true;
                    }
                })
            }
        case SET_FILTERS:
            return {
                ...state,
                filters: action.payload
            }
        case SET_ACTIVE_FILTERS:
            return {
                ...state,
                activeFilters: [action.payload.filter, ...state.activeFilters].filter(filter => {
                    if(!action.payload.checked && filter === action.payload.filter) {
                        return false;
                    } else {
                        return true;
                    }
                })
            }
        default:
            return state;
    }
}