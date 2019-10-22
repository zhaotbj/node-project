<template>
    <div>
      <blog-list />
      
       <nuxt-child></nuxt-child>
    </div>
</template>
<script>

import BlogList from "../bloglist";
export default {
  components:{
    BlogList
  }
}
</script>