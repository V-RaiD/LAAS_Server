'use strict';
/*
**written by Amitesh Rai
*/
/*
**start of the washbay app server,
**Initiates database connection and starts listenning to configured port
*/

/*
**local dependencies loading
*/

var wbshared = require('wb-shared');
var config = require('./server/config/config');

/*
**Initialising Utils, Libraries, MongoSuite
*/
wbshared.init(config);
var log = wbshared.logger.child({'module': __filename.substring(__dirname.length+1, __filename.length-3)});
/*
**core dependencies loading
*/
var co = require('co');
var koa = require('koa');

/*
**export variables
*/
log.info('Initiating koa config');
var app = module.exports = koa();

/*
**middleware config variables
*/
var koaConfig = require('./server/config/koa');
  //log.debug('Koa Initialised', koaConfig);
/*
**configuring koa middleware
*/
koaConfig(app);

/*
**server start/stop
*/
log.info('Testing startup')
var promiseServer = new Promise(function (resolve, reject){
  log.info('Setting up Mongo DB');

  if(!wbshared.database)
  {
    co(wbshared.initDatabase()).then();
  }

  log.info('Starting washbay server . . . ');
  if(!module.parent){
    app.server = app.listen(config.systemConfig.app.port);
    resolve(true);
  }
  else{
    reject(new Error("error in starting"));
  }
});
 log.info('Tester post promisifing');
promiseServer.then(
  function () {
    log.info('Washbay server is running on port : ', config.systemConfig.app.port);
  }
).catch(
  function (error) {
    log.error('Washbay server interrupted : ', error);
  }
);
