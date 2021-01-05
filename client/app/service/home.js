const Service = require('egg').Service;
const fs = require("fs");
const path = require("path")
const api = 'http://39.100.82.50:3000'
class CategoryService extends Service {
    /**
     * 添加分类
     */
    async addCate() {
        const { ctx } = this;
        let obj = {
            1: 'Vue',
            2: "React",
            3: 'Node.js',
            4: '小程序',
            5: 'Mysql',
            6: 'Linux',
            7: '随笔',
            8: '未分类'
        }
        try {
            let Category = ctx.model.Category;
            let promiseArr = [];
            for (var key in obj) {
                let promise = new Category({
                    name: obj[key],
                    value: key,
                    create_time: Date.now().toString()
                }).save();
                promiseArr.push(promise);
            }
            let result = await Promise.all(promiseArr).then(res => res)
          return  ctx.body = { flag: true, data: result }

        } catch (error) {
            return ctx.body = { flag: false, message: "失败" + error };
        }
    }
    /**
     * 获取分类
     */
    async getCate(){
        const reuslt =await this.ctx.model.Category.find({});
	    return { flag: true, data: reuslt };
    }
    /**
     * 上传图片
     */
    async upload(file) {
        try {
           
            if (!file) {
                ctx.body = { flag: false, message: "上传失败 file能为空" };
            }
            // 上传单个文件
    
            // 创建可读流
            const reader = fs.createReadStream(file.filepath);
            let filePath = path.join(__dirname, '../public') + `/${file.filename}`;
            // 创建可写流
            const upStream = fs.createWriteStream(filePath);
            // 可读流通过管道写入可写流
            reader.pipe(upStream);
            return { flag: true, filePath: `${api}/public/${file.filename}`, fileName: file.name, message: '上传成功！' }
        } catch (e) {
            return { flag: false, message: "保存失败" + e };
        }
    }
}
module.exports = CategoryService;