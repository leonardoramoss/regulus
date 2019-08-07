'use strict';

process.env.NODE_ENV = 'development';

const http = require('http');
const dotenv = require('dotenv');
const paths = require('../config/paths');
const {
    webpackClientDevMiddleware,
    webpackClientHotMiddleware,
    webpackServerHotMiddleware
} = require('../middlewares/webpack-dev-middleware');

// eslint-disable-next-line
const server = require(paths.appServer);

dotenv.config({
    path: paths.dotenv
});

const { PORT, NODE_ENV, HOSTNAME } = process.env;

server.use(webpackClientDevMiddleware);
server.use(webpackClientHotMiddleware);
server.use(webpackServerHotMiddleware);
server.set('port', PORT);

const nodeServer = http.createServer(server);

/* eslint-disable */
webpackClientDevMiddleware.waitUntilValid(result => {
    nodeServer.listen(PORT, () => console.log(`Server listening on http://${HOSTNAME}:${PORT} in ${NODE_ENV}`));
});
/* eslint-enable */
