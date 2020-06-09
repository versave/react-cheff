import {
    GET_MEALS,
    ADD_MEAL,
    EDIT_MEAL,
    DELETE_MEAL,
    SET_ACTIVE_FILTERS,
    RESET_ACTIVE_FILTERS,
    BUILD_FILTERS,
    SEARCH_MEALS,
    SET_MEALS_LOADING,
    EMPTY_MEALS
} from '../actions/types';

const initialState = {
    meals: [],
    filters: [],
    activeFilters: [],
    loading: false
};

export default function(state = initialState, action) {
    switch(action.type) {
        case ADD_MEAL:
            return {
                ...state,
                meals: [action.payload, ...state.meals],
                loading: false
            }
        case GET_MEALS: 
            return {
                ...state,
                meals: action.payload,
                loading: false
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
                }),
                loading: false
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
                }),
                loading: false
            }
        case BUILD_FILTERS:
            let filtersArr = [];
            let tagFilters = [];

            state.meals.forEach(meal => {
                filtersArr = filtersArr.concat(meal.tags);
            });

            const filteredTags = filtersArr.filter(tag => {
                if(tagFilters.includes(tag)) {
                    return false;
                } else {
                    tagFilters.push(tag);
                    return true;
                }
            })

            return {
                ...state,
                filters: filteredTags
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
        case SET_MEALS_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case EMPTY_MEALS:
            return {
                ...state,
                meals: [],
                filters: [],
                activeFilters: []
            }
        default:
            return state;
    }
}