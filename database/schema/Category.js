const mongoose = require('mongoose')
const Schema = mongoose.Schema
// 分类
const categorySchema = new Schema({
    id:{unique:true,type:String},
    userId:String, // 用户id
    name:{type:String},
    type:{type:Number},
    create_time: String, 
    modified_time: Number
})
mongoose.model('Category',categorySchema)