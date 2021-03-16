const Router = require('koa-router')
const router = new Router()
const {api} = require("../util/config")
const path = require("path");
const fs = require('fs');
const checkUserStat = require('../middleware/checkUserStat');
// 上传图片
router.post("/upload", checkUserStat,  async (ctx) => {
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

module.exports = router;