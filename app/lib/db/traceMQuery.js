const mongoose = require('mongoose');
const debug = require('debug')('easy-api:db:traceMQuery');
const config = require('../../config');;

const traceMQuery = function (method, info, query) {
  return function (err, result, millis) {
    if (err) {
      console.error('追踪 mongodb 查询错误:', err)
    }

    debug(`${query._collection.collection.name}.${method} ${JSON.stringify(info)}`);
  };
};

mongoose.Mongoose.prototype.mquery.setGlobalTraceFunction(traceMQuery);
