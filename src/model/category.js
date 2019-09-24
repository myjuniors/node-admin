// 1. 引入 mongoose
const mongoose = require('mongoose')

// 2. 获取模式对象
const Schema = mongoose.Schema

// 3. 声明模式对象（约束对象）
const categorySchema = new Schema({
  parentId: {
    type: String,
    required: true
  },
  name: {
    type: String,
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

categorySchema.pre('save', function (next) {
  if (!this.isNew) {
    this.meta.updateTime = Date.now();
  }
  next();
})

// 4. 通过Schema对象创建Model对象
const Categorys = mongoose.model('Categorys', categorySchema)


// 5. 曝露出去Model对象
module.exports = Categorys

