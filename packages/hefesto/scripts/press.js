'use strict';

process.env.NODE_ENV = 'production';

/*eslint-disable*/
const webpack = require('webpack');

const webpackConfigProd = require('../webpack/webpack.config.prod.js');
const paths = require('../config/paths');

const compiler = webpack(webpackConfigProd);

compiler.run((err, stats) => {
    if (stats.hasErrors()) {
        console.log('Erro', err);
    }
});
