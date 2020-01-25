const Router = require('koa-router')
let router = new Router()

const mongoose = require('mongoose')
const fs = require('fs')


router.post("/inseret", async (ctx) => {

  let newArticle = new Article(value);
  newArticle.save().then(() => {
    saveCout++;
    console.log('成功:' + saveCout);
  }).catch(error => {
    console.log('失败:', error)
  })
  ctx.body = "开始导入数据了"
})

function readFile_promise(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (data) {
        resolve(data);
      } else {
        reject(err)
      }
    })
  })
}

module.exports = router;