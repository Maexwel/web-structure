import 'core-js';
import 'react-app-polyfill/stable';
import 'react-app-polyfill/ie11'; // polyfills
import 'typeface-roboto'; // Font
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/styles'; // Design system provider
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'; // Redux provider
import { theme } from './theme/theme'; // Custom theme
import storeFactory from './store/index'; // Redux store factory
import Router from './router/index.js'; // Main router
import { ServiceLocatorProvider, baseServiceLocator } from './components/context'; // Service locator definition
import { NotificationProvider } from './components/ui-kit'; // Notification provider
import { MuiPickersUtilsProvider, } from '@material-ui/pickers'; // Picker util provider
import MomentUtils from '@date-io/moment'; // Moment utility for pickers
require('dotenv').config();

const store = storeFactory();

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <ServiceLocatorProvider value={baseServiceLocator}>
                <NotificationProvider >
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <Router />
                    </MuiPickersUtilsProvider>
                </NotificationProvider>
            </ServiceLocatorProvider>
        </ThemeProvider>
    </Provider>
    , document.getElementById('root'));
serviceWorker.unregister();
