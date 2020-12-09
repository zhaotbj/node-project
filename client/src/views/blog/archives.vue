<template>
  <div class="block">
    <el-timeline>
      <el-timeline-item
        v-for="v in activities"
        :key="v.id"
        :timestamp="v.date"
        placement="top"
      >
        <el-card v-for="item in v.children" :key="item.id" class="card_item">
          <h4>{{item.title}}</h4>
          <p>{{item.desc}}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      activities: []
    };
  },
  created() {
    this.init()
  },
  methods: {
    ...mapActions({
      getArchives:"getArchives"
    }),
    async init() {
      const res= await this.getArchives();
      if(res.flag){
        this.activities = res.data;
      }
    },
    lookArticle(id) {
      this.$router.push({ name: 'article', params: { id } })
    }
  }
};
</script>
<style>
.el-timeline-item__node {
  background-color: #1890fd;
}
.el-timeline-item {
  cursor: pointer;
}
.el-timeline {
  margin-top: 10px;
}
.card_item {
  margin-bottom: 10px;
}
</style>
