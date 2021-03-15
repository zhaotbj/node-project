const mongoose = require('mongoose')
const Schema=mongoose.Schema // 申明scheme
const articleSchema = new Schema({
  id: {type: String, default: new Date().getTime().toString()},
  userId:String, // 用户id
  userName:String, // 用户名
  title: String,
  content:String,
  summary: String, //文章简介
  category: Number, //  文章类型
  readNumber: Number, // 章阅读量
  commentNumber: Number, // 文章评论数
  thumbUpNumber: Number, // 文章点赞数
  time:{type: String, default: Date.now().toString()} , //  创建时间
  createTime:{type:String, default: new Date().toLocaleString()},
  modifiedTime: String, //修改时间
}, {
  collections: 'Article'
})

mongoose.model("Article", articleSchema)