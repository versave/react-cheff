import axios from 'axios';
import {
    TOGGLE_ITEM_MENU,
    TOGGLE_SIGNUP_MENU,
    TOGGLE_LOGIN_MENU,
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    SET_MEAL,
    EMPTY_MEALS
} from './types';
import { returnErrors, clearErrors } from './errorActions';
import store from './../store';

export const toggleItemMenu = (toggle) => dispatch => {
    return dispatch({
        type: TOGGLE_ITEM_MENU,
        payload: toggle
    })
};

export const toggleSignupMenu = (toggle) => dispatch => {
    dispatch({
        type: TOGGLE_SIGNUP_MENU,
        payload: toggle
    })
};

export const toggleLoginMenu = (toggle) => dispatch => {
    dispatch({
        type: TOGGLE_LOGIN_MENU,
        payload: toggle
    })
};

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
    // User loading
    dispatch(setUserLoading(true));

    axios.get('/api/users/me', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(toggleLoginMenu(true));
            dispatch(setUserLoading(false));
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({ type: AUTH_ERROR })
        });
};

// Register User
export const signup = ({ name, email, password }) => dispatch => {
    dispatch(setUserLoading(true));
    
    // Headers
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    };

    // Request body
    const body = JSON.stringify({ name, email, password });

    axios.post('/api/users', body, config)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(setUserLoading(false));
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
            dispatch({
                type: REGISTER_FAIL
            })
        });
};

// Login user
export const login = ({ email, password }) => dispatch => {
    dispatch(setUserLoading(true));

    // Headers
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    };

    // Request body
    const body = JSON.stringify({ email, password });

    axios.post('/api/users/login', body, config)
        .then(res => {
            dispatch(clearErrors());

            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(setUserLoading(false));
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch({
                type: LOGIN_FAIL
            })
        });
};

// Logout user
export const logout = () => dispatch => {
    dispatch({type: EMPTY_MEALS});
    dispatch({type: LOGOUT_SUCCESS});
};

export const setMeal = (id) => dispatch => {
    const meal = store.getState().meals.meals.find(item => item._id === id);

    return dispatch({
        type: SET_MEAL,
        payload: meal
    })
}

// Setup config/headers and token
export const tokenConfig = (getState) => {
    // Get token from localStorage
    const token = getState().user.token;

    // Headers
    const config = {
        headers: {
            "content-type": "application/json"
        }
    };

    // If token, add to headers
    if(token) {
        config.headers['Authorization'] = token;
    }

    return config;
};

export const setUserLoading = (loading) => dispatch => {
    return dispatch({
        type: USER_LOADING,
        payload: loading
    })
}
