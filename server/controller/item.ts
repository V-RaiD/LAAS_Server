'use strict'
import mongoose = require('mongoose');
let Item = mongoose.model('Item'),
  wbshared = require('wb-shared'),
  log = wbshared.logger.child({ 'module': __filename.substring(__dirname.length + 1, __filename.length - 3) }),
  constants = wbshared.utils.constants;

exports.initSecured = (app) => {
  //<all : 4/men : 0/women : 1/kidb : 2/kidg : 3>
  app.get('/w1/item', getListItem);
  app.get('/w1/item/:id', getItem);
  app.get('/w1/itemquery', getQueryList);
};

exports.initAdmin = (app) => {
  app.post('/w1/item', addItem);
  app.put('/w1/item', updateItem);
  app.del('/w1/item/:id', deleteItem);
  app.put('/w1/discount')
};

function* getQueryList(next) {
  try {
    let wbuser = this.document.wbuser;
    let query = this.query.lquery;
    log.info("Query Item : ", query);
    let itemQueryList = yield Item.find({ iName: { '$regex': query.toString() } }).select('iName clothType').exec();
    this.body = itemQueryList;
    this.status = 200;
    yield next;
  } catch (error) {
    log.error('Exception caught in Item query : ', error);
    this.body = "Error in processing Item Query request";
    this.status = 404;
  }
}
function* getItem(next) {
  try {
    let wbuser = this.document.wbuser;
    let id = this.params.id;
    log.info("Get Item : ", id);
    let itemStruct = yield Item.findOne({ _id: id }).exec();
    this.body = itemStruct;
    this.status = 200;
    yield next;
  } catch (error) {
    log.error('Exception caught in Item get : ', error);
    this.body = "Error in processing Item Get request";
    this.status = 404;
  }
}
function* getListItem(next) {
  try {
    let wbuser = this.document.wbuser;
    let typeList = this.query.type;
    log.info("Get List Item type : ", typeList);
    let itemList;
    if (typeList.toString() == 4) {
      itemList = yield Item.find({}).exec();
    }
    else {
      itemList = yield Item.find({ clothType: Number.parseInt(typeList) }).exec();
    }

    this.body = itemList;
    this.status = 200;
    yield next;
  } catch (error) {
    log.error('Exception caught in populating item list : ', error);
    this.body = "Error in processing Item List request";
    this.status = 404;
  }
}

function* addItem(next) {
  try {
    let body = this.request.fields;
    log.info('Body recieved in add item : ', body);
    let itemStruct = yield new Item(body).save();
    log.info("Add Item : ", itemStruct);
    this.body = itemStruct;
    this.status = 200;
    yield next;
  } catch (error) {
    log.error('Exception caught in adding item : ', error);
    this.body = "Error in processing Item Add request";
    this.status = 404;
  }
}

function* updateItem(next) {
  try {
    let body = this.request.fields;
    let itemStruct = yield Item.findOneAndUpdate({ _id: body._id }, body, { new: true });
    log.info("Update Item : ", itemStruct);
    this.body = itemStruct;
    this.status = 200;
    yield next;
  } catch (error) {
    log.error('Exception caught in updating Item : ', error);
    this.body = "Error in processing Item Update request";
    this.status = 400;
  }
}

function* deleteItem(next) {
  try {
    let itemId = this.params.id;
    let itemStruct = yield Item.findOneAndRemove({ _id: itemId });
    log.info("Delete Item : ", itemId);
    this.body = itemStruct;
    this.status = 200;
    yield next;
  } catch (error) {
    log.error('Exception caught in deleting Item : ', error);
    this.body = "Error in processing Item delete request";
    this.status = 400;
  }
}
