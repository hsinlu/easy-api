const debug = require('debug')('easy-api:api:open');
const router = require('koa-router')();
const appname = require('../../../package').name;

router
  .get('/timestramp', async (ctx) => {
    ctx.body = new Date().toLocaleString();
  })
  .get('/who', async (ctx) => {
    ctx.body = appname;
  });

module.exports = router;
