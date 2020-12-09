<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import BlogHeader from '@/components/Header';
export default {
  components:{
    BlogHeader
  }
}
</script>

<style lang="less">

#app {
  width: 100%;
  height: 100%;
  html {
    width: 100%;
    height: 100%;
  }
  body {
    background-color: #f2f2f2;
  }
}
</style>
