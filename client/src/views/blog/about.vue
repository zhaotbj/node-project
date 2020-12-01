<template>
  <div class="about">
    <div class="avatar_title">
      <el-avatar icon="el-icon-user-solid" size="small"></el-avatar>
      <span class="about_dec">前端打杂人员，略懂代码</span>
    </div>
    <div class="describe">
      <h1>博客简述</h1>
      <el-divider content-position="left">本博客</el-divider>
      <span>前端使用服务端渲染(SSR) Nuxt+vue</span>
      <br />
      <span>后台使用 node+ koa2 + mongoDB</span>
      <li>
        源码地址
        <a class="link_to" href="https://github.com/zhaotbj/node-project">github</a>
      </li>

      <el-divider content-position="left">个人介绍</el-divider>
      <div>
        <span>
          联系方式： QQ
          <span class="link_to">975619483</span>
        </span>
        <a href="javascript:;">
          邮箱：
          <span class="link_to">zhaotianbj@163.com</span>
        </a>
        <li>坐标：北京</li>
        <li>
          其他博客地址：
          <a class="link_to" href="https://juejin.im/user/5c2319a9f265da61117a578f" alt="掘金">掘金</a>
          &nbsp;&nbsp;
          <a href="https://zhaotbj.github.io" class="link_to">vuePress搭建的github.io</a>
        </li>
        <li>技能：</li>
        <li>1. 深入理解原生JavaScript，掌握面向对象，原型链的继承机制等，并熟练ES6语法</li>
        <li>
          2. react、vue框架熟练使用并拥有相关项目经验！
          <el-rate v-model="value1" ></el-rate>
        </li>
        <li>3. 微信小程序：熟悉整个开发流程，并实战多个项目，如：精准寻道、寻道sass...</li>
        <el-rate v-model="value2" ></el-rate>
        <li>4. webpack：熟悉配置，能针对vue项目对脚手架vue.config.js进行性能优化打包配置</li>
        <el-rate v-model="value3" ></el-rate>
        <li>4. 开发工具：vscode、 git</li>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      value1:4,
      value2:4,
      value3:3,
    }
  },
  mounted() {


  }
};
</script>

<style lang="less" scoped>
.about{
  margin-bottom: 100px;
}
.avatar_title {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}
.about_dec {
  margin-left: 1rem;
}
.link_to {
  color: #1890ff;
}
.describe li {
  margin: 3px 0;
}
</style>
