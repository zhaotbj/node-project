<template>
<div class="header_box">
  <el-row>
          <el-col :span="12">
            <div class="">
              <el-col :span="10"><div class=""><router-link to="/" style="color:#333">{{userInfo.userName|| '路飞'}}的博客</router-link></div></el-col>
              <el-col :span="12"><div class="">
                <el-input class="search_input" v-model="input" placeholder="请输入内容"></el-input></div>
                </el-col>
            </div>
            </el-col>
          <el-col :span="12">
            <div class="">
              <el-col :span="5"><div class="header_title"><router-link :class="{bg_color: comName==='list'}" to="/">首页</router-link></div></el-col>
              <el-col :span="4"><div class="header_title"><router-link :class="{bg_color: comName==='archives'}" to="/archives">归档</router-link></div></el-col>
              <el-col :span="4"><div class="header_title"><router-link :class="{bg_color: comName==='about'}" to="/about">关于</router-link></div></el-col>
              <el-col :span="2"><div class="header_title" v-if="iswrite"><router-link :class="{bg_color: comName==='write'}" to="/write"><span class="register">写文章</span></router-link></div></el-col> 
              <el-col :span="2"><div class="header_title"><router-link :class="{bg_color: comName==='login'}" to="/login"><span class="login">登录</span></router-link></div></el-col>
              <el-col :span="2"><div class="header_title"><router-link :class="{bg_color: comName==='register'}" to="/register"><span class="register">注册</span></router-link></div></el-col> 
              <el-col :span="2"><div class="header_title"> <el-avatar class="avatar" size="medium"  :src="userInfo.avatar">{{userInfo.userName}}</el-avatar>
              </div></el-col> 
              </div>
            </el-col>
        </el-row>
  </div>
</template>

<script>
import { mapGetters} from 'vuex';
export default {
  // name: 'BlogHeader',
  data () {
    return {
      input: '',
      iswrite: false
    }
  },
  computed: {
  ...mapGetters({
    userInfo: "userInfo"
  }),
    comName() {
      return this.$route.name
    }
  },
  mounted(){
    let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      if(userInfo &&userInfo.userId){
       this.iswrite = true;
      }
  }
 
}
</script>

<style lang="less" scoped>
.header_box {
  width: 1300px;
  margin: 0 auto;
}
/deep/.el-aside {
  background-color: #fff;
  text-align: center;
  
  border-right: 1px solid #ebedf0;
  height: calc(100vh - 104px);
  text-align: center;
  color: rgba(0,0,0,.65);
  overflow-y: auto;
}

.header_title  {
  font-size: 15px;
  .avatar {
    margin-top: 10px;
  }
  a {
    display: block;
    color: #0000008f;
    
  }
  a:hover {
    color: #1890FD;
    border-top: 1px solid #1890FD;
  }
  .bg_color {
    color: #1890FD;
    border-top: 1px solid #1890FD;
  }
  .login {
      color: #f5222d;
      border: 1px solid #f5222d;
      font-size: 13px;
      padding: 2px;
      border-radius: 5px;
  }
  .register {
    color: #1890FD;
    border: 1px solid #1890FD;
    font-size: 13px;
    padding: 2px;
    border-radius: 5px;
  }
  
}
.search_input {
  .el-input__inner {
    border: none;
  }
}

.min_header {
  .header-left {
    font-size: 20px;
    .icon_home {
      position: fixed;
      right: 30px;
    }
  }
  .nav_list {
    position: relative;
    width: 100%;
    background:#fff;
    text-align: left;
    padding-left: 2rem;
    z-index: 100000;
    .item {
      height: 3rem;
      line-height: 3rem;
      color: rgba(0,0,0,.65);
      font-weight: 400;
      i{
        margin-right: 1rem;
      }
    }
  }
}
</style>

