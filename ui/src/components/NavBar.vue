<template>
	<nav class="nav">
    <div class="logo-box">
      <img class="logo" src="@/assets/logo_no_text.svg"/>
    </div>
    
  </nav>
</template>

<script>
  import config from '@/../config/apiconfig.js'
  export default {
	  name: 'NavBar',
    computed: {
      domain () {
        return config.domain
      }
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "@/scss/_color.scss";
  .nav {
    background-color: $color1-base;
    height:10rem;
    width: 100vw;
    text-align: left;

    .logo-box{
      width:10%;
      text-align: center;
      vertical-align: center;
      padding-top: 1rem;
      padding-bottom: 1rem;

      .logo {
        width:6rem;
      }
    }
  }

</style>
