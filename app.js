const Koa = require('koa')
const app = new Koa()
const ip = require('ip')
const middleware = require('./middleware')
const router = require('./router')
const { connect, initSchemas } = require("./model/init.js")
const cors = require("koa2-cors")

// 配置跨域
// app.use(cors())
// // 设置跨域
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
	

middleware(app);
router(app);


(async() => {
    await connect()
    initSchemas()
})()


app.listen(3002, () => {
    console.log(`starting in http://${ip.address()}:3002`)
})