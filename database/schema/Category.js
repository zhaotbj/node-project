const mongoose = require('mongoose')
const Schema = mongoose.Schema
// 分类
const categorySchema = new Schema({
    name:{type:String},
    value:{type:Number},
    create_time: String
})
mongoose.model('Category',categorySchema)