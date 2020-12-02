<template>
  <div>
    <div class="upload_header">
      <el-input
        class="article_title"
        v-model="title"
        placeholder="输入文章标题..."
      ></el-input>
      <div class="">
        <el-button type="text" @click="subm">发布</el-button>
        <img class="header_img" src="../../static/img.jpg" alt="" />
      </div>
    </div>
    <!-- <vue-editor @imageAdded="handleImageAdded" v-model="htmlForEditor"></vue-editor> -->
    <div class="markdown-body">
      <mavon-editor
        :toolbars="toolbars"
        @imgAdd="handleEditorImgAdd"
        @imgDel="handleEditorImgDel"
        style="height: 600px"
        v-model="htmlForEditor"
        @change="change"
        ref="md"
      />
    </div>
    <el-dialog title="登录" :visible.sync="categoryDialog" width="30%">
      <el-radio-group v-model="category">
        <el-radio :label="item.value" v-for="item in categoryList" :key="item._id">{{item.name}}</el-radio>
      </el-radio-group>
    </el-dialog>
  </div>
</template>
<script>
import { VueEditor } from "vue2-editor";
import { mapActions } from 'vuex';
import 'mavon-editor/dist/css/index.css'  //导入
export default {
  components: {
    VueEditor
  },
  data() {
    return {
      title: '',
      htmlForEditor: '',
      blogInfo: {
        blogMdContent:"",
        blogContent:""
      },
      category: '', //分类
      categoryDialog: false,
      categoryList: [],
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: false, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true, // 预览
      }
    };
  },
  methods: {
    ...mapActions({
      saveArtic: 'saveArtic',
      getCategory: 'getCategory',
      uploadImage: 'uploadImage'
    }),

    //监听markdown变化
    change(value, render) {
      console.log(value, render);
      this.htmlForEditor = render;
      this.blogInfo.blogMdContent = value;
      this.blogInfo.blogContent = render;
    },
    //上传图片接口pos 表示第几个图片 
    handleEditorImgAdd(pos, $file) {
      var formdata = new FormData();
      formdata.append('file', $file);
      this.uploadImage(formdata).then(res=>{
        this.$refs.md.$img2Url(pos, window.location.host + res.filePath)
      })
      // this.$axios
      //   .post("http://localhost:8000/blogs/image/upload/", formdata)
      //   .then(res => {
      //     var url = res.data.data;
      //     this.$refs.md.$img2Url(pos, url);  //这里就是引用ref = md 然后调用$img2Url方法即可替换地址
      //   });
    },
    handleEditorImgDel() {
      console.log('handleEditorImgDel');    //我这里没做什么操作，后续我要写上接口，从七牛云CDN删除相应的图片
    },
    subm() {
      if(!this.category) {
        // 选分类
        this.categoryDialog = true;
        this.getCategory().then(res=>{
          if(res.flag){
            this.categoryList = res.data;
          }
        })
        return
      }
      this.handleImageAdded(this.blogInfo.blogContent)
    },
    //  Editor, cursorLocation, resetUploader
    handleImageAdded: async function (file) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)
      if (!file) {
        return
      }

      if (this.title === '' || !this.title) {
        this.$message({
          message: '标题不能为空',
          type: 'warning',
          duration: 2000
        });
        return
      }
    let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      if(!userInfo ||!userInfo.userId){
        this.$message({
          message: '请先登录',
          type: 'warning',
          duration: 2000
        });
        return
      }

      let params = {
        userId: userInfo.userId,
        userName:userInfo.userName,
        title: this.title,
        content: file,
        category: this.category //分类
      }
      
      try {
        const result = await this.saveArtic(params);
        if (result.flag) {
          this.$message({
            message: '保存成功！',
            type: 'success',
            duration: 2000
          });
          this.$router.push({ path: "/" })
          this.title = ''
          this.htmlForEditor = ''
        }
      } catch (error) {
        console.log(error)
      }

    }
  }

};
</script>
<style lang="less" scoped>
/deep/.el-input__inner {
  border: none;
}
.upload_header {
  display: flex;
  justify-content: space-between;
  padding: 20px 50px;
}
.header_img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  vertical-align: middle;
}

.article_title {
  width: 350px;
  margin-right: 20px;
  border: none;
}

.quillWrapper {
  padding: 0 100px;
}
</style>
