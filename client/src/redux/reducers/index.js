import { combineReducers } from 'redux';
import mealsReducer from './mealsReducer';
import userReducer from './userReducer';
import errorReducer from './errorReducer';

export default combineReducers({
    meals: mealsReducer,
    user: userReducer,
    error: errorReducer
});