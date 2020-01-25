<template>
  <div id="editor">
    <div class="content">
    <h1 class="article_title">{{article.title}}</h1>
    <div class="user">
      <img src="../../static/img.jpg" alt />
      <div class="right">
        <h3>北京大土豆</h3>
        <span>{{article.createTime}}</span>
            <span>阅读 {{article.readNumber}}</span>
        <span>点赞 {{article.commentNumber}}</span>
      </div>
    </div>
    <div class="">
      <div class="" v-html="article.content"></div>
    </div>
    </div>
  </div>
</template>
<script>
import { get } from '../../static/api'
export default {
  data() {
    return {
      article: ""
    };
  },
  watch: {},
  mounted() {
    this.getArticle();

  },
  methods: {
    getArticle() {
      console.log(this.$route);
      let { id } = this.$route.params;
      get(`/article/getContentById`, { articleId: id }).then(res => {
        console.log(res)

        if (res.code === 200) {
          this.article = res.message
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/article.scss";

</style>
<style >
 .ql-syntax {
    /* overflow-x: auto;
    color: #525252;
    white-space: pre;
    padding: 1.2em 1.4em;
    line-height: 1.5em;
    font-size: 1em;
    display: block;
    color: #e96900;
    padding: 3px 5px;
    margin: 0 2px;
    border-radius: 2px;
    white-space: nowrap; */
    padding: 10px;
    overflow: auto;
    margin: 20px 0;
    font-size: 13px;
    color: #4d4d4c;
    background: #f7f7f7;
    line-height: 1.6;
  }
</style>