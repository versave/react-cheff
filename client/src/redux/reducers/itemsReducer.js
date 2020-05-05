import { CHANGE_STR, TYPE_TWO, TYPE_THREE } from '../actions/types';

const initialState = {
    testString: 'Redux props string',
    testNum: 'Redux props number',
    loaded: false,
    randomStr: ''
};

export default function(state = initialState, action) {
    switch(action.type) {
        case CHANGE_STR:
            return {
                ...state,
                testString: action.payload
            }
        case TYPE_TWO:
            return {
                ...state
            }
        case TYPE_THREE:
            return {
                ...state
            }
        default:
            return state;
    }
}