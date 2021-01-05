'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'index';
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
    
    let files = ctx.request.files;
    console.log(files);
    if(!files || files.length === 0){
      return
    }
    ctx.body = await ctx.service.home.upload(files[0]);
  }
}

module.exports = HomeController;
