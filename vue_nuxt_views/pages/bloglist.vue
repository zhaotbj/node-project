<template>
  <div class="list">
    <li class="list_item" v-for="(item, index) in listData" :key="index"
    @click="handleItem(item.articleId)">
      <p class="date">{{item.createTime}}</p>
      <div class="description">
        <h2 class="item_title">{{item.title}}</h2>
      </div>
      <div class="summary">
        <p>{{item.summary}}</p>
      </div>
      <div class="list-item-action">
        <p>
          <i class="el-icon-date"></i>
          posted @ {{item.createTime}}
        </p>
        <p>
          <span class="el-icon-chat-dot-square"></span>
          {{item.commentNumber}}
        </p>
        <p>
          <span class="el-icon-view"></span>
          {{item.readNumber}}
        </p>
      </div>
    </li>
  </div>
</template>
<script>
import { get } from '../static/api'
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
      get("/article/getAllList").then(res => {
        console.log(res)
        if (res.code === 200) {
          this.listData = res.message
        }
      });
    },
    handleItem(id) {
      console.log(id)
      this.$router.push({ path: `/article/${id}` })

    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/bloglist.scss";
</style>