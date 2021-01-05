'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.home.index);

  router.get('/user', controller.user.index); 
  router.post('/user/register', controller.user.register); // 注册
  router.post('/user/login', controller.user.login); // 登录
  
  router.get('/home/addCategory', controller.home.addCategory) // 添加分类
  router.get('/home/getCategory', controller.home.getCategory) // 获取所有分类
  router.post('/home/upload', controller.home.upload) // 删除附件

  
  router.get('/article/getAllList', controller.article.getAllList); // 获取文章列表
  router.get('/article/getContentById', controller.article.getContentById); // 根据id获取详情
  router.post('/article/create', controller.article.create); // 新增文章
  router.post('/article/delete', controller.article.deleteAtyic); // 删除文章
  router.post('/article/update', controller.article.update); // 编辑
  router.post('/article/zhan', controller.article.zhan); // 点赞
  router.post('/article/comment', controller.article.comment); // 评论
  router.get('/article/getCommentByArticleId', controller.article.getCommentByArticleId); // 获取评论
};
