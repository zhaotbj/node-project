const Router = require("koa-router")
const router = new Router()

const mongoose = require('mongoose');
const {formatData} = require('../util/util.js')
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
