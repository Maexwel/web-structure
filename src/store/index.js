import appReducer from './reducers/reducer';
import { createStore } from 'redux';

export default () => {
    return createStore(appReducer, {}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()); // Using devtools extension to access store
}