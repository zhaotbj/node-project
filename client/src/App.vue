<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less">
@media screen and (min-width: 480px) and (max-width: 2000px) {
  html,body{
    font-size: 14px;
  }
}

@media screen and (min-width: 320px) and (max-width: 480px) {
  html,body{
    font-size: 14px;
  //   width: 100%;
  // height: 100%;
  }
}
// #app {
//   width: 100%;
//   height: 100%;
//   html {
//     width: 100%;
//     height: 100%;
//   }
//   body {
//     background-color: #f2f2f2;
//   }
// }
</style>
