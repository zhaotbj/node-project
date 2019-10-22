<template>
<div class="container">
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
          <el-col :span="5"><div class="header_title"><nuxt-link :class="{bg_color: comName==='Home'}" to="/">首页</nuxt-link></div></el-col>
          <el-col :span="4"><div class="header_title"><router-link :class="{bg_color: comName==='Archives'}" to="/archives">归档</router-link></div></el-col>
          <el-col :span="4"><div class="header_title"><router-link :class="{bg_color: comName==='Categories'}" to="/categories">分类</router-link></div></el-col>
          <el-col :span="4"><div class="header_title"><router-link :class="{bg_color: comName==='About'}" to="/about">关于</router-link></div></el-col>
          <el-col :span="2"><div class="header_title"><router-link :class="{bg_color: comName==='upload'}" to="/upload"><span class="register">写文章</span></router-link></div></el-col> 
          <el-col :span="2"><div class="header_title"><router-link :class="{bg_color: comName==='Login'}" to="login"><span class="login">登录</span></router-link></div></el-col>
          <el-col :span="2"><div class="header_title"><router-link to="/"><span class="register">注册</span></router-link></div></el-col> 
          </div>
        </el-col>
    </el-row>
  </el-header>
  </div>
</template>

<script>

export default {
  name: 'header',

  data () {
    return {
      input: ''
    }
  },
  computed: {
    comName() {
      return this.$route.name
    }
  },
  watch: {},
  methods: {}
 
}
</script>

<style lang="scss" scoped>
@import "../assets/header.scss";
</style>

