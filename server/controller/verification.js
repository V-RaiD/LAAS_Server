'use strict';
let co = require('co'), wbshared = require('wb-shared'), log = wbshared.logger.child({ 'module': __filename.substring(__dirname.length + 1, __filename.length - 3) });
exports.initPub = function (app) {
    app.get('/verification/hello', printWashbay);
};
function* printWashbay(next) {
    try {
        log.debug("Inside Print Washbay");
        this.body = "Hello Washbay";
        this.status = 200;
    }
    catch (err) {
        this.body = "Error in processing Hello Washbay";
        this.status = 404;
        log.debug('Error : ', err);
    }
}
