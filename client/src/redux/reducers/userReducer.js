import {
    TOGGLE_ITEM_MENU,
    TOGGLE_LOGIN_MENU,
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    SET_MEAL,
} from '../actions/types';

const initialState = {
    loginMenu: false,
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    openedMeal: null,
    user: null
};

export default function(state = initialState, action) {
    switch(action.type) {
        case TOGGLE_ITEM_MENU: 
            return {
                ...state,
                itemMenu: action.payload
            }
        case TOGGLE_LOGIN_MENU: 
            return {
                ...state,
                loginMenu: action.payload
            }
        case SET_MEAL:
            return {
                ...state,
                openedMeal: action.payload
            }
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);

            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
                loginMenu: false
            }
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token');

            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            }
        default:
            return state;
    }
}