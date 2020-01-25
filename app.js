const Koa = require('koa')
const app = new Koa()
const mongoose = require('mongoose')
const { connect, initSchemas } = require("./database/init.js")
const Router = require("koa-router")
const bodyParser = require("koa-bodyparser")
const cors = require("koa2-cors")


// 处理post的参数
app.use(bodyParser());
// 配置跨域
// app.use(cors())
// 设置跨域
app.use(cors({
    origin: function (ctx) {
        /*if (ctx.url === '/cors') {
            return "*"; // 允许来自所有域名请求
        }*/
        return "*";
        // return 'http://localhost:8080';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'], //设置允许的HTTP请求类型
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
  }));
	
    // 引入user模块
let user = require('./api/user.js')
let home = require('./api/home.js')
let article = require('./api/article.js')
    // 装载所有子路由
let router = new Router()
router.use("/user", user.routes())
router.use("/home", home.routes())
router.use("/article", article.routes())
    // 加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())



;
(async() => {
    await connect()
    initSchemas()
})()


app.listen(3002, () => {
    console.log('starting in 3002!')
})