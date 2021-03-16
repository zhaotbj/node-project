const UserModel = require("../model/schema/User")
const mongoose = require("mongoose")
class userService {
     /**
   * 用户账号处理：注册 & 登录
   * @param {Object} 
   * @param {Number} handleFlag 处理标识 1: 登录, 2: 注册
   */

      async accountHandle({ userName, password, mobilePhone }, handleFlag = 1) {
        try {
            const userDoc = await UserModel.findOne({ userName });
            if (!userDoc) {
                // 改手机号没有注册过，
                /**
                 * 1.登录 提示先注册
                 * 2. 注册 看用户名是否重复
                 * 如果没有重复直接写入库中
                 */
                switch (handleFlag) {
                    case 1:
                        return { code: -1, msg: '账号不存在，可先注册' };
                    case 2:
                        // 查询是否已存在同用户名
                        const user = await UserModel.findOne({ userName });
                        console.log("user", user);
                        if (user) {
                            return { code: 0, msg: "用户名已存在", user: user };
                        } else {
                            // 注册账号
                            let userEntity = new UserModel({ userName, password });
                            // 保存到数据库中
                            let userInfo = await userEntity.save();
                            return {
                                _id: userInfo._id,
                                userName: userInfo.userName,
                                gender: userInfo.gender,
                                avatar: userInfo.avatar,
                                // mobilePhone: userInfo.mobilePhone,
                                email: userInfo.email,
                                year: userInfo.year,
                                month: userInfo.month,
                                day: userInfo.day
                            }
                        }
                }
            } else {
                switch (handleFlag) {
                    case 1:
                        //    登录账号
                        let result = await userDoc.comparePassword(password, userDoc.password); // 进行密码比对是否一致
                        if (!result) {
                            return { code: -2, msg: "密码不正确" }
                        } else {
                            return {
                                code: 200,
                                _id: userDoc._id,
                                userName: userDoc.userName,
                                gender: userDoc.gender,
                                avatar: userDoc.avatar,
                                // mobilePhone: userDoc.mobilePhone,
                                email: userDoc.email,
                                year: userDoc.year,
                                month: userDoc.month,
                                day: userDoc.day
                            }
                        }
                    case 2:
                        return userDoc.mobilePhone === mobilePhone && { code: 1, msg: '账号已存在，可直接登录' }
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new userService();