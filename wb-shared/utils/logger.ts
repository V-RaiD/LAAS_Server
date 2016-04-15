use 'strict';

var bunyan = require('bunyan');

module.exports = logger = function(config){
  logger.root = bunyan.createLogger(
    {
      name : 'root',
      streams : [
        {
          level : config.systemConfig.log.level,
          stream : process.stdout   //type is defaulted to 'stream'
        },
        {
          level : config.systemConfig.log.level,  // this is the level of error logs
          path : config.systemConfig.log.path,  //path of log file where logs are going to be written to
                                                // type is defaulted to 'file'
          type : 'rotating-file',  //this is responsible for creating back copies of log files overwriting default
          period : '1d',  //this is the period of rotation for creating back copies
          count : 3,  //this is the number of back copies to be made
        }
      ]
    }
  );
}
