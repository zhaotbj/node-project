const path = require('path')
const ip = require('ip')
const bodyParser = require('koa-bodyparser')
const views = require("koa-views");
// const nunjucks = require('koa-nunjucks-2');
const staticFiles = require('koa-static');
const render = require('koa-ejs');
// const miSend = require('./mi-send')
const miLog = require('./mi-log');
const koaBody = require('koa-body'); //解析上传文件的插件

module.exports = (app) => {
  app.use(miLog({
    env: app.env, // koa 提供的环境变量
    projectName: 'blog',
    appLogLevel: 'debug',
    dir: 'logs',
    serverIp: ip.address()
  }))

 app.use(staticFiles(path.resolve(__dirname, "../views")));
 app.use(staticFiles(path.resolve(__dirname, "../upload")));
//  app.use(views(path.join(__dirname, "../dist"), {
//     extension: "html",
//   }))
  render(app, {
    root: path.join(__dirname, '../views'),
    layout: 'index',
    viewExt: 'ejs',
    cache: false,
    debug: true
  });
  
  // app.use(miSend())

  // 上传文件
  app.use(koaBody({
     multipart: true,
     // formidable: {
     //     maxFileSize: 2000 * 1024 * 1024    // 设置上传文件大小最大限制，默认2M
     // }
 }))
 app.use(bodyParser())
}