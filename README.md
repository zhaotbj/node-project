# 博客介绍

- 前后端分离开发

- 前端使用ssr  vue+nuxt.js 实现，后台使用node.js + koa2 + mongoDB 前后端分离的简约风格的博客

> 默认是后台目录， 其中vue_nuxt_views目录下是前端代码

# 启动项目
- node项目
```
node app.js 或 npm run dev
默认是3000端口
```
- vue项目
```
cd 进入 vue_nuxt_views目录下

npm run dev
默认是8080端口
```

# 技术栈
- 前端
  + vue+ nuxt.js  服务端渲染
  + vue-router
  + axios
  + element-ui

- 后端
  + koa2 + koa-router
  + mongoDB 

# 实现功能

- [x] 主页+ 列表页+ 侧边栏+ 搜索
- [x] 富文本 vue2-editor
- [ ] 登录， 注册
- [x] 增
- [x] 查
- [ ] 删改
- [ ] 标签， 分类
- [ ] 评论
