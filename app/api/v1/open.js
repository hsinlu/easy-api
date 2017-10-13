const router = require('koa-router')();

router
  .get('/timestramp', async (ctx) => {
    ctx.body = new Date().toLocaleString();
  });

module.exports = router;
