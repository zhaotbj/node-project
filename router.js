// 0. 加载 express
const express = require('express')
// 1. 调用 express.Router() 创建一个路由实例
const router = express.Router()
// 2. 配置路由规则

const db= require('./db')
// 首页路由
router
.get('/', (req, res, next)=>{
  res.render('index.html')
})
  
// 用户路由
router
    .get('/signin', (req, res, next)=>{
      res.render('signin.html')
    })
    .get('/signup', (req, res, next)=>{
      res.render('signup.html')
    })
    // 登录
    .post('/signin', (req, res, next)=> {
      const body = req.body
       // 验证通过之后的处理
    User.getByEmail(body.email, (err, user) => {
      if (err) {
        // return res.send({
        //   code: 500,
        //   message: err.message
        // })
        return next(err)
      }

      // 如果用户不存在，告诉客户端
      if (!user) {
        return res.send({
          code: 1,
          message: '用户不存在'
        })
      }

      // 如果用户存在了，则校验密码
      if (md5(body.password) !== user.password) {
        return res.send({
          code: 2,
          message: '密码不正确'
        })
      }

      // 代码执行到这里，就意味着验证通过，可以登陆了
      
      // TODO：保持登陆状态
      req.session.user = user

      res.send({
        code: 200,
        message: '恭喜你，登陆成功'
      })
    })
    })
    // 注册
    .post('/signup', (req, res, next)=>{
      const body = req.body
      let user = body
      const sqlStr = 'INSERT INTO `users` SET ?'
      db.query(sqlStr,user,
        (err, results) => {
          if (err) {
            return callback(err)
          }
          // callback(null, results)
          // console.log(results, '结果')
          res.send({
            code: 200,
            message: 'ok'
          })
          // 1. 服务端重定向（只对同步请求有效）
            // res.send('注册成功')
            // 2. 让客户端自己跳
            // res.redirect('/')
        }
      )
    })
/*   // 当你 POST /signin 的时候，先调用 checkSigninBody 中间件，校验通过才真正的执行 signin 中间件
  .post('/signin', checkSigninBody, user.signin)
  .get('/signup', user.showSignup)
  .post('/signup', user.signup)
  .get('/signout', user.signout) */
// 3. 导出路由对象
module.exports = router

// 4. 在 app.js 中通过 app.use(路由对象) 挂载使之生效