import { CHANGE_STR, TYPE_TWO, TYPE_THREE } from './types';

// Example action to change state and communicate with reducer
export const changeString = (str) => dispatch => {
    dispatch({
        type: CHANGE_STR,
        payload: str
    });
};
