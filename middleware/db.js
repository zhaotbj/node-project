var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/project');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('连接了')
});


var loginSchema = new mongoose.Schema({
  username: String,
  password: String
});

var login = db.model("login", loginSchema, "login");
var user1 = new login({ username: '张三', password: '123456' })
// user1.save(function(err) {
//   if(err) {
//     return '错了'
//   }
//   console.log('保存了')
// })
var blogListSchema = new mongoose.Schema({
  title: String,
  kind: String,
  id: String
});
var blogList = db.model("blogList", blogListSchema, "blogList")
/* var blog = new blogList({ title: '我是标题', kind: '我是分类', id: 0 })
blog.save(function(err) {
  if(err) {
    return err
  }
  console.log('保存了1')
}) */

var blogSchema = new mongoose.Schema({
  content:String,
  id:String
});
var blog = db.model("blog",blogSchema,"blog")
// var blog1 =new blog({content: '我是内容我是内容我是内容我是内容', id: 0})
// blog1.save(function(err) {
//   console.log('保存了111')
// })

async function getBlogList(kind) {
  let query = {}
  let results=[]
  if (kind != '/') {
    query = { kind: kind }
  }
  await blogList.find(query).then(function(doc){
    console.log('doc', doc)
    results = doc;
});
  
  return results
}

async function queryMaxID(){
  let temp = 0;
  await  blogList.find({}).sort({'id':-1}).limit(1).then(function(doc){
     if(doc.length>0){
         temp = doc[0].id
     }else{
         console.log("collection is empty");
     }
  });
  return temp;
}
async function insertBlogList(title,kind){
  let value =  await queryMaxID();
   var record = new blogList({title: title, kind: kind, id: ++value});

   await record.save().then(function (err) {
       if (err) {
           console.log(err);
           return;
       }
       console.log("Insert done");

   });
   return value;
}

async function saveBlog(path,id){
  var content = require("fs").readFileSync(path,{encoding:"UTF-8"})
  var query = new blog({content:content,id:id});
  query.save(function(err){
      if(err) return;
      console.log("save done");
  })
}
async function readBlog(id){
  let content;
  console.log('id---',id)
  await blog.find({id:id}).then(function (doc) {
      content = doc
      console.log('内容', doc)
  })
  return content;
}
async function saveBlogs(content, id){
  var query = new blog({content:content,id:id});
  query.save(function(err){
      if(err) return;
      console.log("save done");

  })

}

var dbAPI = {
//  validate:validateLogin,
  getBlogList:getBlogList,
  insertBlogList:insertBlogList,
  // deleteBlogId:deleteBlogId,
  // modifyBlogKind:modifyBlogKind,
  saveBlog:saveBlog, 
  readBlog:readBlog,
  saveBlogs: saveBlogs
}

module.exports = dbAPI;