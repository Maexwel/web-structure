import 'core-js';
import 'react-app-polyfill/stable';
import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/styles';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { theme } from './theme/theme';
import storeFactory from './store/index';
import Router from './router/index.js';
require('dotenv').config();

const store = storeFactory();

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <Router />
        </ThemeProvider>
    </Provider>
    , document.getElementById('root'));
serviceWorker.unregister();
