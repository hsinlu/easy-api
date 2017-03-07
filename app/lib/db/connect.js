const Promise = require('bluebird');
const mongoose = require('mongoose');
const config = require('../../config');
mongoose.Promise = Promise;

require('./paginate');
config.debug && require('./traceMQuery');

module.exports = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(config.db, (err) => {
      if (err) return reject(err);

      resolve();
    });
  });
}
