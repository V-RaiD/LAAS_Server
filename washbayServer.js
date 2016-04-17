'use strict';
var wbshared = require('wb-shared');
var config = require('./server/config/config');
wbshared.init(config);
var log = wbshared.logger.child({ 'module': __filename.substring(__dirname.length + 1, __filename.length - 3) });
var co = require('co');
var koa = require('koa');
var app = module.exports = koa();
var koaConfig = require('./server/config/koa');
koaConfig(app);
if (!module.parent) {
    app.listen(3000);
}
else {
    process.exit(1);
}
