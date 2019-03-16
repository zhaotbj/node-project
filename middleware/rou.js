const router = require('koa-router')()
const dbAPI = require('./db');
const dealUpload = require('./upload');
router.get('/', async(ctx, next) => {
  //TODO
  const results = await dbAPI.getBlogList('/');
    ctx.body = {
      Status: 200,
      Res: results
    }
});


router.get('/login',async (ctx,next)=>{
  return ctx.render('login');
});

router.post('/login', async (ctx, next) => {
  console.log("get");
  let name = ctx.request.body.name || '',
      password = ctx.request.body.password || '';
  const result = await dbAPI.validate(name,password);
  if (true) {
      ctx.cookies.set("LoginStatus",true);
      ctx.redirect('/blogList');
  } else {
      ctx.body = "Login error"
  }
});
router.get("/blogList",async(ctx,next)=>{
  //TODO
  const results = await dbAPI.getBlogList('/');
  ctx.body = results
//  return ctx.render('blogList',{results:results});

});



router.get("/kind/:kindName",async (ctx,next)=>{
  //TODO 获取某个分类下的文章列表

});

router.get("/kindList",async (ctx,next)=>{
  //TODO 获取所有分类
  await next();
});

router.get("/blog/:blogId",async (ctx,next)=>{
  //TODO
  let blogId = ctx.params.blogId;
  let content = await dbAPI.readBlog(blogId);
  ctx.body = content;
  await next();
});

router.get("/uploadBlog",async (ctx,next)=>{
  console.log("upload");
  ctx.redirect('/upload.html');
});

router.get("/modify/blog/:blogId/:kindName",async (ctx,next)=>{
  await dbAPI.modifyBlogKind(ctx.params.blogId,ctx.params.kindName);
  await next();
})

router.get("/delete/blog/:blogId",async(ctx,next)=>{
  await  dbAPI.deleteBlogId(ctx.params.blogId);
  await next()
})

router.post("/delete/kind/:kindName",async(ctx,next)=>{
  //TODO 删除某个分类
  await next()
})

router.post("/modify/kind/:kindName",async(ctx,next)=>{
  //TODO 修改类型名
  await next()
})

router.post("/new/kind/:kindName",async(ctx,next)=>{
  //TODO 新建分类名称
  await next()
})


router.get("/uploadBlog",async (ctx,next)=>{
  console.log("upload");
  ctx.redirect('/upload.html');
});


router.post("/upload",(ctx,next)=>{
  dealUpload(ctx);
})
const formidable = require("formidable");

/* var blogSchema = new mongoose.Schema({
  content:String,
  id:String
});
var blog = db.model("blog",blogSchema,"blog") */
router.post("/save", async(ctx, next)=>{
  let {content} = ctx.request.body
  const res = await dbAPI.saveBlogs(content,11)
  ctx.body=res
})

router.post("/article",async (ctx,next)=>{
  let = {id} =ctx.request.body 
  console.log(ctx.request.body, ' article')
  var result =  await dbAPI.readBlog(id);
  // ctx.body=result.content;
  ctx.body={
    Status: 200,
    Ret: result
  }
})
module.exports = router
