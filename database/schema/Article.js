const mongoose = require('mongoose')
const Schema=mongoose.Schema // 申明scheme
const articleSchema = new Schema({
  id: {type:Date, default: new Date().getTime()},
  articleId:String,
  userId:String, // 用户id
  title: String,
  image: String,
  summary: String, //文章简介
  type: Number, //  文章类型 0-博客 1-话题
  readNumber: Number, // 章阅读量
  commentNumber: Number, // 文章评论数
  thumbUpNumber: Number, // 文章点赞数
  createTime: String, //  创建时间
  modifiedTime: String, //修改时间
}, {
  collections: 'Article'
})

mongoose.model("Article", articleSchema)