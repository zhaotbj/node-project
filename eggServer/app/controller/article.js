'use strict';
const Controller = require('egg').Controller;

class ArticleController extends Controller {
  async index() {
    const { ctx } = this;
    // const res = await ctx.service.article.getProjectById();
    // ctx.body = res; // 返回值显示
    // 建议将操作数据库的方法放到service里
    const userList = await this.ctx.model.Article.find({});
    this.ctx.body = userList;
  }
  /**
   * 获取所有文章
   * 根据id获取单个
   *  */
  async getAllList() {
    const { ctx } = this;
    const { id } = ctx.request.query;
    console.log('getAllList', ctx.request.query);
    ctx.body = await this.ctx.service.article.getAllList(id);
  }

  /**
   * 查看详情
   */
  async getContentById() {
    console.log(this.ctx.request.query, '参数');
    const { id } = this.ctx.request.query;
    this.ctx.body = await this.ctx.service.article.getContentById(id);
  }

  /**
   * 添加文章
   */
  async create() {
    console.log('参数：', this.ctx.request.body);
    const { userId, userName, content, title, category, readNumber, commentNumber, thumbUpNumber } = this.ctx.request.body;
    this.ctx.body = await this.ctx.service.article.create(userId, userName, content, title, category, readNumber, commentNumber, thumbUpNumber);
  }
  /**
   * 删除文章
   */
  async deleteAtyic() {
    console.log(this.ctx.request.body, '删除参数');
    const { id } = this.ctx.request.body;
    if (!id) return;
    this.ctx.body = await this.ctx.service.article.deleteAtyic(id);
  }
  /**
   * 更新文章
   */
  async update() {
    console.log(this.ctx.request.body, 'update参数');
    const articleId = this.ctx.request.body.id;
    if (!articleId) return;
    // 执行更新数据
    const { content, title, image, summary, readNumber, commentNumber, thumbUpNumber } = this.ctx.request.body;
    const obj = {
      content,
      title,
      image,
      summary, // 文章简介
      readNumber: readNumber || 0, // 章阅读量
      commentNumber: commentNumber || 0, // 文章评论数
      thumbUpNumber: thumbUpNumber || 0, // 文章点赞数
      // createTime: createTime || '', //  创建时间
      modifiedTime: Date.now().toString(), // 修改时间
    };
    console.log(obj, '编辑参数');
    this.ctx.body = await this.ctx.service.article.update(articleId, obj);
  }

  /**
   * 点赞
   */
  async zhan() {
    console.log(this.ctx.request.body, 'zhan');
    const { id } = this.ctx.request.body;
    if (!id) return;
    this.ctx.body = await this.ctx.service.article.zhan(id);
  }
  /**
   * 评论
   */
  async comment() {
    console.log(this.ctx.request.body, 'comment');
    const { articleId, name, email, url, desc } = this.ctx.request.body;
    this.ctx.body = await this.ctx.service.article.comment(articleId, name, email, url, desc);
  }

  /**
   * 查看评论
   */
  async getCommentByArticleId() {
    console.log(this.ctx.request.query, '参数');
    const { articleId } = this.ctx.request.query;
    this.ctx.body = await this.ctx.service.article.getCommentByArticleId(articleId);

  }
}
module.exports = ArticleController;
