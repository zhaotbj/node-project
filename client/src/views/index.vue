<template>
  <div class="container">
    <el-container>
      <BlogHeader />

      <el-header class="min_header">
        <div class="header-left">
          <div>
            <span>大大大博客</span>
            <span class="icon_home" @click="navShow = !navShow"
              ><i class="el-icon-s-fold"></i
            ></span>
          </div>
        </div>
        <div class="nav_list" v-if="navShow">
          <ul>
            <li
              class="item"
              v-for="(item, index) in navItem"
              :key="index"
              @click="handlePath(item.path)"
            >
              <i :class="item.icon"></i>{{ item.name }}
            </li>
          </ul>
        </div>
      </el-header>
      <el-container>
        <el-aside>
          <AsideBlog />
        </el-aside>
        <el-container>
          <el-main>
            <BlogList v-if="routerPath=='/list'" />
            <router-view />
          </el-main>
          <!-- <el-footer>Footer</el-footer> -->
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import AsideBlog from '@/components/AsideBlog';
import BlogHeader from '@/components/Header';
import BlogList from "./bloglist";
export default {
  components: {
    AsideBlog,
    BlogHeader,
    BlogList
  },
  data() {
    return {
      input: '',
      navShow: false,
      routerPath: "",
      navItem: [
        { name: "首页", icon: 'el-icon-s-home', path: "/" },
        { name: "归档", icon: 'el-icon-s-promotion', path: "/archives" },
        { name: "关于", icon: 'el-icon-user', path: "/about" },
        // {name:"写文章",icon:'el-icon-edit', path:"/write"},
      ]
    }
  },
  watch: {
    '$route.path': function(newVal, oldVal){
      this.routerPath = newVal;
    }
  },
  methods: {
    handlePath(path) {
      this.$router.push(path);
      this.navShow = false;

    }
  }

}
</script>

<style lang="less">
@import url("@/assets/css/media.less");
</style>
