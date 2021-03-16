const Router = require('koa-router')
let router = new Router()

const mongoose = require('mongoose')
const ArticleService = require('../service/article.js')
const {formateTime} = require('../util/util.js')
// 读取所有文章
router.post("/getAllList", async (ctx) => {
  try {
    console.log('getAllList', ctx.request.body);
    let {cateId, search} = ctx.request.body;
    const result = await ArticleService.getList(cateId, search)
    ctx.body =  { flag: true, message: "操作成功", data: result };
  } catch (error) {
    ctx.body =  { flag: false, message: "操作失败" + error, };
  }
})

// 根据文章获取内容详情
router.get("/getEssayById", async (ctx) => {
  console.log(ctx.request.query, '参数')
  try {
    let {id} = ctx.request.query
    const result = await ArticleService.getEssayById(id)
    ctx.body =  { flag: true, message: "操作成功", data: result };
  } catch (error) {
    ctx.body = {flag: false, message: "操作失败",  data: error };
  }

})

// 添加文章
router.post("/create", async (ctx) => {
  console.log(ctx.request.body, '添加参数');
  try {
   const result = await ArticleService.addArticle(ctx.request.body)
    ctx.body = { flag: true, message: "保存成功", data: result };
  } catch (error) {
    console.log(error)
    ctx.body = { flag: false, message: "保存失败",data : error }
  }

})

// 删除文章
router.post("/delete", async (ctx) => {
  console.log(ctx.request.body, '删除参数');
  try {
    let id = ctx.request.body.id;
    const Article = mongoose.model('Article');
  
    const result = await Article.remove({ id: id })
    console.log(result,'删除结果')
    if (result.deletedCount > 0) {
      ctx.body = { flag: true, message: "删除成功", data: result };
    } else {
      ctx.body = { flag: false, message: "删除失败", data: result };
    }
  } catch (error) {
    console.log('======error=========', error)
    ctx.body = { flag: false, message: "删除失败", data: error };
  }

})
// 编辑
router.post("/update", async (ctx) => {
  console.log(ctx.request.body, 'update参数');
  try {

    const resultUpdata = await ArticleService.updateArticle(ctx.request.body)
    console.log(resultUpdata, '修改结果')
    if (resultUpdata.nModified > 0) {
      ctx.body =  { flag: true, message: "操作成功", data: resultUpdata };
    } else {
      ctx.body = { flag: false, message: "操作失败", data: resultUpdata };
    }
  } catch (error) {
    console.log(error)
    ctx.body = { flag: false, message: "操作失败", data: error };
  }

})
// 阅读数
router.get("/updateReadNum", async(ctx) => {
  let {id} = ctx.request.query;
  try {
    const update = await ArticleService.updateReadNum(id)
      ctx.body = { flag: true, message: "操作成功", data: update };
 
  } catch (error) {
    ctx.body = { flag: false, message: "操作失败", data: '' };
  }
})
// 点赞
router.post("/zhan", async(ctx) => {
  console.log(ctx.request.body, 'zhan');
  try {
    let {id} = ctx.request.body;
    if(id){
      const update = await ArticleService.updateZhan(id)
      ctx.body = { flag: true, message: "操作成功", data: update };
    }
    
  } catch (error) {
    ctx.body = { flag: false, message: "操作失败", data: '' };
  }
})

// 评论
router.post("/comment", async(ctx)=>{
  console.log(ctx.request.body, 'comment');
  try {
    const {articleId,name,email,url,desc} = ctx.request.body;
    const result = await ArticleService.updateComment(articleId,name,email,url,desc)
    ctx.body = {flag: true, message:"成功", data: result}
  } catch (error) {
    ctx.body = {flag: false, message:"错误"}
  }
})
// 查所有评论 根据文章id查
router.get('/getCommentByArticleId', async(ctx)=>{
  try {
    console.log(ctx.request.query, '参数')
    let {articleId} = ctx.request.query;
    if(!articleId) {
      ctx.body = {flag: false, message:"错误"}
    }
      const result = await ArticleService.getCommentById(articleId);
      ctx.body = {flag: true, data: result}
  } catch (error) {
    ctx.body = {flag: false, message:"错误"}
  }
})

module.exports = router;