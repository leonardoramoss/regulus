const fs = require('fs');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');

const paths = require('../config/paths');

const webpackConfigDev = fs.existsSync(paths.webpackDev)                      //eslint-disable-line
    ? require(paths.webpackDev) : require('../webpack/webpack.config.dev.js'); //eslint-disable-line

const compiler = webpack(webpackConfigDev);

const webpackClientDevMiddleware = webpackDevMiddleware(compiler, {
    publicPath: '/',
    serverSideRender: true
});

const webpackClientHotMiddleware = webpackHotMiddleware(
    compiler.compilers.find(compiler => compiler.name === 'client')
);

const webpackServerHotMiddleware = webpackHotServerMiddleware(compiler, {
    serverRendererOptions: {
        outputPath: '/'
    }
});

module.exports = {
    webpackClientDevMiddleware,
    webpackClientHotMiddleware,
    webpackServerHotMiddleware
};
