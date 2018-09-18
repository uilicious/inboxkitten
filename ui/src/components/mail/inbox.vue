<template>
  <div>
    <nav-bar></nav-bar>
    <router-view></router-view>
  </div>
</template>

<script>
  import NavBar from '../NavBar.vue'

  export default {
    name: 'inbox',
    components: {
      NavBar: NavBar
    }
  }
</script>
<style>
</style>
