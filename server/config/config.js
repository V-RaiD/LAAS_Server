'use strict';
let path = require('path');
module.exports = {
    appConfig: {
        app: {
            name: 'WashBay.in',
            version: '0.01',
            uploads: __dirname + '/../../uploads'
        }
    },
    systemConfig: {
        mongo: {
            debug: true,
            seed: false,
            host: '127.0.0.1',
            port: '27017'
        },
        log: {
            level: 'debug',
            path: __dirname + '/../../logs/washbay.log'
        }
    }
};
