<template>
  <div class="detail">
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
              <div class="footer_box">
                <div class="read">阅读：{{article.readNumber}}</div>
              <div class="zhan" @click="handleZhan">点赞 
                <span class="el-icon-star-off"></span>
              </div>
              </div>
              <div class="comment">
                <h1>评论</h1>
                <ul>
                  <li v-for="v in commentList" :key="v._id">
                    <div v-for="(item, i) in v.comment" :key="item.createTime" class="comment_item">
                     <div>
                        <h2>{{i+1}}楼</h2>
                        
                        <p class="nickname">昵称：{{item.name}}</p>
                      
                        <p class="content_comment">内容：{{item.desc}}</p>
                     </div>
                    <div class="time">发表时间：{{item.time}}</div>
                    </div>
                    
                  </li>
                </ul>
              </div>
              <div class="comment_box">
                <el-input class="item" size="small" v-model="comment.name" placeholder="请输入你的大名"></el-input>
                <el-input class="item" size="small" v-model="comment.email" placeholder="请输入email"></el-input>
                <el-input class="item" size="small" v-model="comment.url" placeholder="个人网站"></el-input>
                <el-input
                  class="item"
                  size="small"
                  type="textarea"
                  :rows="2"
                  placeholder="随便写点凑个数..."
                  v-model="comment.desc">
                </el-input>
                 <el-button  type="info" size="small" @click="subComment">提交</el-button>
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
      article: {},
      commentName:"",
      comment: {
        name:"",
        email:"",
        url:"",
        desc:""
      },
      commentList: []
    };
  },
  watch: {},
  mounted() {
    this.getArticle();
  },
  methods: {
    ...mapActions({
      getDetail: "getDetail",
      updateZhan:"updateZhan",
      updateComment:"updateComment",
      getCommentByArticleId:"getCommentByArticleId"
    }),
    async getArticle() {
      let { id } = this.$route.params;
      const res = await this.getDetail(id);
      if (res.flag) {
        this.article = res.data;
        this.getComment();
      }
    },
    getComment(){
      this.getCommentByArticleId(this.$route.params.id).then(response=>{
          if(response.flag) {
            this.commentList = response.data;
          }

        })
    },
    handleZhan(){
      this.updateZhan({id: this.article.id}).then(res=>{
        if(res.flag){
           this.$message({
            message: '保存成功！',
            type: 'success',
            duration: 2000
          });
        }
      })
    },
    subComment(){
      if(!this.comment.name|| !this.comment.desc){
        this.$message({
          message: '至少填写一项',
          type: 'warning',
          duration: 2000
        });
        return;
      }
      this.comment.articleId = this.article._id
      this.updateComment(this.comment).then(res=>{
        if(res.flag){
          this.getComment();
          this.$message({
            message: '保存成功！',
            type: 'success',
            duration: 2000
          });
           this.comment.name = "";
           this.comment.email = "";
           this.comment.url = "";
           this.comment.desc = "";

        } else {
          this.$message({
            message: '失败了',
            type: 'success',
            duration: 2000
          });
        }
      })
    }
  }
};
</script>

<style lang="less" >
.detail {
  background-color: #f2f2f2;
  width: 100%;
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
}
.footer_box {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #969696;
  .zhan {
    cursor: pointer;
  }
}
.comment {
    h1 {
    height: 60px;
    line-height: 60px;
    font-size: 16px;
    color: #333;
    }
    h2 {
      color: #787878;
      margin: 10px 0;
    }
    .nickname {
      color: #787878;
      font-size: 14px;
    }
    .content_comment {
      margin: 10px 0;
    }
  background-color: #fff;
  .comment_item {
    display: flex;
    justify-content: space-between;
    .time {
      color: #999999;
      font-size: 14px;
    }
  }
}
.comment_box {
  .item{
    margin-bottom: 10px;
  }
}
#editor {
  display: flex;
  justify-content: center;
  .content {
    max-width: 750px;
    background-color: #fff;
    min-height: 800px;
    // text-align: center;
    img {
      width: 100%;
    }
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