<template>
 <el-container>
  <el-header>
    <el-row>
      <el-col :span="12">
        <div class="">
          <el-col :span="10"  ><div class="">博客</div></el-col>
          <el-col :span="12" ><div class="">
            <el-input class="search_input" v-model="input" placeholder="请输入内容"></el-input></div>
            </el-col>
        </div>
        </el-col>
      <el-col :span="12">
        <div class="">
          <el-col :span="6"><div class="header_title"><router-link to="/">首页</router-link></div></el-col>
          <el-col :span="4"><div class="header_title"><router-link to="/archives">归档</router-link></div></el-col>
          <el-col :span="4"><div class="header_title"><router-link to="/categories">分类</router-link></div></el-col>
          <el-col :span="4"><div class="header_title"><router-link to="/about">关于</router-link></div></el-col>
          <el-col :span="2"><div class="header_title"><router-link to="/">登录</router-link></div></el-col>
          <el-col :span="2"><div class="header_title"><router-link to="/">注册</router-link></div></el-col> 
          </div>
        </el-col>
    </el-row>
  </el-header>
  <el-container>
    <el-aside width="260px">Aside</el-aside>
    <el-container>
      <el-main>
        <blog-list></blog-list>
         <router-view></router-view>
      </el-main>
      <!-- <el-footer>Footer</el-footer> -->
    </el-container>
  </el-container>
</el-container>
</template>

<script>
import BlogList from '@/components/bloglist'
export default {
  name: 'Home',
  components: {
    BlogList
  },
  data () {
    return {
      input: ''
    }
  }
}
</script>

<style lang="less">
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
  .header_title  {
    a {
      display: block;
      
    }
    a:hover {
      color: #1890FD;
      border-top: 1px solid #1890FD;
    }
    
  }
  .search_input {
    .el-input__inner {
      border: none;
    }
    
  }
</style>


