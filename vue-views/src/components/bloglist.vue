<template>
  <div class="list">
    <button @click="handle">btn</button>
    <ul>
      <li class="list_item" v-for="(item, index) in listData" :key="index">
        <p class="date">2019年3月15日</p>
        <div class="description">
          <p @click="handleItem(item.id)">{{item.title}}</p>
        </div>
        <div class="summary">
          <p @click="handleItem(item.id)">{{item.summary}}</p>
        </div>
        <div class="list-item-action">
          <p>
            <i class="el-icon-date"></i> posted @ 2019-03-15
          </p>
          <p>阅读10</p>
          <p>评论10</p>
        </div>
      </li>
      <li class="list_item">
        <p class="date">2019年3月15日</p>
        <div class="description">
          <router-link to="/">我是标题</router-link>
        </div>
        <div class="summary">
          <router-link to="/"><p>摘要: Sys模块： 获取Python有关的环境变量： 命令行传递参数 利用flush模拟进度条： 其他： Import导入模块： 导入模块时会在当前路径下和环境变量（lib或者site-packages目录）里寻找 简单的导入模块 import的使用： 将模块解释并把内容赋值到一个变量中 from...i</p></router-link>
        </div>
        <div class="list-item-action">
          <p>
            <i class="el-icon-date"></i> posted @ 2019-03-15
          </p>
          <p>阅读10</p>
          <p>评论10</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      listData: []
    };
  },
  created() {
    this.handle()
  },
  methods: {
    handle() {
      this.$http.get("/").then(res => {
        let result = res.data
        if(result.Status ===200) {
          this.listData= result.Res
        }
      });
    },
    handleItem(id) {
      // this.$router.push({ path: `/article/${id}` })
      this.$router.push({ name: 'article', params: { id }}) // -> /user/123
 
    }
  }
};
</script>

<style lang="less">
.list {
  font-size: 13px;
  .list_item {
    height: 120px;
    border: 1px dashed #ebedf0;
    padding: 10px 10px;
    .date {
      color: #399ab2;
    }
    .description {
      cursor: pointer;
      max-height: 260px;
      line-height: 2;
      border-left: 3px solid #9cba39;
      padding: 0 6px;
      a {
        color: #9cba39;
      }
    }
    .summary {
      //  color: rgb(163, 163, 163);
      line-height: 1.5;
      margin-top: 10px;
      p {
        width: 100%;
        /* 类似于display: flex */
        display: -webkit-box;
        /* 类似于flex-dircection */
        /* 垂直的，竖立的; */
        -webkit-box-orient: vertical;
        /* 设定文字显示几行 */
        -webkit-line-clamp: 3;
        overflow: hidden;
      }
    }
    .list-item-action {
      display: flex;
      justify-content: flex-start;
      margin-top: 15px;
      line-height: 1.5;
      color: #a3a3a3;
      p {
        padding: 0 5px;
      }
    }
  }
  .list_item:hover {
    background: #effbff;
    box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.1);
  }
}
</style>