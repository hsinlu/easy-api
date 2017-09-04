const Promise = require('bluebird')
const mongoose = require('mongoose')
const config = require('../../config')
mongoose.Promise = Promise

require('./paginate')
config.debug && require('./traceMQuery')

module.exports = () => mongoose.connect(config.db, {
  useMongoClient: true
})
