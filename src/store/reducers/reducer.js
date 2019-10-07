import { combineReducers } from 'redux';
import { view } from './viewReducer';
import {constants as C} from '../actions/constants';

/** BASE OF ALL REDUCERS */
const appReducer=  combineReducers({
    view, // { currentPage: { path, name, displayText} }
});

// Root reducer is used to clear the whole store. This is used for logout actions
const rootReducer = (state, action) => {
    if (action.type === C.CLEAR_ROOT) return appReducer({}, action);
    return appReducer(state, action);
}
export default rootReducer;