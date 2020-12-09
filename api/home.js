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


// 分类写固定
router.get("/addCategory", async(ctx) =>{
	let obj = {
		1: 'Vue',
		2: "React",
		3:'Node.js',
		4: '小程序',
		5: 'Mysql',
		6: 'Linux',
		7: '随笔',
		8: '未分类'
	}
	try {
		let Category = mongoose.model("Category");
		
		let promiseArr = [];
		for(var key in obj) {
			 let promise = new Category({
				name: obj[key],
				value: key,
				create_time: Date.now().toString()
		   }).save();
		   promiseArr.push(promise);
		}
	   let result = await  Promise.all(promiseArr).then(res=>{
			return res;
		})
		ctx.body = {flag: true, data: result}
		
	} catch (error) {
		ctx.body = { flag: false, message: "失败" + error };
	}
})

router.get('/getCategory', async(ctx) =>{
	let Category = mongoose.model("Category");
	const reuslt =await Category.find({});
	ctx.body = {flag: true, data: reuslt};

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
		obj.time = Number(v.createTime);
		timearr.push(obj);
	})
	let resultData = formatData(timearr);
	for(var i = 0; i<resultData.length; i++) {
		resultData[i].children = [];
		resultData[i].id = i;
		for(var j=0; j<resultData[i].data.length; j++) {
			let current = list.filter(v=>{
				if(v.createTime == resultData[i].data[j]) {
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
