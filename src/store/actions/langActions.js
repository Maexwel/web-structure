import { constants as C } from './constants';

export const updateSelectedLangAction = (val) => (
    {
        type: C.UPDATE_SELECTED_LANG,
        payload: val
    }
);