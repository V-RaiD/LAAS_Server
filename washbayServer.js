'use strict';
var wbshared = require('wb-shared');
var config = require('./server/config/config');
wbshared.init(config);
var co = require('co');
var koa = require('koa');
var app = module.exports = koa();
var koaConfig = require('./server/config/koaconfig');
koaConfig(app);
if (!module.parent) {
    app.listen(3000);
}
else {
    process.exit(1);
}
