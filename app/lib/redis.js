const redis = require('redis')
const bluebird = require('bluebird')
const config = require('../config')

bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

const client = redis.createClient(config.redis)

client.on('error', (err) => {
  if (err) {
    logger.error('connect to redis error, check your redis config', err)
    process.exit(1)
  }
})

module.exports = client
module.exports.prefix = 'easy-api/'
