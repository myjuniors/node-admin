const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const app = new Koa()
require('./db')
const router = require('./router/common')
app.use(bodyParser())
app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(4000,() => {
    console.log('starting at port 4000');
})