const log4js = require('koa-log4');
const config = require('../config');

log4js.configure({
  appenders: [{
    type: 'console'
  }, {
    type: 'dateFile',
    absolute: false,
    filename: config.paths.logs,
    maxLogSize: 1024 * 1024,
    pattern: '/yyyyMMddhh_visit.log',
    // backups: 3,
    category: 'visit',
    alwaysIncludePattern: true
  }, {
    type: 'dateFile',
    absolute: false,
    filename: config.paths.logs,
    maxLogSize: 1024 * 1024,
    pattern: '/yyyyMMddhh_info.log',
    // backups: 3,
    category: 'info',
    alwaysIncludePattern: true
  }, {
    type: 'dateFile',
    absolute: false,
    filename: config.paths.logs,
    maxLogSize: 1024 * 1024,
    pattern: '/yyyyMMddhh_error.log',
    // backups: 3,
    category: 'error',
    alwaysIncludePattern: true
  }, {
    type: 'dateFile',
    absolute: false,
    filename: config.paths.logs,
    maxLogSize: 1024 * 1024,
    pattern: '/yyyyMMddhh_fatal.log',
    // backups: 3,
    category: 'fatal',
    alwaysIncludePattern: true
  }, {
    type: "logLevelFilter",
    level: "ERROR",
    maxLeve: "FATAL",
    appender: {
      type: "smtp",
      recipients: config.recipients,
      sendInterval: 60,
      transport: "SMTP",
      sender: config.SMTP.auth.user,
      SMTP: {
        host: config.SMTP.host,
        secureConnection: true,
        port: config.SMTP.port,
        auth: {
          user: config.SMTP.auth.user,
          pass: config.SMTP.auth.pass
        },
        debug: config.debug
      },
      category: "mailer"
    }
  }]
});

const visitLogger = log4js.getLogger('visit');
const infoLogger = log4js.getLogger('info');
const errorLogger = log4js.getLogger('error');
const fatalLogger = log4js.getLogger('fatal');

class Logger {
  visit() {
    visitLogger.trace.apply(visitLogger, arguments);
  }

  info() {
    infoLogger.info.apply(infoLogger, arguments);
  }

  error() {
    errorLogger.error.apply(errorLogger, arguments);
  }

  fatal() {
    fatalLogger.fatal.apply(fatalLogger, arguments);
  }
}

module.exports = new Logger;
