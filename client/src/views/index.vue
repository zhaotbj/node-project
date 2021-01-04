<template>
  <div>
    <el-container>
      <el-header class="max_header">
        <BlogHeader />
      </el-header>
      <el-container class="blog_content">
        <el-aside width="300px">
          <AsideBlog />
        </el-aside>
        <el-container>
          <el-main><router-view /></el-main>
          <!-- <el-footer>Footer</el-footer> -->
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import AsideBlog from '@/components/AsideBlog';
import BlogHeader from '@/components/Header';
export default {
  components: {
    AsideBlog,
    BlogHeader
  },
  data() {
    return {}
  },
  methods: {

  }

}
</script>

<style lang="less" scoped>
@import url("@/assets/css/media.less");

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
.blog_content {
  width: 1200px;
  margin: 0 auto;
}
</style>
