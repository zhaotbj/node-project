<template>
  <div>
    <el-container>
      <el-header class="max_header">
        <BlogHeaderPC  class="pc"/>
       <BlogHeaderPhone  class="phone"/>

      </el-header>
       
      <el-container class="blog_content">
        <el-aside width="250px" class="b_aside">
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
import AsideBlog from "@/components/AsideBlog";
import BlogHeaderPC from "@/components/Header";
import BlogHeaderPhone from "@/components/HeaderPhone";
export default {
  components: {
    AsideBlog,
    BlogHeaderPC,
    BlogHeaderPhone
  },
  data() {
    return {
      search:'',
      isPC:false
    };
  },
  mounted(){
   
  },
  methods: {
    
  },
};
</script>

<style lang="less" scoped>
// @import url("@/assets/css/media.less");

@media screen and (min-width: 480px) and (max-width: 2000px) {
  .blog_header_phone{
    display: none;
  }
  .max_header .pc{
              display: block;
            }
            .max_header .phone{
              display:none;
            }
  .blog_content {
    width: 1000px;
    margin: 0 auto;
  }
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


@media screen and (min-width: 320px) and (max-width: 480px) {
            .max_header .pc{
              display: none;
            }
            .max_header .phone{
              display:block;
            }
            .b_aside {
              display: none;
            }
           
        }
</style>
