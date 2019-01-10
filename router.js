// 0. 加载 express
const express = require('express')
// 1. 调用 express.Router() 创建一个路由实例
const router = express.Router()
// 2. 配置路由规则

const db = require('./db')

const md5 = require('md5')
const moment = require('moment') // 处理时间
// 首页路由
router
  .get('/', (req, res, next) => {
    // SELECT nickname FROM users
    const sqlStr = 'SELECT * FROM `topics` ORDER BY `createdAt` DESC'
    db.query(sqlStr, (err, results) => {
      if (err) {
        return callback(err)
      }
      let topics = results
      res.render('index.html', {
        topics
      })
    })
    
  })

// 用户路由
router
  .get('/signin', (req, res, next) => {
    res.render('signin.html')
  })
  .get('/signup', (req, res, next) => {
    res.render('signup.html')
  })
  // 登录
  .post('/signin', (req, res, next) => {
    const body = req.body
    let email = body.email
    const sqlStr = 'SELECT * FROM `users` WHERE `email`=?'
    db.query(
      sqlStr,
      [email],
      (err, results) => {
        if (err) {
          return callback(err)
        }
        console.log(results, '校验')
        let user = results[0]
        if (!user.email) {
          res.send({
            code: 1,
            message: '用户名不存在'
          })
        }

        if (md5(body.password) !== user.password) {
          res.send({
            code: 2,
            message: '密码不正确'
          })
        }

        res.send({
          code: 200,
          message: '恭喜你，登录成功'
        })
      }
    )
  })
  // 注册
  .post('/signup', (req, res, next) => {
    const body = req.body
    body.createdAt = moment().format('YYYY-MM-DD HH:mm:ss') //时间
    body.password = md5(body.password)
    let user = body
    console.log(user, '保存')
    const sqlStr = 'INSERT INTO `users` SET ?'
    db.query(sqlStr, user,
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

  // 话题
  router.get('/topic/:topicId', (req, res, next)=> {
    const {topicId} = req.params
    const sqlStr = 'SELECT * FROM `topics` WHERE `id`=?'
    db.query(sqlStr, [topicId], (err, results) => {
      if (err) {
        return callback(err)
      }
      // callback(null, results[0])
      console.log('内容', results)
      let content = results[0]
      res.render('topic/content.html', {
        content
      })
    })
  })
module.exports = router

// 4. 在 app.js 中通过 app.use(路由对象) 挂载使之生效