'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = {flag:true, data:"hello world"};
  }
  async addCategory() {
    const { ctx } = this;
    ctx.body = await ctx.service.home.addCate();
  }
  async getCategory() {
    const { ctx } = this;
    ctx.body = await ctx.service.home.getCate();
  }
  async upload() {
    const { ctx } = this;

    const files = ctx.request.files;
    console.log(files);
    if (!files || files.length === 0) {
      return;
    }
    ctx.body = await ctx.service.home.upload(files[0]);
  }

  async archives() {
    this.ctx.body = await this.ctx.service.home.archives();
  }
}

module.exports = HomeController;
