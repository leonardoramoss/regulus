import 'reset-css';

import React from 'react';
import { hydrate } from 'react-dom';
import Loadable from 'react-loadable';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import configureStore from './redux/store';
import App from './App';

if (
    process.env.NODE_ENV === 'production' &&
    window.__REACT_DEVTOOLS_GLOBAL_HOOK__ &&
    Object.keys(window.__REACT_DEVTOOLS_GLOBAL_HOOK__._renderers).length
) {
    window.__REACT_DEVTOOLS_GLOBAL_HOOK__._renderers = {};
}

const preloadState = window.__PRELOADED_STATE__ || {};
const store = configureStore(preloadState);

delete window.__PRELOADED_STATE__;

const renderClient = Component => {
    Loadable.preloadReady().then(() => {
        hydrate(
            <Provider store={store}>
                <Router>
                    <Component />
                </Router>
            </Provider>,
            document.getElementById('wrapper')
        );
    });
};

renderClient(App);
