<template>
  <div class="app">
    <div class="nav">
      <div class="left">hello</div>
      <div class="right">
        <input/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Inbox'
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .app{
    position:absolute;
    display:flex;
    flex-direction: column;
    height:100%;
    width:100%;
  }
  .nav{
    display: flex;
    flex-direction: row;
    align-content: stretch;
    width: 100%;
  }

  .left{
    flex-grow: 1;
  }
  .right{
    flex-grow: 3;
  }
</style>
