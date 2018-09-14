<template>
  <div>
    <div class="main-section">

      <div class="head">
        <div class="ear ear-left"></div>
        <div class="ear ear-edge-left"></div>
        <div class="ear ear-right"></div>
        <div class="ear ear-edge-right"></div>
        <div class="face">
          <div class="mouth"></div>
          <div class="eye-group">
            <div class="eye eye-left"></div>
            <div class="eye eye-right"></div>
          </div>
        </div>
      </div>
      <form class="pure-form bottom-element">
        <input type="text" v-model="randomName" id="email-input"/> @{{domain}} <br>
        <button class="pure-button pure-button-primary inbox-button" @click="goToInbox">Check inbox</button>
      </form>
      <div class="intermission-header">
        <p>Host your own InboxKitten!</p>
        <i class="fa fa-chevron-down" @click="scrollDown"></i>
      </div>
    </div>
    <!-- Detail setup guide-->
    <section id="express-js">
      <h2>Deploy on ExpressJS</h2>
    </section>

    <section id="google-js">
      <h2>Deploy using Google Lambda functions</h2>
    </section>

  </div>
</template>
<script>
import $ from 'jquery'
import config from '@/../config/apiconfig.js'

export default {
  name: 'LandingPage',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      randomName: ''
    }
  },
  mounted () {
    this.randomName = this.generateRandomName().toString()
  },
  computed: {
    domain () {
      return config.domain
    }
  },
  methods: {
    generateRandomName () {
      var randomWords = require('random-words')
      return randomWords({
        exactly: 1,
        wordsPerString: 2,
        separator: ''
      }) + Math.floor(Math.random() * 90 + 10)
    },
    scrollDown () {
      $('html, body').animate({
        scrollTop: $('#express-js').offset().top
      }, 1000)
    },
    goToInbox () {
      this.$router.push({
        name: 'Inbox',
        params: {
          email: this.randomName
        }
      })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">

  @import url("scss/_face.scss");
  @import url("https://use.fontawesome.com/releases/v5.3.1/css/all.css");

  #email-input {
    border: none;
    border-color: transparent;
    text-align: right;
  }

  .intermission-header {
    height: 2vh;
    position: relative;
    top: 40%;
  }

  .inbox-button {
    margin-top: 2rem;
  }

  .main-section {
    height: 100vh;
    position: relative;
  }

  .bottom-element {
    position: relative;
    top: 30%;
  }

  #express-js {
    height: 50vh;
    background-color: lightgray;
    padding-top:5rem;
    display:flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 5rem;
  }

  #google-js {
    height: 50vh;
    padding-top:5rem;
  }
</style>
