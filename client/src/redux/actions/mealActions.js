import axios from 'axios';
import { GET_MEALS, SET_FILTERS } from './types';
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
