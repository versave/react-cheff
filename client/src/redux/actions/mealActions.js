import axios from 'axios';
import { GET_MEALS, SET_FILTERS, ADD_MEAL, TOGGLE_ITEM_MENU, CLEAR_ERRORS, EDIT_MEAL, SET_MEAL, DELETE_MEAL, SET_ACTIVE_FILTERS } from './types';
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

export const editMeal = (id, edits) => (dispatch, getState) => {
    axios.patch(`/api/meals/${id}`, edits, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: EDIT_MEAL,
                payload: [id, res.data]
            })
            
            dispatch({
                type: SET_MEAL,
                payload: null
            })
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

            dispatch({
                type: SET_MEAL,
                payload: null
            })
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
