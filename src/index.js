import 'core-js';
import 'react-app-polyfill/stable';
import 'react-app-polyfill/ie11'; // polyfills
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/styles'; // Design system provider
import 'typeface-roboto'; // Font
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'; // Redux provider
import { theme } from './theme/theme'; // Custom theme
import storeFactory from './store/index'; // Redux store factory
import Router from './router/index.js'; // Main router
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
