const logger = require('../lib/logger');

module.exports = async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  logger.visit(`ip: ${ctx.ip} method: ${ctx.method} url: ${ctx.url} headers: ${JSON.stringify(ctx.headers)} - ${ms}ms`);
};
