const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// 密码哈希的加密算法
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10; //定义加密密码计算强度

const userSchema = new Schema({
    userName: {type: String, unique: true},
    password: String,
    mobilePhone: String, // 手机号
    email: {type:String, default:""},
    gender: {type:String, default:"男", enum: ['男','女','保密']},
    avatar: {type:String, default:"http://img4.imgtn.bdimg.com/it/u=198369807,133263955&fm=27&gp=0.jpg"},
    year: {type:Number, default:new Date().getFullYear()},
    month: {type: Number, default: new Date().getMonth() + 1},
    day: {type: Number, default: new Date().getDate() },
    createAt: {type: Date, default: Date.now()} // 创建数据库的时间
})
/**
 * 对密码进行加盐
 * 使用 pre 中间件在用户信息存储前执行
 */
userSchema.pre('save', function(next) {
    // 进行加密 | 产生一个 salt
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
      if (err) return next(err);
      // 结合 salt 产生新的hash
      bcrypt.hash(this.password, salt, (err, hash) => {
        if (err) return next(err);
        // 使用 hash 覆盖明文密码
        this.password = hash;
        next();
      });
    });
  });

/**
 * 密码比对的方法
 * 第一个参数：客户端传递的; 第二个参数：数据库的
 */
userSchema.methods.comparePassword = (_password, password) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, password, (error, result) => {
        !error ? resolve(result) : reject(error);
      });
    });
  };
//发布模型
module.exports = mongoose.model('User', userSchema);
