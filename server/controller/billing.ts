'use strict'
import mongoose = require('mongoose');
let Item = mongoose.model('Item'),
  wbshared = require('wb-shared'),
  log = wbshared.logger.child({ 'module': __filename.substring(__dirname.length + 1, __filename.length - 3) }),
  constants = wbshared.utils.constants,
  User = mongoose.model('User'),
  Transaction = mongoose.model('Transaction');

exports.initSecured = (app) => {
  app.get('/w1/bill/:tid', getBill);
}

exports.initAdmin = (app) => {

}

function* getBill(next) {
  try {
    let wbuser = this.document.wbuser;
    let tid = this.params.tid;


  } catch (error) {
    log.error('Exception caught in Generate bill : ', error);
    this.body = "Error in processing Generate bill request";
    this.status = 404;
  }
}
