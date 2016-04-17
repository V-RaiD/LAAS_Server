'use strict';
var bunyan = require('bunyan');
module.exports = logger = function (config) {
    logger.root = bunyan.createLogger({
        name: 'root',
        serializers: {
            err: bunyan.stdSerializers.err,
            req: bunyan.stdSerializers.req,
            res: bunyan.stdSerializers.res
        },
        streams: [
            {
                level: config.systemConfig.log.level,
                stream: process.stdout
            },
            {
                level: config.systemConfig.log.level,
                path: config.systemConfig.log.path,
                type: 'rotating-file',
                period: '1d',
                count: 3,
            }
        ],
        src: true
    });
};
