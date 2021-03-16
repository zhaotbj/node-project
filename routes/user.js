const Router = require("koa-router")
const mongoose = require('mongoose')

let router = new Router()
router.get("/", async (ctx) => {
	
	// const User=mongoose.model('User');
	// const result = await User.find({userId:"1573374860870"}).exec();
	// 
	ctx.body = "这是用户首页"
})

router.post("/register", async (ctx) => {
	try {
		console.log(ctx.request.body, '======参数=========')
		let { userName, password,avatar,gender} = ctx.request.body
		if(userName&&password &&gender){
			const User = mongoose.model("User")
			let newUser = new User(ctx.request.body);
			const result = await  newUser.save()
			ctx.body = { flag: true, message: "注册成功", data: result };
		} else {
			ctx.body = {flag: false, message: "注册失败",  data: result };
		}
		
		
	} catch (e) {
		ctx.body = {flag: false, message: "注册失败",  data: e };
	}


})


router.post("/login", async (ctx) => {

	try {
		console.log(ctx.request.body, '登录参数')
		let loginUser = ctx.request.body;
		let userName = loginUser.userName;
		let password = loginUser.password;
		const User = mongoose.model("User")

		let result = await User.findOne({
			userName: userName
		}).exec();
		console.log(result, '查出来的密码')
		if (result) {
			let newUser = new User();
			await newUser.comparePassword(password, result.password)
				.then(isMatch => {

					if(isMatch){

						ctx.body = {
							flag: true,
							code: 200,
							message: {isMatch:isMatch,userName:result.userName,userId:result.userId}
						}
					} else {
						ctx.body = {
							flag: true,
							code: 200,
							message: {isMatch:isMatch}
						}
					}
					
				}).catch(error => {
					console.log(error, 'error')
					ctx.body = {
						flag: false,
						code: 500,
						message: error
					}
				})
		} else {
			ctx.body = {
				flag: true,
				code: 200,
				message: '用户名不存在'
			}
		}
	} catch (e) {
		console.log(error, 'catch')
		ctx.body = {
			flag: false,
			code: 500,
			message: error
		}
	}


})


module.exports = router;
