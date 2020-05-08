import axios from 'axios';
import { GET_MEALS, SET_FILTERS, ADD_MEAL, TOGGLE_ITEM_MENU, CLEAR_ERRORS } from './types';
import { tokenConfig } from './userActions';
import { returnErrors } from './errorActions';

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

export const setFilters = (filters) => dispatch => {
    dispatch({
        type: SET_FILTERS,
        payload: filters
    })
};

export const addMeal = (meal) => (dispatch, getState) => {
    axios.post('/api/meals', meal, tokenConfig(getState))
        .then(res => {
            //dispatch(setProductsLoading());
            //dispatch(setProductsLoading());

            dispatch({
                type: CLEAR_ERRORS
            })

            dispatch({
                type: TOGGLE_ITEM_MENU,
                payload: false
            })
            
            return dispatch({
                type: ADD_MEAL,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};