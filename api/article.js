const Router = require('koa-router')
let router = new Router()

const mongoose = require('mongoose')

// 读取所有文章
router.get("/getAllList", async (ctx) => {
  try {
    console.log('getAllList', ctx.request.query);
    let {id} = ctx.request.query;
    const Article = mongoose.model('Article');
      result = [];
    if(id){
     result = await Article.find({"category": Number(id)}).sort({"_id": -1}).exec();
    } else {
    result = await Article.find().sort({"_id": -1}).exec();
    }
    ctx.body =  { flag: true, message: "操作成功", data: result };
  } catch (error) {
    ctx.body =  { flag: false, message: "操作失败" + error, };
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
    // 
    let resultArticle = await Article.findOne({_id:id}).exec();
    // thumbUpNumber
    let num = resultArticle.readNumber;
    num +=1;
    console.log('readNumber::',resultArticle.readNumber,'num::',num,resultArticle.id);
    let update = await Article.update({id: resultArticle.id},{$set:{readNumber: num}});
    let reuslt = await Article.findOne({_id:id}).exec();
    ctx.body =  { flag: true, message: "操作成功", data: reuslt };
  } catch (error) {
    ctx.body = {flag: false, message: "操作失败",  data: error };
  }

})

// 添加文章
router.post("/create", async (ctx) => {
  console.log(ctx.request.body, '添加参数');
  try {
    let { userId, userName, content, title,category, readNumber, commentNumber, thumbUpNumber } = ctx.request.body;
    let summary = content.substring(0, 50);
    let obj = {
      userId: userId,
      userName:userName,
      content: content,
      title: title,
      category: category,
      summary: summary, //文章简介
      readNumber: readNumber || 0, // 章阅读量
      commentNumber: commentNumber || 0, // 文章评论数
      thumbUpNumber: thumbUpNumber || 0, // 文章点赞数
      time: date(), //  创建时间
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


// 点赞
router.post("/zhan", async(ctx) => {
  console.log(ctx.request.body, 'zhan');
  try {
    let {id} = ctx.request.body;
    if(id){
      const Article = mongoose.model('Article');
    let resultArticle = await Article.findOne({id:id}).exec();
    let num = resultArticle.commentNumber;
     num+=1;
      let update = await Article.update({id: resultArticle.id},{$set:{commentNumber: num}});
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
    const Comment = mongoose.model("Comment");
    let comment = [], commentItem =[], result=[];
    const list = await Comment.findOne({articleId: articleId});
    
    comment.push({
      name:name,
      email:email,
      url:url,
      desc:desc,
      time: new Date().toLocaleString(),
      createTime:Date.now()
    });
    if(list){
      let newarr = list.comment.concat(comment);
      result= await Comment.update({ "articleId": articleId }, {"$set":{"comment": newarr }})
    } else {
       commentItem = new Comment({articleId: articleId, comment: comment});
       result = await  commentItem.save();
    }
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
    const Comment = mongoose.model("Comment");
      const result = await Comment.find({articleId: articleId});
      ctx.body = {flag: true, data: result}
  } catch (error) {
    ctx.body = {flag: false, message:"错误"}
  }
})

module.exports = router;