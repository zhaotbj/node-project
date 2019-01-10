const express = require('express')
const bodyParser = require('body-parser')
const router = require('./router')
var serveIndex = require('serve-index')
const md5 = require('md5')
const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session)
const morgan = require('morgan')



const options = {
  host:'localhost',
  port: 3306,
  user: 'root',
  password: '123456',
  database: '2019'
}
const sessionStore = new MySQLStore(options)
const app = express()

// app.use(morgan('tiny'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
// 现在你访问 /views 就会得到 views 目录列表了
app.use('/views', serveIndex('./views/', {'icons': true}))

// session 插件内部有一套业务逻辑
/* app.use(session({
  key: "connect.sid", // 配置 Cookie 的名字，默认就是 connect.sid
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: sessionStore // 将 Session 数据存储到数据库中（默认是内存存储）
}))
 */

app.use((req, res, next) => {
  // app.locals.sessionUser = req.session.user

  // 千万不要忘记调用 next()，否则请求进来就不往后走了
  next()
})
// 开放静态支援
app.use('/public', express.static('./public/'))
app.use('/node_modules', express.static('./node_modules/'))

app.engine('html', require('express-art-template'));
// 配置 body-parser 解析表单 POST 请求体
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(router)


app.listen(3000, ()=> console.log('running 3000...'))