<h1 align="center">Vue后台管理系统模板</h1>

这是基于vuecli3.0搭建的后台系统模板，做了Vuex Modules的拆分，实现了开发|测试|生产环境的配置

## 配置环境变量 VUE_APP_URL
```
.env
.env.development
.env.production

```
```javascript
// mian.js
console.log(process.env.VUE_APP_URL,'环境变量')
```
打包后在本地预览，需要启动一个node本地服务
```
npm install -g serve //全局安装服务


serve -s dist // 启动服务预览
浏览器控制台获取当前的环境:
console.log(process.env.VUE_APP_URL)
```
## 使用
```

npm run dev|| npm run serve 开发环境
npm run dev-build 测试环境打包
npm run build 线上环境打包

```

## 文件说明
```
├── config 配置文件
├── public
├──src
│   ├── api  登录退出用户信息api
│   ├── assets
│   ├── components 公用组件
│   │     └── HelloWorld.vue
│   ├── router 路由
│   ├── store 数据仓库
│   ├── utils 
│   ├── views 试图模块
│   ├── App.vue
│   ├── main.js
├── vue.config.js webpack配置
```

