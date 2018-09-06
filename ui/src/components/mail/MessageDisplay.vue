<template>
  <div class="message-display">
    <div class="message-header">
      Subject: <span fontSize={15}>
                        {{emailContent.subject}}
                    </span>
      From: <span fontSize={15}>
                        {{emailContent.from}}
                    </span>
      To: <span fontSize={15}>
                        {{emailContent.recipients}}
                    </span>
      Date:
      <span fontSize={15}>
                        {{emailContent.Date}}
                    </span><br/>
    </div>

    <iframe id="message-content"></iframe>
  </div>

</template>

<script>
export default {
  name: 'message-display',
  props: ['emailContent'],
  mounted () {
    this.$eventHub.$on('iframe_content', this.formatHtml)
  },
  beforeDestroy () {
    this.$eventHub.$off('iframe_content', this.formatHtml)
  },
  methods: {
    formatHtml (content) {
      console.log('something')
      let iframe = document.getElementById('message-content')
      let html = content
      iframe.src = 'data:text/html;charset=utf-8,' + encodeURI(html)
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  #message-content {
    height: 80%;
    width: 100%;
    overflow: hidden;
    border: 0;
  }
  .message-header {
    height:20%
  }
  .message-display {
    height: 100%;
    width: 100%;
    overflow: hidden;

  }
</style>
