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
import { mapActions} from 'vuex';
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
    ...mapActions({
      saveArtic:'saveArtic'
    }),
    subm() {
      this.handleImageAdded(this.htmlForEditor)
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

    let params  = {
      userId: Date.now().toString(),
      'title':this.title,
      content: file,
      image:"",
      summary:"",
      type:"",
      readNumber:""
    }
        try {
          const result = await this.saveArtic(params);
        if (result.flag) {
            this.$message({
              message: '保存成功！',
              type: 'success',
              duration: 2000
            });
            this.$router.push({path:"/"})
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
