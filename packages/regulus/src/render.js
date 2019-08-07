import React from 'react';
import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';
import { Capture } from 'react-loadable';
import serialize from 'serialize-javascript';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router';

import App from './App';
import routes from './routes/routes';
import configureStore from './redux/store';

// eslint-disable-next-line
const requestHandlder = options => async (request, response, next) => {
    const helmet = Helmet.renderStatic();

    const currentRoute =
        routes.find(route => matchPath(request.url, route)) || {};

    const initialData = currentRoute.fetchInitialData
        ? await currentRoute.fetchInitialData()
        : {};

    const modules = [];
    const context = {};

    const store = configureStore(initialData);

    const htmlMarkup = renderToString(
        <Capture report={moduleName => modules.push(moduleName)}>
            <Provider store={store}>
                <StaticRouter location={request.url} context={context}>
                    <App />
                </StaticRouter>
            </Provider>
        </Capture>
    );

    const bundles = [].concat.apply(
        [],
        Object.values(options.clientStats.assetsByChunkName)
    );

    const scripts = bundles.filter(bundle => bundle.endsWith('.js'));
    const styles = bundles.filter(bundle => bundle.endsWith('.css'));

    const preloadState = serialize(store.getState());

    if (context.status) {
        response.status(context.status);
    }

    if (context.url) {
        response
            .status(301)
            .set('location', context.url)
            .send();
    } else {
        response.render(options.template || 'index', {
            htmlMarkup,
            preloadState,
            helmet,
            scripts,
            styles
        });
    }
};

export default requestHandlder;
