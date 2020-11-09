<template>
  <div class="list">
    <li
      class="list_item"
      v-for="(item, index) in listData"
      :key="index"
      @click="handleItem(item.id)"
    >
      <p class="date">{{ item.createTime }}</p>
      <div class="description">
        <h2 class="item_title">{{ item.title }}</h2>
      </div>
      <div class="summary">
        <p>{{ item.summary }}</p>
      </div>
      <div class="list-item-action">
        <p>
          <i class="el-icon-date"></i>
          posted @ {{ item.createTime }}
        </p>
        <p>
          <span class="el-icon-chat-dot-square"></span>
          {{ item.commentNumber }}
        </p>
        <p>
          <span class="el-icon-view"></span>
          {{ item.readNumber }}
        </p>
      </div>
    </li>
  </div>
</template>
<script>
import {mapActions} from 'vuex';
export default {
  data() {
    return {
      listData: []
    };
  },
  created() {
    this.handle();
  },
  methods: {
    ...mapActions({
      getHomeList:"getHomeList"
    }),
    async handle() {
      const res = await this.getHomeList();
      if (res.flag) {
          this.listData = res.data;
        }
    },
    handleItem(id) {
      console.log(id)
      this.$router.push({ path: `/_id/${id}` })

    }
  }
};
</script>

<style lang="less" scoped>
.list {
  font-size: 13px;
  .list_item {
    height: 130px;
    border: 1px dashed #ebedf0;
    padding: 10px 10px;
    cursor: pointer;
    margin-bottom: 20px;
    .date {
      color: #399ab2;
    }
    .description {
      cursor: pointer;

      line-height: 2;
      border-left: 3px solid #9cba39;
      padding: 0 6px;
      .item_title {
        color: #9cba39;
      }
    }
    .summary {
      color: #999;
      //  color: rgb(163, 163, 163);
      // line-height: 1.5;

      width: 100%;
      height: 50px;
      /* 类似于display: flex */
      display: -webkit-box;
      /* 类似于flex-dircection */
      /* 垂直的，竖立的; */
      -webkit-box-orient: vertical;
      /* 设定文字显示几行 */
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .list-item-action {
      display: flex;
      justify-content: flex-start;
      margin-top: 6px;
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