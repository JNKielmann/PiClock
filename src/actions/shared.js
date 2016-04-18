import * as actionTypes from './actionTypes';

export const setState = (newState) => {
    return {
        type: actionTypes.SET_STATE,
        newState
    }
}