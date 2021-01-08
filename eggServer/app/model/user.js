const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10; // 设置加盐的长度
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  // 创建我们的用户scheme
  const userSchema = new Schema({
    userId: { type: String, default: new Date().getTime() },
    userName: { unique: true, type: String },
    password: { unique: true, type: String },
    avatar: { type: String, required: false }, // 头像
    gender: { type: String, type: String }, // 性别
    bio: { type: String, required: false },
    createAt: { type: Date, default: Date.now() },
    lastLoginAt: { type: Date, default: Date.now() },
  });
  // 使用 bcrypt 哈希加密
  userSchema.pre('save', function(next) {
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(this.password, salt, (err, hash) => {
        if (err) return next(err);
        this.password = hash;
        next();
      });
    });
  });


  // 密码比对的方法
  userSchema.methods.comparePassword = (_password, password) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, password, (err, isMatch) => {
        if (!err) resolve(isMatch);
        else reject(err);
      });
    });
  };

  return mongoose.model('User', userSchema, 'user');

};

