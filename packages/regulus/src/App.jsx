import React, { Component, Fragment } from 'react';
import { hot } from 'react-hot-loader';

import HeaderMenu from './components/layout/HeaderMenu';
import { renderRoutes } from 'react-router-config';

import routes from './routes/routes';
import Head from './components/Head';
import Header from './components/layout/elements/Header';
import Menu from './components/layout/elements/Menu';

const metas = [
    {
        name: 'title',
        content: 'SSR Starter Pack'
    },
    {
        name: 'keywords',
        content: 'react, ssr, server side rendering, webpack'
    },
    {
        name: 'author',
        content: 'Leonardo Ramos'
    }
];

class App extends Component {
    render() {
        return (
            <Fragment>
                <Head metas={metas} />
                <Header />
                <Menu>
                    <HeaderMenu routes={routes} />
                </Menu>
                {renderRoutes(routes)}
            </Fragment>
        );
    }
}

export default hot(module)(App);
