'use strict';

const fs = require('fs');
const url = require('url');
const path = require('path');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());

const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const envPublicUrl = process.env.PUBLIC_URL;

const ensureSlash = (path, needsSlash) => {
    const hasSlash = path.endsWith('/');
    if (hasSlash && !needsSlash) {
        return path.substr(path, path.length - 1);
    } else if (!hasSlash && needsSlash) {
        return `${path}/`;
    } else {
        return path;
    }
};

const getPublicUrl = appPackageJson =>
    envPublicUrl || require(appPackageJson).homepage;

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// Webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
const getServedPath = appPackageJson => {
    const publicUrl = getPublicUrl(appPackageJson);
    const servedUrl =
        envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/');
    return ensureSlash(servedUrl, true);
};

// config after eject: we're in ./config/
module.exports = {
    appSrc: resolveApp('src'),
    dotenv: resolveApp('.env'),
    webpackDev: resolveApp('webpack/webpack.config.dev.js'),
    webpackProd: resolveApp('webpack/webpack.config.prod.js'),
    yarnLockFile: resolveApp('yarn.lock'),
    appIndex: resolveApp('src/index.js'),
    appRender: resolveApp('src/render.js'),
    appServer: resolveApp('src/server.js'),
    appPackageJson: resolveApp('package.json'),
    appNodeModules: resolveApp('node_modules'),
    appDist: ensureSlash(resolveApp('dist'), true),
    appBuild: ensureSlash(resolveApp('build'), true),
    appPublic: ensureSlash(resolveApp('public'), true),
    publicUrl: getPublicUrl(resolveApp('package.json')),
    servedPath: getServedPath(resolveApp('package.json'))
};
