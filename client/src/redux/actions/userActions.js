import axios from 'axios';
import { TOGGLE_ITEM_MENU } from './types';
import { returnErrors } from './errorActions';

export const toggleItemMenu = (toggle) => dispatch => {
    dispatch({
        type: TOGGLE_ITEM_MENU,
        payload: toggle
    })
};
