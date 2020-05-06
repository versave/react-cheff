import { TOGGLE_ITEM_MENU } from '../actions/types';

const initialState = {
    itemMenu: false
};

export default function(state = initialState, action) {
    switch(action.type) {
        case TOGGLE_ITEM_MENU: 
            return {
                ...state,
                itemMenu: action.payload
            }
        default:
            return state;
    }
}