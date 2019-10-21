<template>
  <div class="about">
    <div class="about_title">
      <h1 class="readme">README</h1>
    </div>
    <div>
      <h1>博客简述</h1>
      <br>
      <p>本博客使用的技术为 vue + element-ui + koa2 + mongoDB</p>
      <p>源码地址<a class="github" href="https://github.com/zhaotbj/node-project">  github</a></p>
    </div>
    <div>
      <br>
      <h1>个人介绍</h1>
      <div>
        <span>联系方式：QQ 975619483</span> <a href="javascript:;">邮箱： zhaotianbj@163.com</a>
        <p>坐标：北京</p>
        <span>参与的项目：</span>智能财税核算平台<a class="github" href="http://jzhangfang.com/zmkh-web/index.html"> jzhangfang.com</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "About",
  mounted() {


  }
};
</script>

<style lang="less">
.about {
  font-size: 13px;
  color: #555;
  .about_title {
    text-align: center;
    .readme {
      font-size: 30px;
    }
    
  }
  h1 {
    font-size: 15px;
  }
  p {
    line-height: 1.5;
  }
  .github {
    color: #1890FD;
  }
  .about_simple {
    // display: inline-block;
    padding: 0 10px;
  }
}
</style>
