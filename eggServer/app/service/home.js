const Service = require('egg').Service;
const fs = require('fs');
const path = require('path');
const api = 'http://localhost:3000';
const { formateTime, formatData } = require('../util');
class CategoryService extends Service {
  /**
     * 添加分类
     */
  async addCate() {
    const { ctx } = this;
    const obj = {
      1: 'Vue',
      2: 'React',
      3: 'Node.js',
      4: '小程序',
      5: 'Mysql',
      6: 'Linux',
      7: '随笔',
      8: '未分类',
    };
    try {
      const Category = ctx.model.Category;
      const promiseArr = [];
      for (const key in obj) {
        const promise = new Category({
          name: obj[key],
          value: key,
          create_time: Date.now().toString(),
        }).save();
        promiseArr.push(promise);
      }
      const result = await Promise.all(promiseArr).then(res => res);
      return ctx.body = { flag: true, data: result };

    } catch (error) {
      return ctx.body = { flag: false, message: '失败' + error };
    }
  }
  /**
     * 获取分类
     */
  async getCate() {
    const reuslt = await this.ctx.model.Category.find({});
    return { flag: true, data: reuslt };
  }
  /**
     * 上传图片
     */
  async upload(file) {
    try {

      if (!file) {
        ctx.body = { flag: false, message: '上传失败 file能为空' };
      }
      // 上传单个文件

      // 创建可读流
      const reader = fs.createReadStream(file.filepath);
      const filePath = path.join(__dirname, '../public') + `/${file.filename}`;
      // 创建可写流
      const upStream = fs.createWriteStream(filePath);
      // 可读流通过管道写入可写流
      reader.pipe(upStream);
      return { flag: true, filePath: `${api}/public/${file.filename}`, fileName: file.name, message: '上传成功！' };
    } catch (e) {
      return { flag: false, message: '保存失败' + e };
    }
  }

  async archives() {

    try {
      const Article = this.ctx.model.Article;
      const list = await Article.find();
      const timearr = [];
      console.log('list', list);
      list.map(v => {
        const obj = {};
        obj.time = Number(v.time);
        timearr.push(obj);
      });
      const resultData = formatData(timearr);
      for (var i = 0; i < resultData.length; i++) {
        resultData[i].children = [];
        resultData[i].id = i;
        for (var j = 0; j < resultData[i].data.length; j++) {
          const current = list.filter(v => {
            if (v.time == resultData[i].data[j]) {
              return v;
            }
          });
          if (current.length > 0) {
            const obj = {
              title: current[0].title,
              desc: current[0].userName + ' 提交于 ' + current[0].createTime,
              id: resultData[i].data[j],
            };
            resultData[i].children.push(obj);
          }
        }
      }
      return { flag: true, data: resultData };
    } catch (error) {
      return { flag: false, message: '归档失败了~~', data: [] };
    }
  }
}
module.exports = CategoryService;
