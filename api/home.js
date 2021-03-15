const Router = require("koa-router")
let router = new Router()
const ip = require('ip');
const fs = require('fs');
const path = require("path");
const mongoose = require('mongoose');
const {formatData} = require("../common/common");
const api = 'http://39.100.82.50:3000'

// 上传图片
router.post("/upload", async (ctx) => {
	console.log(ctx.request.files.file, 'upload---');
	try {
		let { file } = ctx.request.files;
		if (!file) {
			ctx.body = { flag: false, message: "上传失败 file能为空" };
		}
		// 上传单个文件

		// 创建可读流
		const reader = fs.createReadStream(file.path);
		let filePath = path.join(__dirname, '../upload') + `/${file.name}`;
		// 创建可写流
		const upStream = fs.createWriteStream(filePath);
		// 可读流通过管道写入可写流
		reader.pipe(upStream);
		ctx.body = { flag: true, filePath: `${api}/${file.name}`, fileName: file.name, message: '上传成功！' }
	} catch (e) {
		ctx.body = { flag: false, message: "保存失败" + e };
	}


})


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
// 归档
router.get("/archives", async(ctx) =>{
	const Article = mongoose.model('Article');
	try {
		const list = await Article.find();
	let timearr = [];
	console.log('list',list)
	list.map(v =>{
		let obj = {};
		obj.time = Number(v.time);
		timearr.push(obj);
	})
	let resultData = formatData(timearr);
	for(var i = 0; i<resultData.length; i++) {
		resultData[i].children = [];
		resultData[i].id = i;
		for(var j=0; j<resultData[i].data.length; j++) {
			let current = list.filter(v=>{
				if(v.time == resultData[i].data[j]) {
					return v
				}
			})
			if(current.length>0){
				let obj = {
					title: current[0].title,
					desc: current[0].userName+ ' 提交于 '+current[0].createTime,
					id:  resultData[i].data[j]
				}
				resultData[i].children.push(obj);
			}
		}
	}
	ctx.body = {flag: true, data: resultData};
	} catch (error) {
		ctx.body = {flag: false, message:"归档失败了~~", data:[]}
	}
})




module.exports = router;
