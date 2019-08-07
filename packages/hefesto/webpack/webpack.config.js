const paths = require('../config/paths');
const nodeExternals = require('webpack-node-externals');

const webpackClientConfig = {
    name: 'client',

    target: 'web',

    mode: 'development',

    entry: [paths.appIndex],

    output: {
        path: paths.appDist,
        filename: 'js/[id].[hash:8].js',
        chunkFilename: 'js/[name].[hash:8].js',
        publicPath: '/'
    },

    performance: {
        hints: false
    },

    resolve: {
        extensions: ['.js', '.jsx', '.css', '.styl', '.scss'],
        modules: ['node_modules', paths.appNodeModules]
    },

    resolveLoader: {
        modules: ['node_modules']
    }
};

const webpackServerConfig = {
    name: 'server',

    target: 'node',

    mode: 'development',

    entry: paths.appRender,

    output: {
        path: paths.appDist,
        filename: 'render.js',
        chunkFilename: '[name].js',
        libraryTarget: 'commonjs2',
        publicPath: '/'
    },

    externals: nodeExternals({
        modulesFromFile: true
    }),

    performance: {
        hints: false
    },

    resolve: {
        extensions: ['.js', '.jsx', '.css', '.styl', '.scss'],
        modules: ['node_modules', paths.appNodeModules]
    },

    resolveLoader: {
        modules: ['node_modules']
    }
};

module.exports = [webpackClientConfig, webpackServerConfig];
