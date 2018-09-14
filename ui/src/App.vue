<template>
  <div id="app">
    <div style="position:fixed; top:3vh; right:2vw; z-index:10;" v-if="isShare">
      <a href="https://twitter.com/intent/tweet?ref_src=twsrc%5Etfw" class="twitter-hashtag-button" data-size="large" :data-text="tweetMsg" :data-url="tweetDataUrl" data-show-count="false">Tweet</a>
      <a class="github-button" :href="githubLink" data-size="large" :aria-label="githubAriaLabel">Fork</a>
    </div>
    <router-view/>
  </div>
</template>

<script>
import shareConfig from '@/../config/shareConfig.js'
export default {
  name: 'App',
  data: () => {
    return {
      githubLink: shareConfig.githubForkLink,
      githubAriaLabel: shareConfig.githubAriaLabel,
      tweetDataUrl: shareConfig.tweetDataUrl,
      tweetMsg: shareConfig.tweetMessage,
      isShare: shareConfig.enabled
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  @import url("https://unpkg.com/purecss@1.0.0/build/pure-min.css");
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
