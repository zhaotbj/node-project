'use strict';
const Controller = require('egg').Controller;
 
class ArticleController extends Controller {
  async index() {
    const { ctx } = this;
    // const res = await ctx.service.article.getProjectById();
    // ctx.body = res; // 返回值显示
     // 建议将操作数据库的方法放到service里
     var userList = await this.ctx.model.Article.find({});
    
     this.ctx.body = userList;
  }
  async addUser() {
    // 建议将操作数据库的方法放到service里
    var article = new this.ctx.model.Article({
        title: 'title',
        summary: '123456'

    });
    var result = await article.save();
    this.ctx.body = '增加用户成功';
}
}
module.exports = ArticleController;