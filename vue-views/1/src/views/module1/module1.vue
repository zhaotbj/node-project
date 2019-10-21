<template>
  <h1>modele1----state---- {{storeDate}}</h1>
  
</template>
<script>
export default {
  computed: {
    storeDate() {
        return this.$store.state.store1.msg
    }
  }
};
</script>
