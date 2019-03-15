const formidable = require("formidable");
const dbAPI = require("./db");
const fs = require("fs");
async function dealUpload(ctx, next) {
  if (ctx.method == "POST" && ctx.path == "/upload") {
    // console.log("d", __dirname); // C:\zt-learning\learningCode\node\blog-project\middleware

    var form = new formidable.IncomingForm();//创建Formidable.IncomingForm对象
    // form.keepExtensions = true;//保持原有的扩展名
    //  form.uploadDir = __dirname+"/static/blogs";//设置文件存放目录


    form.parse(ctx.req, async function (err, fields, files) {
      if (err) { throw err; return; }
      //  console.log(fields, files);//{ submit: 'submit' }
      //文件重命名
      // console.log('files.upload.path', files)

      fs.renameSync(files.file.path, __dirname.slice(0, -11) + "/static/blogs/" + files.file.name)

      var value = await dbAPI.insertBlogList(files.file.name, fields.kind);
      // console.log("Id is-------------------------", value);
      //  //将文件内容存入数据库
      dbAPI.saveBlog(__dirname.slice(0, -11) + "/static/blogs/" + files.file.name, value+1)
    });

    form.on('progress', function (bytesReceived, bytesExpected) {
      // console.log(bytesExpected/1024/1024);
      if (bytesExpected > 100 * 1024) {
        console.log("File too big");
        form.emit('error', new Error('File upload canceled by the server.'));
        //TODO 取消用户上传
      }
    });

    form.on("error", function () {

      ctx.body = "File too big"
    })

  } else {
    await next();
  }
}

module.exports = dealUpload;