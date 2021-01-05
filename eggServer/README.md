# 博客介绍
- egg配置文件上传
- egg配置跨域

前端展示 http://39.100.82.50:8111/
后台管理 http://39.100.82.50:8080
该项目使用前后端分离开发，前端展示、node做后台、以及后台管理。涉及的技术

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