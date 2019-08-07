#!/usr/bin/env node

'use strict';

// eslint-disable-next-line
const { spawn } = require('child_process');

const script = process.argv.slice(2)[0];

const argsDev = ['--inspect', require.resolve('./scripts/hammer')];

const argsProd = [require.resolve('./scripts/press')];

const spawnOptions = {
    stdio: 'inherit',
    shell: true,
    env: {
        ...process.env,
        WEBPACK_CLIENT: './webpack'
    }
};

switch (script) {
    case 'start':
        spawn('node', argsDev, spawnOptions);
        break;
    case 'build':
        spawn('node', argsProd, spawnOptions);
        break;
    default:
        break;
}
