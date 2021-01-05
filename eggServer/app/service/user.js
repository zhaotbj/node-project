const Service = require('egg').Service;

class UserService extends Service {
  /**
   * 注册
   * @param {*} params 
   */
  async serviceRegister(params) {
    const { ctx } = this;
    try {
      console.log(params, '======参数=========')
      let { userName, password, avatar, gender } = params;
      if (userName && password && gender) {
        const newUser = ctx.model.User(params);
        const result = await newUser.save()
        return  { flag: true, message: "注册成功", data: result };
      } else {
        return { flag: false, message: "注册失败", data: result };
      }


    } catch (e) {
      return  { flag: false, message: "注册失败", data: e };
    }
  }

  /**
   * 登录
   */
  async serviceLogin(userInfo) {
    const { ctx } = this;
    try {
      ctx.logger.info('登录参数',userInfo)
      const { userName, password } = userInfo;
 
      let result =  await ctx.model.User.findOne({
        userName: userName
      }).exec();
      console.log(result, '查出来的密码')
    
      if (result) {
      return ctx.model.User().comparePassword(password, result.password)
          .then(isMatch => {
            if (isMatch) {

             return ctx.body = {
                flag: true,
                code: 200,
                message: { isMatch: isMatch, userName: result.userName, userId: result.userId }
              }
            } else {
              return ctx.body = {
                flag: true,
                code: 200,
                message: { isMatch: isMatch }
              }
            }

          }).catch(error => {
            console.log(error, 'error')
            return ctx.body = {
              flag: false,
              code: 500,
              message: error
            }
          })
      } else {
        return  ctx.body = {
          flag: true,
          code: 200,
          message: '用户名不存在'
        }
      }
    } catch (error) {
      console.log(error, 'catch')
      return  ctx.body = {
        flag: false,
        code: 500,
        message: error
      }
    }
  }
}

module.exports = UserService;