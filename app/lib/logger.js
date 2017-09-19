const log4js = require('log4js')
const config = require('../config')

if (config.debug) {
  log4js.configure({
    appenders: {
      stdout: { type: 'stdout' }
    },
    categories: {
      default: { appenders: ['stdout'], level: 'ALL' }
    }
  })
} else {
  const categories = ['trace', 'info', 'error', 'fatal']
  const appenders = {}
  categories.forEach((category) => appenders[category] = {
    type: 'dateFile',
    absolute: false,
    filename: config.paths.logs,
    maxLogSize: 1024 * 1024,
    pattern: `/yyyyMMddhh_${category}.log`,
    alwaysIncludePattern: true
  })
  appenders.smtp = {
    type: "smtp",
    recipients: config.smtp.recipients,
    sendInterval: 60,
    transport: "SMTP",
    sender: config.smtp.SMTP.auth.user,
    SMTP: config.smtp.SMTP
  }
  appenders.mail = {
    type: 'logLevelFilter',
    appender: 'smtp',
    level: 'error'
  }

  log4js.configure({
    appenders,
    categories: {
      default: { appenders: ['trace'], level: 'trace' },
      info: { appenders: ['info'], level: 'info' },
      error: { appenders: ['error', 'mail'], level: 'error' },
      fatal: { appenders: ['fatal', 'mail'], level: 'fatal' }
    },
    pm2: true
  })
}

const traceLogger = log4js.getLogger()
const infoLogger = log4js.getLogger('info')
const errorLogger = log4js.getLogger('error')
const fatalLogger = log4js.getLogger('fatal')

module.exports.trace = traceLogger.trace.bind(traceLogger)
module.exports.info = infoLogger.info.bind(infoLogger)
module.exports.error = errorLogger.error.bind(errorLogger)
module.exports.fatal = fatalLogger.fatal.bind(fatalLogger)
