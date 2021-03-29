# 博客介绍
服务端渲染生成博客页面，技术栈Koa2 + Ejs+MongoDB 后台管理React.JS 

预览地址 

http://39.100.82.50:3002

预览地址

http://39.100.82.50:3002

# 第三次改版，决定使用服务端渲染方式，使用ejs模板引擎，已完成列表个详情页
- [ ] 懒加载或分页
- [ ] 归档页面原生重写不适用ui组件库
- [ ] 分类查询重写
- [ ] 事件方法都重写，使用原生js不借助框架


### 前端 vue全家桶

### 后台 node+koa2+mongoDB
### 后台管理 React+antd  

### 目录说明：
 默认是后台目录， 其中client目录下是前端代码

后台管理项目另起仓库 https://github.com/zhaotbj/react-blog-admin 

# 启动项目
- node项目
```
node app.js 或 npm run dev
默认是3002端口
```
- vue项目
```
cd 进入 client目录下
npm install
npm run serve
```
- React后台管理
```
npm install或 yarn
npm start或 yarn start
```

# 技术栈
- 前端
  + vue 
  + React全家桶

- 后端
  + koa2 + koa-router
  + mongoDB 

# 实现功能

- [x] 主页+ 列表页+ 侧边栏
- [x] markdown 编辑器 mavon-editor
- [x] 登录， 注册
- [x] 写文章
- [x] 首页展示
- [x] 登录后管理员删改
- [x] 标签， 分类
- [x] 评论
- [x] 根据分类查列表
- [x] 文章加评论
- [x] 点赞
- [x] 加归档
