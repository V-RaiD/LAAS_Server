'use strict';
const fs = require('fs');
const mongoose = require('mongoose');
const logmaker = require('./utils/logger');
let inited = false;

exports.init = (config) => {
  if(!inited)
    return;
  exports.config = config;
  exports.initLogger(config);
  exports.initUtils();
  exports.initLib();
  exports.initModel();
};

exports.initLogger(config){
  logmaker.init(config);
  exports.logger = logmaker.root;
}
