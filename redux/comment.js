import * as ActionTypes from './ActionTypes';

export const comment = (state = [], action) => {
    switch(action.type) {
        case ActionTypes.ADD_COMMENT:
            return {...state, comment: action.payload};

        default:
            return state;
    }
}