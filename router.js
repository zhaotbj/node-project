const Router = require("koa-router");
let router = new Router();
let user = require("./api/user");
let home = require("./api/home.js");
let article = require("./api/article.js");

module.exports = (app) => {
  // 引入user模块
  // 装载所有子路由
  router.get("/", async (ctx, next)=> {
    // ctx.response.redirect('/posts')
      // ctx.body = '<h1>hello world</h1>'
      await ctx.render('index');
  });
  
  
  router.use("/user", user.routes());
  router.use("/home", home.routes());
  router.use("/article", article.routes());
  app.use(router.routes()).use(router.allowedMethods());
};
