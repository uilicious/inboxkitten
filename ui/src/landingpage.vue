<template>
  <div>
    <div class="main-section">
      <!--<div class="head">-->
        <!--<div class="ear ear-left"></div>-->
        <!--<div class="ear ear-edge-left"></div>-->
        <!--<div class="ear ear-right"></div>-->
        <!--<div class="ear ear-edge-right"></div>-->
        <!--<div class="face">-->
          <!--<div class="mouth"></div>-->
          <!--<div class="eye-group">-->
            <!--<div class="eye eye-left"></div>-->
            <!--<div class="eye eye-right"></div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
      <img class="logo" src="@/assets/logo.png"/>
      <form class="pure-form display-form">
        <input type="text" v-model="randomName" id="email-input"/> <p>@{{domain}}</p>
      </form>
      <button class="pure-button pure-button-primary inbox-button" @click="goToInbox">Check inbox</button>
    </div>

    <div class="intermission-header">
      <p>Host your own InboxKitten!</p>
      <i class="fa fa-chevron-down" @click="scrollDown"></i>
    </div>
     Set up guide
    <section id="express-js">
      <h2>Coming Soon!</h2>
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
    margin-right: 0.5rem;
  }

  .intermission-header {
    height: 2vh;
    position: relative;
    top: 40%;
  }

  .logo {
    width:30vw;
    max-width: 500px;
  }

  @media only screen and (min-width:410px) {
    .display-form {
      display: flex;
      flex-direction: row;
    }
  }

  .display-form{
    margin-top: 3rem;
    margin-bottom: 1rem;
  }

  .main-section {
    height: 70vh;
    width: 100vw;
    /*position: absolute;*/
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin-top: 5rem;
  }

  .intermission-header {
    height: 30vh;
  }
</style>
