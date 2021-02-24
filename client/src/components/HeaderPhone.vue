<template>
  <div class="blog_header_phone">
    <ul>
      <li @click="goHome">
        <span class="el-icon-s-promotion"></span>
      </li>
      <li>首页</li>
      <li>
        <el-input size="mini" v-model="input" @keyup.enter.native="search" placeholder="搜搜"></el-input>
      </li>
      <el-avatar class="avatar" size="medium"  :src="userInfo.avatar" v-if="userInfo.avatar"></el-avatar>
      <router-link class="link_login" to="/login"
      v-else
        ><span>登录</span></router-link
      >
    </ul>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
  ...mapGetters({
    userInfo: "userInfo"
  }),
    comName() {
      return this.$route.name
    }
  },
  data() {
    return {
      input: "",
    };
  },
  methods: {
    search(){
      console.log('---', this.input);
      this.$Bus.$emit('searchEmit',this.input)
    },
    goHome() {
        if(this.$route.path == "/list"|| this.$route.path == "/"){
            return
        }
      this.$router.push("/");
    },
  },
};
</script>

<style lang="less" scoped>
.blog_header_phone {
  ul {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 10px;
    .el-icon-s-promotion {
      color: #1890fd;
      font-size: 22px;
    }
    /deep/.el-input__inner {
      border: 1px solid hsla(0, 0%, 59.2%, 0.2);
      background-color: rgba(227, 231, 236, 0.2);
    }

    .link_login {
      color: #fff;
      border-radius: 20px;
      padding: 3px 15px;
      font-size: 16px;
      line-height: 1.5;
      background: #ec7259;
      border-color: #ec7259;
    }
  }
}
</style>