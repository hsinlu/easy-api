const crypto = require('crypto');
const unless = require('koa-unless');
const debug = require('debug')('easy-api:middleware:signature');
const config = require('../config');

// 时间戳间隔时间（秒）
const TIMESTAMP_INTERVAL_SECONDS = 20;

function sha256(cleartext) {
  const hash = crypto.createHash('sha256');
  hash.update(cleartext);

  return hash.digest('hex').toUpperCase();
}

module.exports = function (opts) {
  const middleware = async (ctx, next) => {
    if (config.debug) {
      return await next();
    }

    const { timestamp, signature } = ctx.headers;

    debug(`客户端 时间戳: ${timestamp} 签名: ${signature}`);

    if (!timestamp || !signature) {
      ctx.throw(400, '签名校验不正确');
    }

    const serverTimestamp = Math.floor(new Date().getTime() / 1000);

    debug(`服务端 时间戳: ${serverTimestamp}`);

    // 请求应在 TIMESTAMP_INTERVAL_SECONDS 秒之内
    if (timestamp > (serverTimestamp + TIMESTAMP_INTERVAL_SECONDS)
      || timestamp < (serverTimestamp - TIMESTAMP_INTERVAL_SECONDS)) {
      ctx.throw(400, `请求应在${TIMESTAMP_INTERVAL_SECONDS}秒之内`);
    }

    const serverSignature = sha256(`${timestamp}${config.client.appkey}${config.client.token}${timestamp}`);

    debug(`服务端 签名: ${serverSignature}`);

    // 与服务端计算出的签名必须一致
    if (signature !== serverSignature) {
      ctx.throw(400, '签名校验不正确');
    }

    await next();
  };

  middleware.unless = unless;

  return middleware;
};
