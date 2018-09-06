<template functional>
  <div class="message-box">
    <p>{{props.message.message.headers.from}}</p>
    <p>{{props.message.message.headers.subject}}</p>
    <p>{{props.timeCalculated}}</p>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      required: true
    },
    timeCalculated: {
      required: true
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .message-box {
    border: 1px solid lightgrey;
  }

  .message-box:hover {
    box-shadow: 0px 10px 18px lightgrey;
    overflow: hidden;
  }
</style>
