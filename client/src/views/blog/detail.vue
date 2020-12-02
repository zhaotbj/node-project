<template>
  <div>
    <el-container>
      <el-header class="max_header">
        <BlogHeader />
      </el-header>
        <div id="editor">
            <div class="content">
              <h1 class="article_title">{{ article.title }}</h1>
              <div class="user">
                <!-- <img src="../../static/img.jpg" alt /> -->
                <div class="right">
                  <span>发布于：{{ article.createTime }}</span>
                  <span>作者：{{'admin'}}</span>
                  <span>分类：{{'分类'}}</span>
                  <span>阅读： {{ article.readNumber }}</span>
                  <span>点赞： {{ article.commentNumber }}</span>
                </div>
              </div>
              <div class="markdown-body">
                <div class="" v-html="article.content"></div>
              </div>
            </div>
          </div>
    </el-container>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import BlogHeader from '@/components/Header';
import 'github-markdown-css';
export default {
  components: { BlogHeader },
  data() {
    return {
      article: {}
    };
  },
  watch: {},
  mounted() {
    this.getArticle();
  },
  methods: {
    ...mapActions({
      getDetail: "getDetail"
    }),
    async getArticle() {
      let { id } = this.$route.params;
      const res = await this.getDetail(id);
      if (res.flag) {
        this.article = res.data;
      }
    }
  }
};
</script>

<style lang="less">
/deep/.el-header,
/deep/.el-footer {
  padding: 5px 10px;
  background-color: #fff;
  box-shadow: 0 2px 8px #f0f1f2;
  text-align: center;
  line-height: 60px;
}
/deep/.el-header .el-input__inner {
  border: none;
}
#editor {
  display: flex;
  justify-content: center;
  .content {
    max-width: 800px;
  }
  .article_title {
    font-weight: bold;
    text-align: center;
    line-height: 3;
  }
   .user {
    display: flex;
    .right span {
      font-size: 13px;
      color:#969696;
      margin-right: 10px;
    }
  }
   .user img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
   .user .right {
    margin-left: 20px;
  }
  
   .content {
    padding: 10px 20px;
    // background-color: #fff;
  }
}
</style>