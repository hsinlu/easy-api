const auth = require('../../middleware/auth')

const api = require('koa-router')({
  prefix: '/api/v1'
})

// 公开的api，不需要签名、授权验证
api.use('/open', require('./open').routes())
api.use('/auth', require('./auth').routes())

module.exports = api
