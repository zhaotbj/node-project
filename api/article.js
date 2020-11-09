const Router = require('koa-router')
let router = new Router()

const mongoose = require('mongoose')

// 读取所有文章
router.get("/getAllList", async (ctx) => {
  console.log('----getAllList------')
  try {
    const Article = mongoose.model('Article');
    // const User = mongoose.model("User")
    var result = await Article.find().sort({"id": -1}).exec();
    // var userResult = await User.find().exec();
    console.log("result",result)

    ctx.body =  { flag: true, message: "操作成功", data: result };
  } catch (error) {
    ctx.body =  { flag: false, message: "操作失败", data: result };
  }
})

function getUsers(userId) {
  return new Promise(function (resolve, reject) {
    const User = mongoose.model("User")
    User.findOne({
      'userId': userId
    }, { name: "userName" }, function (err, res) {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    }).exec();
  })
}
// 根据文章获取内容详情
router.get("/getContentById", async (ctx) => {
  console.log(ctx.request.query, '参数')
  try {
    let {id} = ctx.request.query
    // const ArticleContent = mongoose.model('ArticleContent');
    const Article = mongoose.model('Article');
    let resultArticle =await Article.findOne({id:id}).exec();
    // let result = await ArticleContent.findOne(id).exec();
    
    // let  {readNumber,thumbUpNumber,commentNumber}=resultArticle
    // let data = {
      // ...JSON.parse(JSON.stringify(result)),
    //   "readNumber":readNumber,"thumbUpNumber":thumbUpNumber,"commentNumber":commentNumber
    // }
    ctx.body =  { flag: true, message: "操作成功", data: resultArticle };
  } catch (error) {
    ctx.body = {flag: false, message: "操作失败",  data: error };
  }

})

// 添加文章
router.post("/create", async (ctx) => {
  console.log(ctx.request.body, '添加参数');
  try {
    let { userId, content, title, image, summary, readNumber, commentNumber, thumbUpNumber, createTime } = ctx.request.body;
    let obj = {
      userId: userId,
      content: content,
      title: title,
      image: image,
      summary: summary, //文章简介
      readNumber: readNumber || 0, // 章阅读量
      commentNumber: commentNumber || 0, // 文章评论数
      thumbUpNumber: thumbUpNumber || 0, // 文章点赞数
      createTime: createTime || new Date().toLocaleString(), //  创建时间
      modifiedTime: '', //修改时间
    }
    console.log(obj, '参数')
    // 添加文章内容
    const Article = mongoose.model('Article');
    let newArticle = new Article(obj);
    let result = await newArticle.save();
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
    const ArticleContent = mongoose.model('ArticleContent');
    // let deleteArticle = new ArticleContent();
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

    let articleId = ctx.request.body.id;

    // 执行更新数据
    let {content, title, image, summary, readNumber, commentNumber, thumbUpNumber } = ctx.request.body;
    let obj = {
      content: content,
      title: title,
      image: image,
      summary: summary, //文章简介
      readNumber: readNumber || 0, // 章阅读量
      commentNumber: commentNumber || 0, // 文章评论数
      thumbUpNumber: thumbUpNumber || 0, // 文章点赞数
      // createTime: createTime || '', //  创建时间
      modifiedTime: Date.now().toString(), //修改时间
    }
    console.log(obj, '编辑参数')

    const Article = mongoose.model('Article');
    const resultUpdata = await Article.update({ id: articleId }, obj);
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


module.exports = router;