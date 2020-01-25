// 留言
const mongoose = require('mongoose')
const Schema = mongoose.Schema
// 分类
const messageSchema = new Schema({
    id:{unique:true,type:String},
    userId:String, // 用户id
    content:String,
    user_name:String,
    user_img:String,// 用户头像
    create_time: String,
    modified_time: Number
})
mongoose.model('Message',messageSchema)