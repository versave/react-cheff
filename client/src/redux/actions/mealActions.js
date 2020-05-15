import axios from 'axios';
import { GET_MEALS,
    ADD_MEAL,
    EDIT_MEAL,
    DELETE_MEAL,
    SET_ACTIVE_FILTERS,
    RESET_ACTIVE_FILTERS,
    BUILD_FILTERS,
    SEARCH_MEALS
} from './types';
import { tokenConfig, toggleItemMenu, setMeal } from './userActions';
import { returnErrors, clearErrors } from './errorActions';

export const loadMeals = () => dispatch => {
    axios.get('/api/meals')
        .then(res => dispatch({
            type: GET_MEALS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        })
};

export const addMeal = (meal) => (dispatch, getState) => {
    axios.post('/api/meals', meal, tokenConfig(getState))
        .then(res => {
            dispatch(clearErrors());
            dispatch(toggleItemMenu(false));
            
            dispatch({
                type: ADD_MEAL,
                payload: res.data
            })

            dispatch(buildFilters());
            dispatch(resetActiveFilters())
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};

export const editMeal = (id, edits) => (dispatch, getState) => {
    axios.patch(`/api/meals/${id}`, edits, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: EDIT_MEAL,
                payload: [id, res.data]
            })
            
            dispatch(setMeal(null));
            dispatch(buildFilters());
            dispatch(resetActiveFilters());
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};

export const deleteMeal = (id) => (dispatch, getState) => {
    axios.delete(`/api/meals/${id}`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: DELETE_MEAL,
                payload: [id, res.data.tags]
            })

            dispatch(resetActiveFilters());
            dispatch(setMeal(null));
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};

export const filterTags = (filter, checked) => dispatch => {
    dispatch({
        type: SET_ACTIVE_FILTERS,
        payload: {filter, checked}
    })
};

export const buildFilters = () => dispatch => {
    return dispatch({
        type: BUILD_FILTERS
    })
};

export const resetActiveFilters = () => dispatch => {
    return dispatch({
        type: RESET_ACTIVE_FILTERS
    })
};

export const searchMeals = (filter) => {
    return {
        type: SEARCH_MEALS,
        payload: filter
    }
};