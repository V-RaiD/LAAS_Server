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
    app: {
      port: '9135',
      pubKey: __dirname + '/../../keys/washbay.pub',
      privateKey: __dirname + '/../../keys/washbay'
    },
    mongo: {
      debug: true,
      seed: false,
      host: '127.0.0.1',
      port: '27017',
      dbname: 'washbay-dev'
    },
    log: {
      level: 'debug',
      path: __dirname + '/../../logs/washbay.log'
    }
  }
}
