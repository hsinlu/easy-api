const mongoose = require('mongoose');
const logger = require('../logger');

const traceMQuery = (method, info, query) => {
  return (err, result, millis) => {
    if (err) {
      console.error('追踪 mongodb 查询错误:', err);
    }

    logger.trace(`${query._collection.collection.name}.${method} ${JSON.stringify(info)}`);
  };
};

mongoose.Mongoose.prototype.mquery.setGlobalTraceFunction(traceMQuery);
