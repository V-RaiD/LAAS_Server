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

/*
**core dependencies loading
*/
var co = require('co');
var koa = require('koa');

/*
**export variables
*/

var app = module.exports = koa();

/*
**middleware config variables
*/
var koaConfig = require('./server/config/koaconfig');

/*
**configuring koa middleware
*/
koaConfig(app);

/*
**server start/stop
*/

if(!module.parent){
  app.listen(3000);
}
else{
  process.exit(1);
}
