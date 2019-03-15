<template>
 <el-container>
  <el-header>

    <el-row>
      <el-col :span="12">
        <div class="">
          <el-col :span="10"  ><div class="">博客</div></el-col>
          <el-col :span="12" ><div class="">
            <el-input v-model="input" placeholder="请输入内容"></el-input></div>
            </el-col>
        </div>
        </el-col>
      <el-col :span="12">
        <div class="">
          <el-col :span="6"><div class="header_title"><a href="javascript:;">首页</a></div></el-col>
          <el-col :span="4"><div class="header_title"><a href="javascript:;">归档</a></div></el-col>
          <el-col :span="4"><div class="header_title"><a href="javascript:;">分类</a></div></el-col>
          <el-col :span="4"><div class="header_title"><a href="javascript:;">关于</a></div></el-col>
          <el-col :span="2"><div class="header_title"><a href="javascript:;">登录</a></div></el-col>
          <el-col :span="2"><div class="header_title">注册</div></el-col> 
          </div>
        </el-col>
    </el-row>
  </el-header>
  <el-container>
    <el-aside width="260px">Aside</el-aside>
    <el-container>
      <el-main>Main</el-main>
      <!-- <el-footer>Footer</el-footer> -->
    </el-container>
  </el-container>
</el-container>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      input: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.el-header, .el-footer {
    padding: 0 0;
    background-color: #fff;
    box-shadow: 0 2px 8px #f0f1f2;
    text-align: center;
    line-height: 60px;
  }
  .el-header .el-input__inner {
    border: none;
  }
  .el-aside {
    background-color: #fff;
    text-align: center;
    
    border-right: 1px solid #ebedf0;
    height: calc(100vh - 104px);
    text-align: center;
    color: rgba(0,0,0,.65);
    overflow-y: auto;
  }
  
  .el-main {
    background-color: #fff;
    color: #333;
    text-align: center;
    height: calc(100vh - 104px);
    overflow: auto;
  }
  
  body > .el-container {
    
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .header_title a {
    color: #1890FD;
  }
</style>
