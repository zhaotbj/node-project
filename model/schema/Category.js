const mongoose = require('mongoose')
const Schema = mongoose.Schema
// 分类
const categorySchema = new Schema({
    name:{type:String},
    createTime: String,
    updateTime:{ type: String, unique: false}
})
module.exports =  mongoose.model('Category',categorySchema)