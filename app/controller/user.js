const Controller = require('egg').Controller;
// const UserModel = require("../model/user")
class UserController extends Controller {
    async index() {
        const { ctx } = this;
        const res = await ctx.service.user.findAll();
        // let list = await ctx.user.find({});
        console.log('list', this.app.model.user);
        ctx.logger.info('some request data: %j', ctx.request.query);
        await ctx.render('user.ejs', { title: 'ejs', users: res })
    }
    async login() {
        const {ctx} = this;
        ctx.logger.info('some request data: %j', ctx.request.query);
       
        const res = await ctx.service.user.findAll();
        // try {
        //     console.log(ctx.request.body, '登录参数')
        //     let loginUser = ctx.request.body;
        //     let userName = loginUser.userName;
        //     let password = loginUser.password;
     
            // let list = this.ctx.model.user.find({})
            ctx.body = '';
        //     let result = await User.findOne({
        //         userName: userName
        //     }).exec();
        //     console.log(result, '查出来的密码')
        //     if (result) {
        //         let newUser = new User();
        //         await newUser.comparePassword(password, result.password)
        //             .then(isMatch => {

        //                 if (isMatch) {

        //                     ctx.body = {
        //                         flag: true,
        //                         code: 200,
        //                         message: { isMatch: isMatch, userName: result.userName, userId: result.userId }
        //                     }
        //                 } else {
        //                     ctx.body = {
        //                         flag: true,
        //                         code: 200,
        //                         message: { isMatch: isMatch }
        //                     }
        //                 }

        //             }).catch(error => {
        //                 console.log(error, 'error')
        //                 ctx.body = {
        //                     flag: false,
        //                     code: 500,
        //                     message: error
        //                 }
        //             })
        //     } else {
        //         ctx.body = {
        //             flag: true,
        //             code: 200,
        //             message: '用户名不存在'
        //         }
        //     }
        // } catch (e) {
        //     console.log(error, 'catch')
        //     ctx.body = {
        //         flag: false,
        //         code: 500,
        //         message: error
        //     }
        // }
    }

}

module.exports = UserController;