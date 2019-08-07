const paths = require('../config/paths');
const webpackMerge = require('webpack-merge');
const webpackConfigs = require('./webpack.config');
const webpackParts = require('./webpack.config.parts');

const webpackBaseClientConfig = webpackMerge(
    webpackConfigs.filter(webpackConfig => webpackConfig.name === 'client')
);

const webpackBaseServerConfig = webpackMerge(
    webpackConfigs.filter(webpackConfig => webpackConfig.name === 'server')
);

const webpackClientConfig = webpackMerge([
    { mode: 'production' },
    webpackParts.eslintLoader(),
    webpackParts.babelLoader(),
    webpackParts.cssStylusLoaderClient(),
    webpackParts.cssStyleLoaderClient(),
    webpackParts.splitChunks({
        name: 'vendor'
    }),
    webpackParts.minifyCSS({
        discardComments: {
            removeAll: true
        }
    }),
    webpackParts.extractCSS({
        path: 'css',
        name: '[id]'
    }),
    webpackParts.compressionPlugin(),
    webpackParts.cleanPlugin({
        path: paths.appDist
    }),
    webpackParts.reactLoadablePlugin({
        path: paths.appDist,
        filename: 'react-loadable.json'
    }),
    webpackParts.webpackDefinePlugin('production')
]);

const webpackServerConfig = webpackMerge([
    { mode: 'production' },
    webpackParts.eslintLoader(),
    webpackParts.babelLoaderServer(),
    webpackParts.cssStylusLoaderServer(),
    webpackParts.cssStyleLoaderServer(),
    webpackParts.splitChunks({
        name: 'vendor'
    }),
    webpackParts.minifyCSS({
        discardComments: {
            removeAll: true
        }
    }),
    webpackParts.extractCSS({
        path: 'css',
        name: '[id]'
    }),
    webpackParts.webpackDefinePlugin('production'),
    webpackParts.webpackDeveloperPluginsServer()
]);

module.exports = [
    webpackMerge(webpackBaseClientConfig, webpackClientConfig),
    webpackMerge(webpackBaseServerConfig, webpackServerConfig)
];
