const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const conditional = require('koa-conditional-get')
const etag = require('koa-etag')
const mongoose = require('mongoose')
const cors = require('kcors')
const process = require('process')
const signature = require('./middleware/signature')
const globalErrorHandler = require('./middleware/globalErrorHandler')
const validator = require('./middleware/validator')
const requestId = require('./middleware/requestId')
const config = require('./config')
const visitLogger = require('./middleware/visitLogger')
const logger = require('./lib/logger')
const apiV1 = require('./api/v1')
const app = new Koa()

process.env.TZ = 'Asia/Shanghai'

process
  .on('uncaughtException', (err) => {
    logger.error('进程未捕获错误: ', err)
  })

!(async function run() {
  try {
    // 连接 mongodb
    await require('./lib/db/connect')()
    logger.info('mongodb 已成功连接，开始启动服务。')
  } catch (err) {
    logger.fatal('mongodb 连接错误', err)
  }

  // 是否追踪访问日志
  if (config.traceVisitLogs) app.use(visitLogger)

  app
    // 全局错误处理
    .use(globalErrorHandler)
    // 校验客户端签名
    .use(signature().unless({
      path: [/^\/api\/v[1-9]+\/open/]
    }))
    // 跨域处理
    .use(cors({
      // 返回可以跨域访问的url
      origin: function (ctx) {
        const origin = this.get('origin')
        if (config.cors.allowOrigins.includes(origin)) {
          return origin
        }

        return false
      }
    }))
    .use(requestId())
    // 内容没有变化时返回304，减少网络带宽消耗
    .use(conditional())
    // ETag
    .use(etag())
    // 解析请求体
    .use(bodyParser())
    // 验证器
    .use(validator)
    // 加载 api 接口
    .use(apiV1.routes())
    .use(apiV1.allowedMethods())
    // 错误处理
    .on('error', (err, ctx) => {
      logger.error('应用发生错误: ', err, ctx)
    })

  const port = process.env.PORT || 8000
  app.listen(port)
  logger.info(`api服务已成功在端口${port}启动`)
})()
