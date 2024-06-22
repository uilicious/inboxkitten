<template>
  <div class="wrapper">
    <nav-bar class="nav-bar"></nav-bar>
    <router-view class="inbox"></router-view>
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
  .wrapper {
    display: flex;
    flex-direction: column;
    width:100%;
    height:100%;
  }
  .nav-bar{
  }
  .inbox{
    flex: 1;
    z-index:9;
  }

</style>
