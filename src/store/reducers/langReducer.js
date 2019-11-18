import { constants as C } from '../actions/constants';
import { LANG_DATA } from '../../lang';

export const lang = (state = DEFAULT_VALUE, action) => {
    switch (action.type) {
        case C.UPDATE_SELECTED_LANG:
            return { ...state, ...action.payload }
        default:
            return state
    }
}

// Base value for the lang file in redux store
const DEFAULT_VALUE = {
    selectedLang: '',
    data: LANG_DATA,
    translation: {}
}