import { constants as C } from '../actions/constants';

export const view = (state = {}, action) => {
    switch (action.type) {
        case C.UPDATE_VIEW:
            return { ...state, ...action.payload }
        default:
            return state
    }
}