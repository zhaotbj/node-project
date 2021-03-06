const Router = require("koa-router");
const router = new Router();
const user = require("./routes/user");
const home = require("./routes/home.js");
const article = require("./routes/article.js");
const upload = require("./routes/upload.js")
const category = require('./routes/category.js')
const mongoose = require('mongoose')
const {formateTime} = require('./util/util.js')
module.exports = (app) => {
  // 引入user模块
  // 装载所有子路由
  router.get("/", async (ctx, next)=> {

    try {
      console.log('getAllList', ctx.request.body);
      let {cateId, search} = ctx.request.body;
      const Article = mongoose.model('Article');
      const list = await Article.find().sort({"_id": -1}).exec();
	  
      const Category = mongoose.model('Category')

    let arr = []; let cateList=[]

    let result = JSON.parse(JSON.stringify(list))
	  result.map(async v=>{
		  v.createTime = formateTime(v.createTime)
		  if(v.modifiedTime){
			  v.modifiedTime = formateTime(v.modifiedTime)
		  }
      arr.push(v.categoryId)
		  
	  })
    for(let i=0; i<arr.length; i++) {
     const  cateRes = await Category.find({"_id": arr[i]})
     if(cateRes.length>0){
      cateList.push(cateRes[0])
     }
    }
  
    for(let i=0; i<result.length; i++)  {
      for(let j=0; j<cateList.length; j++) {
        if(result[i].categoryId == cateList[j]._id) {
          result[i].category = cateList[j].name
        }
      }

    }
      // ctx.body={result:result, cateArr:'cateInfo'}
	  // return
       await ctx.render('index', {
        page: {
          tab: "index",
          list: result
        }
       });
    } catch (error) {
      ctx.body =  { flag: false, message: "操作失败" + error, };
    }

      
     
  });
  
  router.get("/archives", async (ctx, next)=> {
    // ctx.response.redirect('/posts')
      // ctx.body = '<h1>hello world</h1>'
      let title = 'koa2'
      await ctx.render('index', {
        page: {
          tab: "archives",
        }
        
      })
      // await ctx.render('index');
  });
  
  router.get("/about", async (ctx, next)=> {
     const data = 'hello world' // "<h1>博客简述</h1>\n<p>本博客</p>\n<p> 前端使用服务端渲染(SSR) Nuxt+vue\n后台使用 node+ koa2 + mongoDB</p>\n<p>源码地址 <a href=\"https://github.com/zhaotbj/node-project\">github</a></p>\n<h1>个人介绍</h1>\n<p>联系方式： QQ 975619483 <a href=\"javascript:;\">邮箱： zhaotianbj@163.com</a></p>\n<p>坐标：北京</p>\n<p>其他博客地址： <a href=\"https://juejin.im/user/5c2319a9f265da61117a578f\">掘金</a>  <a href=\"https://zhaotbj.github.io/\">vuePress搭建的github.io</a></p>\n<h1>技能：</h1>\n<ol start=\"\">\n<li>深入理解原生JavaScript，掌握面向对象，原型链的继承机制等，并熟练ES6语法</li>\n<li>react、vue框架熟练使用并拥有相关项目经验！</li>\n<li>微信小程序：熟悉整个开发流程，并实战多个项目，如：精准寻道、寻道sass...</li>\n<li>webpack：熟悉配置，能针对vue项目对脚手架vue.config.js进行性能优化打包配置</li>\n<li>开发工具：vscode、 git</li>\n\n</ol>\n\n"
      // await ctx.render('index', {
      //   page: {
      //     tab:'about',
      //     // aboutInfo: data
      //   }
      // })
      ctx.body = data
  });

  router.get("/article/:id", async (ctx, next)=> {

     let {id} = ctx.params
    const Article = mongoose.model('Article');
    const Category = mongoose.model('Category')
    try {
      const result = await Article.findOne({_id:id}).exec();
      const cateInfo = await Category.findOne({_id: result.categoryId})
      if(result.createTime){
        result.createTime = formateTime(result.createTime)
      } 
      if(cateInfo){
        result.category = cateInfo.name
      }
      
		// return ctx.body={result,cateInfo}
	
      await ctx.render('index', {
        page: {
          tab:"article",
          articInfo: result
        }

      })
    } catch (error) {
      await ctx.render('index', {
        page: {
          tab:"article"
        }

      })
    }
      
      // await ctx.render('index');
  });

  
  router.use("/user", user.routes()); // 用户相关
  router.use("/home", home.routes()); // 
  router.use("/file", upload.routes()); // 文件相关
  router.use("/cate", category.routes()); // 标签
  router.use("/essay", article.routes()); // 文章
  app.use(router.routes()).use(router.allowedMethods());
};
