<template>
  <div>
    <div class="upload_header">
      <el-input class="article_title" v-model="title" placeholder="输入文章标题..."></el-input>
      <div class="">
         <el-button type="text" @click="subm">发布</el-button>
          <img class="header_img" src="../static/img.jpg" alt="">
      </div>
    </div>
    <vue-editor @imageAdded="handleImageAdded" v-model="htmlForEditor"></vue-editor>
  </div>
</template>
<script>
import { VueEditor } from "vue2-editor";
export default {
  components: {
    VueEditor
  },

  data() {
    return {
      title: '',
      htmlForEditor: ''
    };
  },
  methods: {
    subm() {
      this.handleImageAdded(this.htmlForEditor)
    },
    //  Editor, cursorLocation, resetUploader
    handleImageAdded: function (file) {
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

      var formData = new FormData();
      formData.append('file', file)
      formData.append('title', this.title)

      this.$http({
        url: '/save',
        method: 'POST',
        data: { content: file, title: this.title }
      })
        .then((result) => {
          let { Status } = result.data
          if (Status === 200) {
            this.$message({
              message: '保存成功！',
              type: 'success',
              duration: 2000
            });
            this.$router.push({path:"/"})
            this.title = ''
            this.htmlForEditor = ''
          }
          /* let url = result.data.url // Get url from response
          Editor.insertEmbed(cursorLocation, 'image', url);
          resetUploader(); */
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

};
</script>
<style scoped>
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
