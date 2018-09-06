<template functional>
  <div class="message-box">
    <p>{{props.message.sender}}</p>
    <p>{{props.message.subject}}</p>
  </div>
</template>

<script>
export default {
  props: {
    message: {
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
