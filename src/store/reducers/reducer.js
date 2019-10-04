import { combineReducers } from 'redux';
import { view } from './viewReducer';

/** BASE OF ALL REDUCERS */
export default combineReducers({
    view, // {currentPage: '/'}
});