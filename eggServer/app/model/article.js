'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  // 下面得操作是连接数据库
  const ArticleSchema = new Schema({
    id: { type: String, default: new Date().getTime().toString() },
    userId: String, // 用户id
    userName: String, // 用户名
    title: String,
    content: String,
    summary: String, // 文章简介
    category: Number, //  文章类型
    // let obj = {
    // 	1: 'Vue',
    // 	2: "React",
    // 	3:'Node.js',
    // 	4: '小程序',
    // 	5: 'Mysql',
    // 	6: 'Linux',
    // 	7: '随笔',
    // 	8: '未分类'
    // }
    readNumber: Number, // 章阅读量
    commentNumber: Number, // 文章评论数
    thumbUpNumber: Number, // 文章点赞数
    time: { type: String, default: Date.now().toString() }, //  创建时间
    createTime: { type: String, default: new Date().toLocaleString() },
    modifiedTime: String, // 修改时间
  });

  return mongoose.model('Article', ArticleSchema, 'article'); // 我的理解：Article是指定查找的入口，随便取；ArticleSchema是参数；article是你数据集合表的名称
};
