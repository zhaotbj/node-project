const Router = require("koa-router")
const mongoose = require('mongoose')

let router = new Router()
const userService = require('../service/user');
const jwt = require('../util/jwt')
const checkUserStat = require('../middleware/checkUserStat')
router.get("/", async (ctx) => {

	// const User=mongoose.model('User');
	// const result = await User.find({userId:"1573374860870"}).exec();
	// 
	ctx.body = "这是用户首页"
})

/**
 * 用户注册
 */
router.post('/register', async (ctx) => {
	let { userName, password, mobilePhone, smsCode } = ctx.request.body;
	if (!userName || !password) {
		return ctx.body = { code: 400, msg: "请输入完整信息" }
	}
	// if(!ctx.session.smsCode){return ctx.body = {code:5010, msg:"验证码已过期"}};
	// if(ctx.session.smsCode !== smsCode) { return ctx.body = {code:5020, msg:"验证码不正确"}};

	let args = { userName, password };
	try {
		const userData = await userService.accountHandle(args, 2);
		ctx.body = (userData.code === 200) ? { code: 200, msg: '注册成功', token: jwt._createToken(userData) } : userData;
	} catch (error) {
		console.log(error);
	}
})
/**
 * 发送图形验证码
 */
router.get("/sendPicCode", async (ctx) => {
	let picCode = tools.createCaptcha();
	ctx.session.picCode = picCode.text;

	ctx.response.type = 'image/svg+xml';
	ctx.body = picCode.data;
})

/**
 * 用户登录
 */
router.post('/login', async (ctx) => {
	let { userName, password } = ctx.request.body;
	if (!userName || !password ) {
		return ctx.body = { code: 400, msg: '请输入完整信息' };
	}
	// if (!ctx.session.picCode) { return ctx.body = { code: 5010, msg: "验证码已过期" } };
	// if (ctx.session.picCode.toUpperCase() !== verifyCode.toUpperCase()) {
	// 	return ctx.body = { code: 5020, msg: "验证码不正确" }
	// }
	let args = { userName, password };
	try {
		const userData = await userService.accountHandle(args, 1) // 登录
		ctx.userInfo = userData;
		ctx.body = (userData.code === 200) ?
			{ code: 200, msg: "登录成功", token: jwt._createToken(userData) } : userData;
	} catch (error) {
		console.log(error)
	}
})

/**
 * 获取用户信息
 */
 router.get('/userInfo', checkUserStat, async (ctx) => {
	 console.log(ctx.userInfo);
    ctx.body = ctx.userInfo ? {code:200, userInfo: ctx.userInfo} : {code:400, msg:"未知错误"};
})
module.exports = router;
