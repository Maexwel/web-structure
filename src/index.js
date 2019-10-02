import 'core-js';
import 'react-app-polyfill/stable';
import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<div />, document.getElementById('root'));
serviceWorker.unregister();
