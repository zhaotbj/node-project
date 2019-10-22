<template>
  <div class="block">
  <div class="radio">
    排序：
    <el-radio-group v-model="reverse">
      <el-radio :label="true">倒序</el-radio>
      <el-radio :label="false">正序</el-radio>
    </el-radio-group>
  </div>

  <el-timeline :reverse="reverse">
    <el-timeline-item
      v-for="(item, index) in activities"
      :key="index"
      :timestamp="item.time" @click.native="lookArticle(item.id)">
      {{item.title}}
    </el-timeline-item>
  </el-timeline>
</div>
</template>


<script>
  export default {
    data() {
      return {
        reverse: true,
        activities: [{
          title: '活动按期开始',
          time: '2018-04-15'
        }]
      };
    },
    created() {
      this.init()
      
    },
    methods: {
      init() {
        this.$http.get("/archives").then(res => {
        let {Status, Ret} = res.data
        if(Status ===200) {
          this.activities= Ret
        }
      });
      },
      lookArticle(id) {
     this.$router.push({ name: 'article', params: { id }})
      }
    }
  };
</script>
<style lang="less">
.el-timeline-item__node {
      background-color: #1890FD;
}
.el-timeline-item {
  cursor: pointer;
}
.el-timeline {
  margin-top: 10px;
}
</style>
