// 留言
const mongoose = require('mongoose')
const Schema = mongoose.Schema
// 分类
const CommentSchema = new Schema({
    articleId:{type: String},
    comment: {type: Array,unique: false},
    createTime:{type: String, default:new Date().toLocaleString()}
}, {
    collections: 'Comment'
  })
  module.exports = mongoose.model('Comment',CommentSchema)