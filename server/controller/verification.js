'use strict';
let co = require('co'), wbshared = require('wb-shared'), log = wbshared.logger.child({ 'module': __filename.substring(__dirname.length + 1, __filename.length - 3) });
exports.initPub = function (app) {
    app.get('/verification/hello', printWashbay);
    app.post('/verification/signup', signUp);
};
function* signUp(next) {
    try {
        let body = this.request.fields;
        this.status = 200;
    }
    catch (error) {
        log.error('Exception caught in signUp : ', error);
        this.body = "Error in processing SignUp Request";
        this.status = 404;
    }
}
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
