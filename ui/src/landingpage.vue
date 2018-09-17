<template>
<<<<<<< HEAD
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
=======
	<div class="landing-page">
		<div class="header">
			<img class="logo" src="@/assets/logo.png"/>
			<h1>Open-Source <a></a> Disposable Email</h1>
			<h2>(Served by Kittens)</h2>
		</div>
		<div class="email-selection">
			<form v-on:submit.prevent="goToInbox">
				<div class="input-box">
					<input class="input-email" name="email" aria-label="email" type="text" v-model="randomName" id="email-input"/> 
					<div class="input-suffix" @click="emailInputFocus">@{{domain}}</div>
				</div>
				<div class="submit-box"><input type="submit" class="submit" value="Get Mail Nyow!"/></div>
			</form>
		</div>
		<div class="love-notes">
			<p>
				made with <span style="color: #e25555;">&hearts;</span> by <a href="https://uilicious.com">uilicious</a>
			</p>
		</div>
		<div class="line-break"></div>
		<div class="deployment-guide">
			<p>
				@TODO : deployment guide
			</p>
		</div>
		<!--

		<div class="intermission-header">
			<p>Host your own InboxKitten!</p>
			<i class="fa fa-chevron-down" @click="scrollDown"></i>
		</div>
		 Set up guide
		<section id="express-js">
			<h2>Coming Soon!</h2>
		</section>
		-->
	</div>
>>>>>>> e3cf9dba92a3341c6f64aed834192ec1459801b0
</template>
<script>
	import $ from 'jquery'
	import config from '@/../config/apiconfig.js'
	import 'normalize.css';

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
					separator: '-'
				}) + "-"+Math.floor(Math.random() * 90 + 10)
			},
			goToInbox () {
				this.$router.push({
					name: 'Inbox',
					params: {
						email: this.randomName
					}
				})
			},
			emailInputFocus() {
				$('#email-input').select()
			}
		}
	}
</script>

<style lang="scss" rel="stylesheet/scss">
<<<<<<< HEAD

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
=======
	@import "scss/landingpage.scss";
>>>>>>> e3cf9dba92a3341c6f64aed834192ec1459801b0
</style>
