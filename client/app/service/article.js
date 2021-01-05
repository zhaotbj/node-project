'use strict';

const Service = require('egg').Service;

class ArticleService extends Service {
  /**
     * 根据ID获取单个项目
     */
  async getAllList(id) {
    const { ctx } = this;
    try {
      const Article = ctx.model.Article;
      let result = [];
      if (id) {
        result = await Article.find({ "category": Number(id) }).sort({ "_id": -1 }).exec();
      } else {
        result = await Article.find().sort({ "_id": -1 }).exec();
      }
      return { flag: true, message: "操作成功", data: result };
    } catch (error) {
      return { flag: false, message: "操作失败" + error, };
    }
  }

  /**
   *  查看详情
   */
  async getContentById(id){
    try {
      const Article = this.ctx.model.Article;
      // 
      let resultArticle = await Article.findOne({_id:id}).exec();
      // thumbUpNumber
      let num = resultArticle.readNumber;
      num +=1;
      console.log('readNumber::',resultArticle.readNumber,'num::',num,resultArticle.id);
      let update = await Article.update({id: resultArticle.id},{$set:{readNumber: num}});
      let reuslt = await Article.findOne({_id:id}).exec();
      return { flag: true, message: "操作成功", data: reuslt };
    } catch (error) {
      return {flag: false, message: "操作失败",  data: error };
    }
  }
  /**
   * 新增文章
   */
  async create(userId, userName, content, title, category, readNumber, commentNumber, thumbUpNumber) {
    const { ctx } = this;
    try {
      let summary = content.substring(0, 50);
      let obj = {
        userId: userId,
        userName: userName,
        content: content,
        title: title,
        category: category,
        summary: summary, //文章简介
        readNumber: readNumber || 0, // 章阅读量
        commentNumber: commentNumber || 0, // 文章评论数
        thumbUpNumber: thumbUpNumber || 0, // 文章点赞数
      }

      console.log(obj, '参数')
      // 添加文章内容
      const Article = ctx.model.Article;
      let newArticle = new Article(obj);
      let result = await newArticle.save();
      return { flag: true, message: "保存成功", data: result };
    } catch (error) {
      console.log(error)
      return { flag: false, message: "保存失败", data: error }
    }
  }
  /**
   * 删除文章 
   */
  async deleteAtyic(id) {
    try {
      const Article = this.ctx.model.Article;
      const result = await Article.remove({ _id: id })
      console.log(result, '删除结果')
      if (result.deletedCount > 0) {
        return { flag: true, message: "删除成功", data: result };
      } else {
        return { flag: false, message: "删除失败", data: result };
      }
    }
    catch (error) {
      console.log('======error=========', error)
      return { flag: false, message: "删除失败", data: error };
    }
  }
  /**
   * 更新文章
   */
  async update(id, obj) {
    try {

      const Article = this.ctx.model.Article;
      const resultUpdata = await Article.update({ _id: id }, obj);
      console.log(resultUpdata, '修改结果')
      if (resultUpdata.nModified > 0) {
        return { flag: true, message: "操作成功", data: resultUpdata };
      } else {
        return { flag: false, message: "操作失败", data: resultUpdata };
      }
    } catch (error) {
      console.log(error)
      return { flag: false, message: "操作失败", data: error };
    }
  }

  /**
   * 点赞
   */
  async zhan(id) {
    try {
      if (id) {
        const Article = this.ctx.model.Article;
        let resultArticle = await Article.findOne({ _id: id }).exec();
        let num = resultArticle.commentNumber;
        num += 1;
        let update = await Article.update({ _id: resultArticle._id }, { $set: { commentNumber: num } });
        return { flag: true, message: "操作成功", data: update };
      }
    } catch (error) {
      return { flag: false, message: "操作失败", data: '' };
    }
  }
  async comment(articleId,name,email,url,desc){
    try {
      const Comment = this.ctx.model.Comment;
      let comment = [], commentItem =[], result=[];
      const list = await Comment.findOne({articleId: articleId});
      
      comment.push({
        name:name,
        email:email,
        url:url,
        desc:desc,
        time: new Date().toLocaleString(),
        createTime: Date.now()
      });
      if(list){
        let newarr = list.comment.concat(comment);
        result= await Comment.update({ "articleId": articleId }, {"$set":{"comment": newarr }})
      } else {
         commentItem = new Comment({articleId: articleId, comment: comment});
         result = await  commentItem.save();
      }
      return {flag: true, message:"成功", data: result}
    } catch (error) {
       return {flag: false, message:"错误"}
    }
  }
  /**
   * 查看评论 
  */
  async getCommentByArticleId(articleId){
    try{  
    if(!articleId) {
        return {flag: false, message:"错误"}
      }
      const Comment = this.ctx.model.Comment;
        const result = await Comment.find({articleId: articleId});
        return {flag: true, data: result}
    } catch (error) {
      return {flag: false, message:"错误"}
    }
    }
}
module.exports = ArticleService;