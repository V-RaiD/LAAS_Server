'use strict';
const fs = require('fs');
let cors = require('koa-cors'), compress = require('koa-compress'), router = require('koa-router'), wbshared = require('wb-shared'), logger = wbshared.logger.child({ 'module': __filename.substring(__dirname.length + 1, __filename.length - 3) });
parse = require('koa-better-body');
module.exports = function (app) {
    app.use(cors({
        maxAge: 3600,
        credentials: true,
        headers: 'Access-Control-Allow-Origin, Access-Control-Expose-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization',
        methods: 'GET, HEAD, OPTIONS, PUT, POST, DELETE'
    }));
    app.use(function () {
        this.req.connection.setTimeout(0);
        this.req.connection.setNoDelay(true);
    });
    app.use(compress());
    let pubRouter = router();
    let secRouter = router();
    let adminRouter = router();
    fs.readdirSync('./server/controllers').forEach(function (file) {
        if (!file.endsWith('.js'))
            return;
        let controller = require('../controllers/' + file);
        if (controller.initAdmin)
            controller.initAdmin(adminRouter);
        if (controller.initPub)
            controller.initPub(pubRouter);
        if (controller.initSecured)
            controller.initSecured(secRouter);
    });
    app.use(parse({
        multipart: true,
        formidable: {
            uploadDir: config.appConfig.app.uploads
        }
    }));
    app.use(function* (next) {
        this.log = logger;
        logger.debug('Request : ', this.request);
        try {
            yield next;
        }
        catch (err) {
            logger.error('Error : ', err);
            this.status = err.status || 500;
            this.body = { err: err.message };
            this.app.emit('error', err, this);
        }
    });
    app.use(pubRouter.routes());
    app.use(function* next() {
        if (pubRouter.match(this.path, this.method).pathAndMethod.length) {
            return;
        }
        yield next;
    });
};
