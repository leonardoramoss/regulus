const webpackMerge = require('webpack-merge');
const webpackConfigs = require('./webpack.config');
const webpackParts = require('./webpack.config.parts');

const paths = require('../config/paths');

const webpackBaseClientConfig = webpackMerge(
    webpackConfigs.filter(webpackConfig => webpackConfig.name === 'client')
);

const webpackBaseServerConfig = webpackMerge(
    webpackConfigs.filter(webpackConfig => webpackConfig.name === 'server')
);

const webpackClientConfig = webpackMerge([
    {
        entry: ['webpack-hot-middleware/client']
    },
    {
        devtool: 'cheap-module-eval-source-map'
    },
    webpackParts.eslintLoader(),
    webpackParts.babelLoader(),
    webpackParts.cssStylusLoaderClient(),
    webpackParts.cssStyleLoaderClient(),
    webpackParts.splitChunks({
        name: 'vendor'
    }),
    webpackParts.webpackDeveloperPluginsClient(),
    webpackParts.webpackDefinePlugin('development'),
    // webpackParts.webpackBundleAnalyzer(),
    webpackParts.minifyCSS({
        options: {
            discardComments: {
                removeAll: true
            }
        }
    }),
    webpackParts.extractCSS({
        path: 'css',
        name: '[id]',
        isDevMode: true
    }),
    webpackParts.compressionPlugin(),
    webpackParts.reactLoadablePlugin({
        path: paths.appDist,
        filename: 'react-loadable.json'
    })
]);

const webpackServerConfig = webpackMerge([
    webpackParts.eslintLoader(),
    webpackParts.babelLoaderServer(),
    webpackParts.cssStylusLoaderServer(),
    webpackParts.cssStyleLoaderServer(),
    webpackParts.splitChunks({
        name: 'vendor'
    }),
    webpackParts.webpackDeveloperPluginsServer(),
    webpackParts.webpackDefinePlugin('development'),
    // webpackParts.webpackBundleAnalyzer(),
    webpackParts.minifyCSS({
        options: {
            discardComments: {
                removeAll: true
            }
        }
    }),
    webpackParts.extractCSS({
        path: 'css',
        name: '[id]'
    })
]);

module.exports = [
    webpackMerge(webpackBaseClientConfig, webpackClientConfig),
    webpackMerge(webpackBaseServerConfig, webpackServerConfig)
];
