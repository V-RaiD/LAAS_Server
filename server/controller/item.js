'use strict';
const mongoose = require('mongoose');
let Item = mongoose.model('Item'), wbshared = require('wb-shared'), log = wbshared.logger.child({ 'module': __filename.substring(__dirname.length + 1, __filename.length - 3) }), constants = wbshared.utils.constants;
exports.initSecured = (app) => {
    app.get('/w1/item/');
};
exports.initAdmin = (app) => {
};
