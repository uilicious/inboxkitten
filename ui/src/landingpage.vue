<template>
  <div>
    <div class="main-section">
      <div class="ear"></div>
      <div class="head">
        <div class="face">
          <div class="mouth"></div>
          <div class="eye-group">
            <div class="eye eye-left"></div>
            <div class="eye eye-right"></div>
          </div>
        </div>
      </div>
      <form class="pure-form bottom-element">
        <input type="text" :value="randomName" id="email-input"/> @inboxkitten.com <br>
        <button type="submit" class="pure-button pure-button-primary">Check inbox</button>
      </form>
    </div>
    <!-- Detail setup guide-->
    <div>
      <div class="intermission-header">
        <p>Host your own InboxKitten!</p>
      </div>
      <section>
        <h2>Deploy on ExpressJS</h2>
      </section>

      <section><h2>Deploy using Google Lambda functions</h2></section>

    </div>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      randomName: ''
    }
  },
  mounted () {
    this.randomName = this.generateRandomName()
  },
  methods: {
    generateRandomName () {
      var randomWords = require('random-words')
      return randomWords({exactly: 1, wordsPerString: 2, separator: '', formatter: (word) => word.slice(0, 1).toUpperCase().concat(word.slice(1))})
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">

  @import url("scss/_face.scss");
  
  #email-input{
    border: none;
    border-color: transparent;
    text-align: right;
  }

  .intermission-header{
    height: 1vw
  }

  button{
    margin-top:1rem;
  }

  .main-section{
    height: 30vw;
    position:relative;
  }

  .bottom-element{
    position: relative;
    top: 30%;
  }
</style>
