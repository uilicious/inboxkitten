<template>
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
	@import "scss/landingpage.scss";
</style>
