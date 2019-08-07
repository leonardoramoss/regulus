const path = require('path');
const express = require('express');
const compression = require('compression');
const helmet = require('helmet');

const server = express();

server.set('views', path.join(__dirname, 'views', 'templates'));
server.set('view engine', 'pug');

server.use(express.static(__dirname));
server.use(helmet());
server.use(compression());

module.exports = server;
