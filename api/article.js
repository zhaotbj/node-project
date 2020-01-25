const Router = require('koa-router')
let router = new Router()

const mongoose = require('mongoose')

// 读取所有文章
router.get("/getAllList", async (ctx) => {

  try {
    const Article = mongoose.model('Article');
    const User = mongoose.model("User")
    var result = await Article.find().exec();
    var userResult = await User.find().exec();
    // console.log(result,'result')

    ctx.body = { code: 200, message: result }
  } catch (error) {
    ctx.body = { code: 500, message: error }
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
    let articleObj = ctx.request.query
    const ArticleContent = mongoose.model('ArticleContent');
    const Article = mongoose.model('Article');
    let resultArticle =await Article.findOne(articleObj).exec();
    let result = await ArticleContent.findOne(articleObj).exec();
    
    let  {readNumber,thumbUpNumber,commentNumber}=resultArticle
    let data = {
      ...JSON.parse(JSON.stringify(result)),
      "readNumber":readNumber,"thumbUpNumber":thumbUpNumber,"commentNumber":commentNumber
    }
    ctx.body = { code: 200, message: data }
  } catch (error) {
    ctx.body = { code: 500, message: error }
  }

})

// 添加文章
router.post("/create", async (ctx) => {
  console.log(ctx.request.body, '添加参数');
  try {
    let { userId, content, title, image, summary, readNumber, commentNumber, thumbUpNumber, createTime, modifiedTime } = ctx.request.body;
    let articleId = new Date().getTime();
    let obj = {
      userId: userId,
      content: content,
      articleId: articleId,
      title: title,
      image: image,
      summary: summary, //文章简介
      readNumber: readNumber || 0, // 章阅读量
      commentNumber: commentNumber || 0, // 文章评论数
      thumbUpNumber: thumbUpNumber || 0, // 文章点赞数
      createTime: createTime || new Date().toLocaleString(), //  创建时间
      modifiedTime: modifiedTime || '', //修改时间
    }
    console.log(obj, '参数')

    const Article = mongoose.model('Article');
    let newArticle = new Article({ id: articleId, ...obj });
    await newArticle.save();

    // 添加文章内容
    let contentObj = {
      userId: userId, // 用户id
      articleId: articleId,
      title: title,
      content: content,
      createTime: createTime,
      modifiedTime: modifiedTime
    }
    const ArticleContent = mongoose.model('ArticleContent');
    let newAddContent = new ArticleContent({ id: articleId, ...contentObj });
    const result = await newAddContent.save();
    ctx.body = { code: 200, message: result };


  } catch (error) {
    console.log(error)
    ctx.body = { code: 500, message: error }
  }

})

// 删除文章
router.post("/delete", async (ctx) => {
  console.log(ctx.request.body, '删除参数');
  try {
    let articleId = ctx.request.body.articleId;
    const Article = mongoose.model('Article');
    const ArticleContent = mongoose.model('ArticleContent');
    // let deleteArticle = new ArticleContent();
    await Article.remove({ articleId: articleId })
    const result = await ArticleContent.remove({ articleId: articleId });
    console.log(result)
    if (result.deletedCount > 0) {
      ctx.body = { code: 200, message: true }
    } else {
      ctx.body = { code: 200, message: false }
    }
  } catch (error) {
    console.log('======error=========', error)
    ctx.body = { code: 500, message: error }
  }

})
// 编辑
router.post("/update", async (ctx) => {
  console.log(ctx.request.body, 'update参数');
  try {

    let articleId = ctx.request.body.articleId;

    // 执行更新数据
    let { userId, content, title, image, summary, readNumber, commentNumber, thumbUpNumber, createTime } = ctx.request.body;
    // let articleId = new Date().getTime();
    let obj = {
      userId: userId,
      content: content,
      articleId: articleId,
      title: title,
      image: image,
      summary: summary, //文章简介
      readNumber: readNumber || 0, // 章阅读量
      commentNumber: commentNumber || 0, // 文章评论数
      thumbUpNumber: thumbUpNumber || 0, // 文章点赞数
      createTime: createTime || '', //  创建时间
      modifiedTime: Date.now(), //修改时间
    }
    console.log(obj, '参数')

    const Article = mongoose.model('Article');
    // let newArticle = new Article({ id: articleId, ...obj });
    console.log(articleId ,'articleId')
    const resultUpdata = await Article.update({ articleId: articleId }, obj);
    // ctx.body={code:200,data:resultUpdata}
    console.log(resultUpdata, '修改结果')

    // 添加文章内容
    let contentObj = {
      userId: userId, // 用户id
      articleId: articleId,
      title: title,
      content: content,
      createTime: createTime,
      modifiedTime: Date.now()
    }
    const ArticleContent = mongoose.model('ArticleContent');
    const result = await ArticleContent.update({ articleId: articleId }, { id: articleId, ...contentObj });

    console.log(result)
    if (result.nModified > 0) {
      ctx.body = { code: 200, message: true }
    } else {
      ctx.body = { code: 200, message: false }
    }
  } catch (error) {
    console.log(error)
    ctx.body = { code: 500, message: error }
  }

})


module.exports = router;