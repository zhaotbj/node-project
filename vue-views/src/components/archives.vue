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
      v-for="(activity, index) in activities"
      :key="index"
      :timestamp="activity.timestamp">
      {{activity.content}}
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
          content: '活动按期开始',
          timestamp: '2018-04-15'
        }, {
          content: '通过审核',
          timestamp: '2018-04-13'
        }, {
          content: '创建成功',
          timestamp: '2018-04-11'
        }]
      };
    },
    created() {
      this.init()
    },
    methods: {
      init() {
        this.$http.get("/archives").then(res => {
        let {Status, Res} = res.data
        if(Status ===200) {
          this.activities= Res
        }
      });
      }
    }
  };
</script>
<style lang="less">
.el-timeline-item__node {
      background-color: #1890FD;
}
</style>
