const mongoose = require('mongoose')
const bcrypt = require("bcrypt")
const SALT_WORK_FACTOR=10  // 设置加盐的长度
const Scheme=mongoose.Schema // 申明scheme
let ObjectId=Scheme.Types.ObjectId // 声明object类型

// 创建我们的用户scheme
const userSchema=new Scheme({
  userId: {type:String, default:new Date().getTime()},
  userName:{unique:true,type:String},
  password:String,
  createAt:{type:Date, default:Date.now()},
  lastLoginAt:{type:Date, default:Date.now()}
})
// 使用 bcrypt 哈希加密
userSchema.pre("save", function(next){
  bcrypt.genSalt(SALT_WORK_FACTOR, (err,salt)=>{
    if(err) return next(err)
    bcrypt.hash(this.password,salt,(err,hash)=>{
      if(err) return next(err)
      this.password=hash
      next()
    })
  })
})


userSchema.methods= {
  // 密码比对的方法
  comparePassword:(_password,password)=>{
    return new Promise((resolve,reject)=>{
      bcrypt.compare(_password, password, (err, isMatch)=>{
        if(!err) resolve(isMatch)
        else reject(err)
      })
    })
  }
}

// 发布模型
mongoose.model("User",userSchema);

