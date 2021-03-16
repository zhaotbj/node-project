const Router = require("koa-router")
const router = new Router()

const mongoose = require('mongoose');

// 新增分类
router.post("/addCategory", async(ctx) =>{
	try {
		const {cateName} = ctx.request.body;
		if(cateName ==''|| !cateName) {
			ctx.body = { flag: false, message: '不能为空' };
			return
		}
		let Category = mongoose.model("Category");
		
	const  result=  await  new Category({
					name: cateName,
					createTime: Date.now().toString()
			}).save();
	   
		ctx.body = {flag: true, data: result}
		
	} catch (error) {
		ctx.body = { flag: false, message: "失败" + error };
	}
})

// 查询分类
router.get('/getCategory', async(ctx) =>{
	let Category = mongoose.model("Category");
	const reuslt =await Category.find({});
	ctx.body = {flag: true, data: reuslt};

})
//  修改分类
router.post("/updateCategory", async(ctx) =>{
	try {
		const {id, cateName} = ctx.request.body;
		if(id ==''|| !id || cateName==='' || !cateName) {
			ctx.body = { flag: false, message: '不能为空' };
			return
		}
		let category = mongoose.model("Category");
		
	const  result =  await   category.update({_id: id}, {name:cateName,  updateTime: Date.now().toString()})
		if(result.ok>0) {
			ctx.body = {flag: true, data: '修改成功'}
		} else {
			ctx.body = {flag: true, data: result,message:"修改失败"}
		}
		
		
	} catch (error) {
		ctx.body = { flag: false, message: "失败" + error };
	}
})

router.delete("/dropCategory", async(ctx) =>{
	try {
		const {id} = ctx.request.query;
		if(id ==''|| !id) {
			ctx.body = { flag: false, message: '不能为空' };
			return
		}
		let category = mongoose.model("Category");
		
	const  result =  await   category.deleteOne({_id: id})
		if(result.ok>0) {
			ctx.body = {flag: true, data: '删除成功'}
		} else {
			ctx.body = {flag: false, data: result,message:"删除失败"}
		}
		
		
	} catch (error) {
		ctx.body = { flag: false, message: "失败" + error };
	}
})

module.exports = router;