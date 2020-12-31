const Controller = require('egg').Controller;
// const UserModel = require("../model/user")
class UserController extends Controller {
    async index() {
        const { ctx } = this;
        ctx.body = {flag: true, data: 'user'}
    }
    async register() {
        const { ctx } = this;
        let result = await ctx.service.user.serviceRegister(ctx.request.body);
        ctx.body = result;
    }
    async login() {
        const { ctx } = this;
        ctx.logger.info('some request data: %j', ctx.request.body);
        let result = await ctx.service.user.serviceLogin(ctx.request.body);
        ctx.body = result;

    }

}

module.exports = UserController;