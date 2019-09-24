// 1. 引入 mongoose
const mongoose = require('mongoose')

// 2. 连接数据库
mongoose.connect('mongodb://localhost:27017/mongoose_admin', { useNewUrlParser: true, useUnifiedTopology: true })

// 3. 绑定监听事件
mongoose.connection.once('open', () => {
  console.log('数据库连接成功了')
})