const uuid = require('uuid').v4;

module.exports = function (opts) {
  const header = (opts && opts.header) ? opts.header : 'X-Request-Id';

  return async function (ctx, next) {
    const id = ctx.get(header) || uuid();
    ctx.set(header, id);
    ctx.state.requestId = id;
    await next();
  };
}
