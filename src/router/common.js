// 使用 koa-router路由中间件
const Router = require('koa-router')
const Users = require('../model/user')
const router = new Router()
 
router.post('/login', async (ctx) => {
  const postData = ctx.request.body
  if (postData && postData.username && postData.password) {
    const user = await Users.findOne({username: postData.username, password: postData.password})
    if (user && user.id) {
      result = {
        resultCode: 0,
        message: '成功',
        data: user
      }
    } else {
      result = {
        resultCode: -1,
        message: '用户名或者密码错误'
      }
    }
    ctx.body = result      
  }
}).post('/registry', async (ctx) => {
  const postData = ctx.request.body
  if (postData && postData.username && postData.password) {
    let result;
    const user = await Users.findOne({ username: postData.username})
    console.log(user)
    if (user && user.id) {
      result = {
        resultCode: -1,
        message: '该用户已经注册过了，请前往登录'
      }
    } else {
      const user = new Users({
        username: postData.username,
        password: postData.password
      })
      user.save()
      result = {
        resultCode: 0,
        message: '注册成功了'
      }
    }
    ctx.body = result
  }
})

module.exports = router