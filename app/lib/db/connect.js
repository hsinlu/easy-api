const Promise = require('bluebird');
const mongoose = require('mongoose');
const logger = require('../logger');
const config = require('../../config');
mongoose.Promise = Promise;

require('./paginate');
if (config.debug) {
  mongoose.set('debug', function (coll, method, query, doc, options) {
    logger.db(`mongodb: db.${coll}.${method}(${JSON.stringify(query)}, ${JSON.stringify(options || {})});`);
  });
}

module.exports = () => mongoose.connect(config.db, {
  useMongoClient: true,
  config: {
    autoIndex: false
  }
});
