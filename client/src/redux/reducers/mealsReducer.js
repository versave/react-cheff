import { GET_MEALS, ADD_MEAL, EDIT_MEAL, DELETE_MEAL, SET_ACTIVE_FILTERS, RESET_ACTIVE_FILTERS, BUILD_FILTERS, SEARCH_MEALS } from '../actions/types';

const initialState = {
    meals: [],
    filters: [],
    activeFilters: [],
    loaded: false
};

export default function(state = initialState, action) {
    switch(action.type) {
        case ADD_MEAL:
            return {
                ...state,
                meals: [action.payload, ...state.meals],
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

            return {
                ...state,
                meals: state.meals.map(meal => {

                    if(meal._id === id) {
                        meal = mealObject
                    }

                    return meal;
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
        case BUILD_FILTERS:
            let filtersArr = [];

            state.meals.forEach(meal => {
                filtersArr = filtersArr.concat(meal.tags);
            });

            return {
                ...state,
                filters: filtersArr
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
        case RESET_ACTIVE_FILTERS:
            return {
                ...state,
                activeFilters: []
            }
        case SEARCH_MEALS:
            return {
                ...state,
                meals: state.meals.map(meal => {
                    if(action.payload === '') {
                        meal.visible = '';
                        return meal;
                    }
                    
                    if(meal.name.toLowerCase().includes(action.payload.toLowerCase())) {
                        meal.visible = '';
                        
                        return meal;
                    } else {
                        meal.visible = 'hidden';
                        return meal;
                    }
                }),
            }
        default:
            return state;
    }
}