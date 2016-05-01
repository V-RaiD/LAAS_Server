'use strict';
const fs = require('fs');
const mongoose = require('mongoose');
const logmaker = require('./utils/logger');
let inited = false;

exports.init = (config) => {
  if(inited)
    return;
  inited = true;
  exports.config = config;
  exports.initLogger(config);
  exports.initModels();
};

exports.initLogger = (config) => {
  logmaker.init(config);
  exports.logger = logmaker.root;
};

/*
if same mongoose instance (@<the one declared above>)is used to
register the model (@<the one used inside** the require('@modelpath')>),
then the same mongoose instance can used to access them on
creating a connection pool (@<the one used in the initDatabase
for establishing the connection>).
**The mongoose inside the require would reference the same mongoose instance
  because of nodejs' property of single object multiple reference
*/
exports.initModels = () => {
  exports.models = {};
  var modelPath = __dirname + '/models';
  fs.readdirSync(modelPath).forEach(function (file){
    if(file.indexOf('js')){
      exports.models[file.substring(0, file.length - 3)] = require(modelPath + '/' + file);
    }
  });
}

exports.initDatabase(){
  var database = exports.database = {mongoose : null};

  
}
