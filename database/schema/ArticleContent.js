const mongoose = require('mongoose')
const Schema=mongoose.Schema // 申明scheme
const ArticleContentSchema = new Schema({
  id: String,
  userId:String, // 用户id
  title:String,
  content: String,
  articleId: String,
  createTime:{type:Date, default:Date.now()},
  modifiedTime: String
}, {
  collections: 'ArticleContent'
})

mongoose.model("ArticleContent", ArticleContentSchema)