const mongoose = require('mongoose')
const Schema=mongoose.Schema // 申明scheme
const articleSchema = new Schema({
  userId:String, // 用户id
  userName:String, // 用户名
  title: String,
  content:String,
  md:String, // md语法
  summary: String, //文章简介
  categoryId: String, //  文章类型
  readNumber: Number, // 章阅读量
  commentNumber: Number, // 文章评论数
  thumbUpNumber: Number, // 文章点赞数
  createTime:{type:String, default: Date.now()},
  modifiedTime: String, //修改时间
}, {
  collections: 'Article'
})

module.exports = mongoose.model("Article", articleSchema)