<template>
  <div class="container">

    <el-container>
      <el-header class="max_header">
        <el-row>
          <el-col :span="12">
            <div class="">
              <el-col :span="10"  ><div class=""><nuxt-link to="/">博客</nuxt-link></div></el-col>
              <el-col :span="12" ><div class="">
                <el-input class="search_input" v-model="input" placeholder="请输入内容"></el-input></div>
                </el-col>
            </div>
            </el-col>
          <el-col :span="12">
            <div class="">
              <el-col :span="5"><div class="header_title"><nuxt-link :class="{bg_color: comName==='Home'}" to="/">首页</nuxt-link></div></el-col>
              <el-col :span="4"><div class="header_title"><nuxt-link :class="{bg_color: comName==='Archives'}" to="/archives">归档</nuxt-link></div></el-col>
              <!-- <el-col :span="4"><div class="header_title"><nuxt-link :class="{bg_color: comName==='Categories'}" to="/categories">分类</nuxt-link></div></el-col> -->
              <el-col :span="4"><div class="header_title"><nuxt-link :class="{bg_color: comName==='About'}" to="/about">关于</nuxt-link></div></el-col>
              <!-- <el-col :span="2"><div class="header_title"><nuxt-link :class="{bg_color: comName==='write'}" to="/write"><span class="register">写文章</span></nuxt-link></div></el-col>  -->
              <el-col :span="2"><div class="header_title"><nuxt-link :class="{bg_color: comName==='Login'}" to="login"><span class="login">登录</span></nuxt-link></div></el-col>
              <el-col :span="2"><div class="header_title"><nuxt-link to="/"><span class="register">注册</span></nuxt-link></div></el-col> 
              </div>
            </el-col>
        </el-row>
      </el-header>

      <el-header class="min_header">
        <div class="header-left">
          <div>
            <span>大大大博客</span>
            <span class="icon_home" @click="navShow=!navShow"><i class="el-icon-s-fold"></i></span>
          </div>
        </div>
        <div class="nav_list" v-if="navShow">
          <ul>
            <li class="item" v-for="(item, index) in navItem" :key="index" @click="handlePath(item.path)">
              <i :class="item.icon"></i>{{item.name}}
              </li>        
          </ul>
        </div>
      </el-header>
      <el-container>
        <el-aside ><aside-blog></aside-blog> </el-aside>
        <el-container>
          <el-main>
            <nuxt-child></nuxt-child>
          </el-main>
          <!-- <el-footer>Footer</el-footer> -->
        </el-container>
      </el-container>
    </el-container>

     
  </div>
</template>

<script>
import AsideBlog  from '~/components/AsideBlog'
export default {
  name: 'Home',
  components:{
    AsideBlog
  },
  data () {
    return {
      input: '',
      navShow:false,
      navItem:[
        {name:"首页",icon:'el-icon-s-home', path:"/"},
        {name:"归档",icon:'el-icon-s-promotion', path:"/archives"},
        {name:"关于",icon:'el-icon-user', path:"/about"},
        // {name:"写文章",icon:'el-icon-edit', path:"/write"},
      ]
    }
  },
  computed: {
    comName() {
      return this.$route.name
    }
  },
  watch: {},
  methods: {
    handlePath(path){
      this.$router.push(path);
      this.navShow=false;

    }
  }
 
}
</script>

<style lang="scss">

@import "../assets/reset.css";
@import "../assets/header.scss";

@import "../assets/common.scss";
@import "../assets/media.scss";
</style>
