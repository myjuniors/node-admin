// 1. 引入 mongoose
const mongoose = require('mongoose')

// 2. 获取模式对象
const Schema = mongoose.Schema

// 3. 声明模式对象（约束对象）
const roleSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  menus: {
    type: Array,
    required: true
  },
  authName: {
    type: String
  },
  meta: {
    createTime: {
      type: Date,
      default: new Date()
    },
    authTime: {
      type: Date,
      default: new Date()
    }
  }
})

roleSchema.pre('save', function (next) {
  if (!this.isNew) {
    this.meta.authTime = Date.now()
  }
  next()
})

// 4. 通过Schema对象创建Model对象
const Roles = mongoose.model('Roles', roleSchema)


// 5. 曝露出去Model对象
module.exports = Roles

