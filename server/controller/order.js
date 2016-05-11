'use strict';
const mongoose = require('mongoose');
let Item = mongoose.model('Item'), wbshared = require('wb-shared'), log = wbshared.logger.child({ 'module': __filename.substring(__dirname.length + 1, __filename.length - 3) }), constants = wbshared.utils.constants, User = mongoose.model('User'), Transaction = mongoose.model('Transaction');
exports.initSecured = (app) => {
    app.post('/w1/order', addTransaction);
    app.put('/w1/order/:tid', putOrder);
    app.del('/w1/order/:tid/:id', deleteOrder);
    app.put('/w1/order/:tid/:id', updateOrder);
    app.del('/w1/order/:tid', deleteTransaction);
};
exports.initAdmin = (app) => {
};
function* addTransaction(next) {
    try {
        let wbuser = this.document.wbuser;
        let body = this.request.fields;
        let transaction = Transaction.defTransactionSchema();
        transaction.user = wbuser._id;
        let transactionFin = yield new Transaction(transaction).save();
        this.body = transactionFin;
        this.status = 200;
        yield next;
    }
    catch (error) {
        log.error('Exception caught in Transaction add : ', error);
        this.body = "Error in processing Transaction add request";
        this.status = 404;
    }
}
function* deleteTransaction(next) {
    try {
        let wbuser = this.document.wbuser;
        let tid = this.params.tid;
        yield Transaction.findOneAndRemove({ _id: tid }).exec();
        this.body = "Transaction deleted";
        this.status = 200;
    }
    catch (error) {
        log.error('Exception caught in Transaction delete : ', error);
        this.body = "Error in processing Transaction delete request";
        this.status = 404;
    }
}
function* putOrder(next) {
    try {
        let wbuser = this.document.wbuser;
        let id = this.params.tid;
        let body = this.request.fields;
        log.info('Body recieved in put order : ', body);
        if (!body.status) {
            body.status = constants.OBUCKET;
        }
        let itemDetail = yield Item.findOne({ _id: body.item }).exec();
        switch (body.orderType) {
            case constants.SELECTO: {
                log.info('Selective cost');
                body.cost = yield tosToCost(body, itemDetail, 0);
                break;
            }
            case constants.COMMONO: {
                log.info('Common cost');
                body.cost = yield tosToCost(body, itemDetail, 0);
                break;
            }
            case constants.BULKO: {
                log.info('Bulk cost');
                body.cost = yield tosToCost(body, itemDetail, itemDetail.bulkFactor);
                break;
            }
        }
        ;
        body.cost = body.cost * body.quantity;
        let transaction = yield Transaction.findOneAndUpdate({ _id: id }, {
            '$push': {
                order: {
                    '$each': [body]
                }
            }
        }, {
            "new": true
        });
        transaction = yield Transaction.findOne({ _id: id, "order._id": transaction.order[transaction.order.length - 1] }, {
            "order.$": 1,
            "user": 1,
            "status": 1,
            "picktime": 1,
            "pickagent": 1,
            "cost": 1,
            "tax": 1,
            "created": 1,
            "modified": 1
        }).exec();
        this.body = transaction;
        this.status = 200;
        yield next;
    }
    catch (error) {
        log.error('Exception caught in Order put : ', error);
        this.body = "Error in processing Order put request";
        this.status = 404;
    }
}
function* deleteOrder(next) {
    try {
        let wbuser = this.document.wbuser;
        let tid = this.params.tid;
        let id = this.params.id;
        yield Transaction.findOneAndUpdate({ _id: tid }, {
            "$pull": {
                "order": {
                    "_id": id
                }
            }
        }).exec();
        this.body = "Deleted the order";
        this.status = 200;
    }
    catch (error) {
        log.error('Exception caught in Deleting Order : ', error);
        this.body = "Error in processing Order delete request";
        this.status = 404;
    }
}
function* updateOrder(next) {
    try {
        let wbuser = this.document.wbuser;
        let tid = this.params.tid;
        let id = this.params.id;
        let body = this.request.fields;
        if (!body.status) {
            body.status = constants.OBUCKET;
        }
        let itemDetail = yield Item.findOne({ _id: body.item }).exec();
        switch (body.orderType) {
            case constants.SELECTO: {
                log.info('Selective cost');
                body.cost = yield tosToCost(body, itemDetail, 0);
                break;
            }
            case constants.COMMONO: {
                log.info('Common cost');
                body.cost = yield tosToCost(body, itemDetail, 0);
                break;
            }
            case constants.BULKO: {
                log.info('Bulk cost');
                body.cost = yield tosToCost(body, itemDetail, itemDetail.bulkFactor);
                break;
            }
        }
        ;
        body.cost = body.cost * body.quantity;
        yield Transaction.findOneAndUpdate({ _id: tid, "order._id": id }, {
            "$set": {
                "order.$": body
            }
        }).exec();
        let update = yield Transaction.findOne({ _id: tid, "order._id": id }, {
            "order.$": 1
        }).exec();
        this.body = update;
        this.status = 200;
    }
    catch (error) {
        log.error('Exception caught in Updating Order : ', error);
        this.body = "Error in processing Order update request";
        this.status = 404;
    }
}
function* tosToCost(body, item, bfactor) {
    let cost = 0;
    if (body.tos == 0 || body.tos == 2) {
        switch (body.tow) {
            case (constants.CLASSICW): {
                cost += item.wcost.classic;
                cost += cost + (cost * bfactor / 100);
                break;
            }
            case (constants.SUPERW): {
                cost += item.wcost.super;
                cost += cost + (cost * bfactor / 100);
                break;
            }
            case (constants.ULTRAW): {
                cost += item.wcost.ultra;
                cost += cost + (cost * bfactor / 100);
                break;
            }
        }
    }
    if (body.tos == 1 || body.tos == 2) {
        cost += item.icost;
        cost += cost + (cost * bfactor / 100);
    }
    if (body.tos == 3) {
        cost += item.dcost;
        cost += cost + (cost * bfactor / 100);
    }
    return cost;
}
