const Koa = require('koa');
const app = new Koa();


const router = require('./middleware/router')
const bodyParser = require('koa-bodyparser')
const  cors = require('koa-cors');
const views = require("koa-views");

const upload = require("./middleware/upload");
app.use(views(__dirname + "/static/html",{ extension: 'ejs' }));
app.use(bodyParser())
const serve = require("koa-static");
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
app.use(router.routes())
app.use(router.allowedMethods());
app.use(upload);


app.use(serve(__dirname+ "/static/html",{ extensions: ['html']}));
app.listen(3000, function(){
    console.log('listening on 3000!')
})
