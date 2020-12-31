'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
// 导入数据库连接文件
// const { connect } = require('./utils/connect');
module.exports = app => {
  const { router, controller } = app;
  // const mongoose = app.mongoose;
  // 立即执行函数
// (async () => {
//   await connect(); // 执行连接数据库任务
// })();
  router.get('/', controller.home.index);
  router.get('/article', controller.article.addUser);
  router.get('/user', controller.user.index);
  router.post('/user/login', controller.user.login);
  // router.get('/home', controller.user.index);
  // router.get('/user/login', controller.user.index);
};
