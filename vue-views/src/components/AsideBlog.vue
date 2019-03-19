<template>
  <div class="blog_aside">
    <div class="blog_aside_img"><img src="../assets/img.jpg" alt=""></div>

      <ul class="blog_aside_link">
        <li><a href="https://juejin.im/user/5c2319a9f265da61117a578f"><img  src="../assets/logo.a7995ad.svg" alt="掘金" class="logo-img"></a></li>
        <li>
          <svg height="20" class="octicon octicon-mark-github"  version="1.1" width="20" aria-hidden="true"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>
          <a class="link_github" href="https://github.com/zhaotbj">github</a>
          </li>
      </ul>
    
    <div class="blog_tag">
      <el-tag type="success">Vue</el-tag>
      <el-tag type="info">vue-router</el-tag>
      <el-tag type="warning">Vuex</el-tag>
      <el-tag type="danger">Node</el-tag>
      <el-tag type="success">React</el-tag>
      <el-tag type="info">ES6</el-tag>
      <el-tag type="warning">H5C3</el-tag>
      <!-- <el-tag type="danger">标签五</el-tag> -->
    </div>
  </div>
</template>
<script>
export default {
  name:'Aside'
}
</script>
<style lang="less">
.blog_aside {
  .blog_aside_img {
    margin-top: 20px;
    img {
      width: 162px;
      height: 162px;
      border-radius: 50%;
    }
  }
  .blog_aside_link{
    display: flex;
    justify-content: space-around;
    li {
      height: 30px;
      width: 65px;
      .logo-img {
      width: 30px;
      height: 30px;
    }
      .octicon-mark-github {
      margin-top: 6px;
      }
      .link_github {
        font-size: 12px;
        line-height: -4px;
        vertical-align: super;
        color: #a3a3a3;
      }
      
    }
    li:hover {
       background-color:  #effbff;
      }
    
  }
  .blog_tag{
    margin: 50% 0;
  }
}
</style>

