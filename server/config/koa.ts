/**  Written By : Amitesh Rai */
'use strict';
import fs = require('fs');
import mongoose = require('mongoose');
let cors = require('koa-cors'), compress = require('koa-compress'), router = require('koa-router'),
  wbshared = require('wb-shared'), logger = wbshared.logger.child({ 'module': __filename.substring(__dirname.length + 1, __filename.length - 3) }),
  /** child logger concept says that we can create a sub logger for a specific module adding functionality for that
      specific module like adding koa as the module name in each of the logger feeds*/
  parse = require('koa-better-body'), config = wbshared.config, koajwt = require('koa-jwt'), User = mongoose.model('User');

module.exports = function(app) {
  app.use(
    cors(
      {
        maxAge: 3600, //default value is null, 3600 seconds is too big for a request and response result to be cached
        credentials: true,
        headers: 'Access-Control-Allow-Origin, Access-Control-Expose-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization',
        methods: 'GET, HEAD, OPTIONS, PUT, POST, DELETE'
      }
    )
  );

  app.use(
    function* (next) {
      this.req.connection.setTimeout(0);  //removes the default timeout of connection i.e. 2 minutes
      this.req.connection.setNoDelay(true); /**will set delay to false and data would be fired
                                          immediately after calling socket.write
                                            */
      yield next;
    }
  );

  app.use(
    compress() /** used for compressing the data in request and response
                   options : filter @default compresser ; or "".test(content-type) #it is for filtering wether content
                                                                                   #is compressable or not
                           : threshold @default 1024 bytes ; or setable according to requirement
                  */
  );

  let pubRouter = router();   /**  koa-router function gets encapsulated in the variables pubRouter,
                                   secRouter, adminRouter */
  let secRouter = router();
  let adminRouter = router();

  fs.readdirSync('./server/controller').forEach(function(file) {
    if (!file.endsWith('.js'))
      return;
    let controller = require('../controller/' + file);
    if (controller.initAdmin)
      controller.initAdmin(adminRouter); //Each controller gets now instantiated by passing the router function
    if (controller.initPub)                //the router function @stacks a key value (see Layer.js for exact details of arrays) pair
      controller.initPub(pubRouter);    // for path and function and loads all the functions in there
    if (controller.initSecured)           //specific router(i.e. pub,admin,sec) @stacks
      controller.initSecured(secRouter);
  });

  app.use(
    parse(
      {
        multipart: true, /** HTTP multipart request (data) is concatenated if flagged as true*/
        formidable: {
          uploadDir: config.appConfig.app.uploads  //files that are non parsable like images are uploaded to the directory
        }
      }
    )
  );

  app.use(
    function* (next) {
      this.log = logger;
      logger.debug('Request : ', this.request); /**  Koa Logging request recieved */
      try {
        yield next;
      } catch (err) {
        logger.error('Error : ', err);
        this.status = err.status || 500;
        this.body = { err: err.message };
        this.app.emit('error', err, this);
      }
    }
  );

  app.use(
    pubRouter.routes()  /**  Returns a route matching this.path */
  );

  app.use(
    function* (next) {
      if (pubRouter.match(this.path, this.method).pathAndMethod.length) {
        return; /**  if the route matches then th function gets executed and response returns */
      }
      yield next;
    }
  );

  app.use(

    /**
        Using koa-jwt
        usage :
        jwt({<options>})

        options : key value pairs
        secret : <string/or a encrypted key buffer>
        key : pay load identifier post decryption of Token <this.state.key>
        algorithm : define encryptiona and decryption algorithm
                    default algo is  <[HS256,HS384,HS512]>
     */
    koajwt({ secret: config.systemConfig.app.privateKey, key: "wbuser" })
  );

  app.use(
    function* (next) {
      /**
          koa-jwt decrypts the authToken and stores the content by default in this.state.user
          and for a provided key it stores in this.state.<key>
       */
      let wbuser = yield User.findById(this.state.wbuser._id).exec();
      this.document = {};
      this.document.wbuser = wbuser;

      yield next;
    }
  );

  app.use(
    function* (next) {
      logger.debug({ request: this.request, body: this.request.body });
      yield next;
      logger.debug({ response: this.response, body: this.response.body });
    }
  );

  app.use(
    secRouter.routes()  /**  Returns a route matching this.path */
  );

  app.use(
    function* (next) {
      if (secRouter.match(this.path, this.method).pathAndMethod.length) {
        return; /**  if the route matches then th function gets executed and response returns */
      }
      //yield next;
    }
  );
}
