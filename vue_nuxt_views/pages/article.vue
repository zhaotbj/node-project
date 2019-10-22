<template>
  <div id="editor" class="article_content">
    <h1 class="article_title">{{title}}</h1>
    <div v-html="article"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "",
      article: ""
    };
  },
  watch: {},
  mounted() {
    this.getArticle();

    /* this.$bus.on('look_article', id=> {
     
    }) */
  },
  methods: {
    getArticle() {
      console.log(this.$route);
      let { id } = this.$route.params;
      this.$http.post(`/article`, { id: id }).then(res => {
        let { Status, Ret } = res.data;
        console.log(Status, Ret);
        if (Status === 200) {
          this.article = Ret[0].content;
          this.title = Ret[0].title;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/article.scss";
</style>
