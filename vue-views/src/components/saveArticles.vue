<template>
  <div>
  <vue-editor @imageAdded="handleImageAdded" v-model="htmlForEditor"></vue-editor>
  <button @click="subm">12121212</button>
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
      content: "<h1>Some initial content</h1>",
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
        console.log(formData)
        // this.$http.post('/save', JSON.stringify({data: file}))
        // return
        this.$http({
          url: '/save',
          method: 'POST',
          data: {content: file}
        })
        .then((result) => {
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
