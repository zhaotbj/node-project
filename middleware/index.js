const path = require('path')
const ip = require('ip')
const bodyParser = require('koa-bodyparser')
const views = require("koa-views");
// const nunjucks = require('koa-nunjucks-2');
const staticFiles = require('koa-static');
const render = require('koa-ejs');
// const miSend = require('./mi-send')
const miLog = require('./mi-log')
module.exports = (app) => {
  app.use(miLog({
    env: app.env, // koa 提供的环境变量
    projectName: 'blog',
    appLogLevel: 'debug',
    dir: 'logs',
    serverIp: ip.address()
  }))

 app.use(staticFiles(path.resolve(__dirname, "../dist")))
//  app.use(views(path.join(__dirname, "../dist"), {
//     extension: "html",
//   }))
  render(app, {
    root: path.join(__dirname, '../dist'),
    layout: 'index',
    viewExt: 'html',
    cache: false,
    debug: true
  });
  app.use(bodyParser())
  // app.use(miSend())
}