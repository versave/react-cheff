import { combineReducers } from 'redux';
import mealsReducer from './mealsReducer';
import userReducer from './userReducer';

export default combineReducers({
    meals: mealsReducer,
    user: userReducer
});