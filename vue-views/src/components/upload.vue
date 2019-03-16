<template>
  <div>
    <el-input class="article_title" v-model="title" placeholder="请输入标题"></el-input>
  <vue-editor @imageAdded="handleImageAdded" v-model="htmlForEditor"></vue-editor>
  <el-button type="success"  @click="subm">保存</el-button>
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
    handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
        // An example of using FormData
        // NOTE: Your key could be different such as:
        // formData.append('file', file)

        var formData = new FormData();
        formData.append('file', file)
        formData.append('title', this.title)
        
        this.$http({
          url: '/save',
          method: 'POST',
          data: {content: file, title: this.title}
        })
        .then((result) => {
          let {Status} = result.data
          if(Status ===200) {
            this.$message({
            message: '保存成功！',
            type: 'success'
          });
          this.title=''
          this.htmlForEditor= ''
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
<style lang="less">
.article_title {
  text-align: center;
  .el-input__inner {
    width: 300px;
  }
}
</style>
