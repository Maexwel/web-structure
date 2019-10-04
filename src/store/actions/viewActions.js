import { constants as C } from './constants';

export const updateViewAction = (val) => (
    {
        type: C.UPDATE_VIEW,
        payload: val
    }
);