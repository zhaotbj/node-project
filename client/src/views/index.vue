<template>
  <div class="blog_wrap">
    <el-container>
      <el-header class="max_header">
        <BlogHeader />
      </el-header>
      <el-container>
        <el-aside width="200px">
          <AsideBlog />
        </el-aside>
        <el-container>
          <el-main><router-view /></el-main>
          <el-footer>Footer</el-footer>
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

<style lang="less">
@import url("@/assets/css/media.less");
// .max_header {
//   margin-top: 30px;
// }
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
.blog_wrap {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 20px;
}
.blog_content {
  display: flex;
}
</style>
