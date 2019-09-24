// 1. 引入 mongoose
const mongoose = require('mongoose')

// 2. 获取模式对象
const Schema = mongoose.Schema

// 3. 声明模式对象（约束对象）
const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: Number,
    required: true
  },
  meta: {
    createTime: {
      type: Date,
      default: new Date()
    },
    updateTime: {
      type: Date,
      default: new Date()
    }
  }
})

userSchema.pre('save', function (next) {
  if (!this.isNew) {
    this.meta.updateTime = Date.now();
  }
  next();
})

// 4. 通过Schema对象创建Model对象
const Users = mongoose.model('Users', userSchema)


// 5. 曝露出去Model对象
module.exports = Users

