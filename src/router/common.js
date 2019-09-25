// 使用 koa-router路由中间件
const Router = require('koa-router')
const Users = require('../model/user')
const Categorys = require('../model/category')
const Roles = require('../model/role')
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
}).post('/addCategory', async (ctx) => {
  const postData = ctx.request.body
  if (postData && postData.categoryId && postData.categoryName) {
    let result;
    const category = await Categorys.findOne({ parentId: postData.categoryId, categoryName: postData.categoryName})
    console.log(category)
    if (category && category.id) {
      result = {
        resultCode: -1,
        message: '该分类已经添加过了，请重新添加'
      }
    } else {
      const category = new Categorys({
        parentId: postData.categoryId,
        name: postData.categoryName
      })
      category.save()
      result = {
        resultCode: 0,
        message: '分类添加成功了'
      }
    }
    ctx.body = result
  }
}).post('/updateCategory', async (ctx) => {
  const postData = ctx.request.body
  if (postData && postData.categoryId && postData.categoryName) {
    let result
    const res = await Categorys.updateOne({ _id: postData.categoryId}, { name: postData.categoryName})
    if (res && res.n) {
      result = {
        resultCode: 0,
        message: '修改成功了'
      }
    } else {
      result = {
        resultCode: -1,
        message: '修改失败了'
      }
    }
    ctx.body = result
  }
}).get('/getCategoryList', async (ctx) => {
  const parentId = ctx.query.parentId
  let result
  const categorys = await Categorys.find({parentId})
  if (categorys.length) {
    result = {
      resultCode: 0,
      message: '成功', 
      data: categorys
    }
  } else {
    result = {
      resultCode: 0,
      message: '成功',
      data: []
    }
  }
  ctx.body = result
}).post('/addRole', async (ctx) => {
  const postData = ctx.request.body
  if (postData && postData.roleName) {
    let result
    const role = await Roles.create({
      name: postData.roleName,
      menus: []
    })
    if (role && role.id) {
      result = {
        resultCode: 0,
        message: '成功', 
        data: role
      }
    } else {
      result = {
        resultCode: -1,
        message: '添加失败了'
      }
    }
    ctx.body = result
  }
}).get('/getRoles', async (ctx) => {
  let result
  const roles = await Roles.find({})
  if (roles.length) {
    result = {
      resultCode: 0,
      message: '成功', 
      data: roles
    }
  } else {
    result = {
      resultCode: -1,
      message: '获取角色列表失败'
    }
  }
  ctx.body = result
}).post('/setPremission', async (ctx) => {
  const postData = ctx.request.body
  if (postData && postData.name && postData.authName) {
    let result
    const res = await Roles.updateOne({name: postData.name}, {
      authName: postData.authName,
      menus: postData.menus
    })
    if (res&& res.n) {
      result = {
        resultCode: 0,
        message: '成功'
      }
    } else {
      result = {
        resultCode: -1,
        message: '修改失败'
      }
    }
    ctx.body = result
  }
})

module.exports = router