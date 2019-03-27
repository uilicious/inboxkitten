<template>
	<div class="landing-page">
		<div class="header-gradient-background">
			<div class="header">
				<img class="logo" src="@/assets/inbox_kitten.png"/>
				<h1>Open-Source <a></a> Disposable Email</h1>
				<h2>(Served by Serverless Kittens)</h2>
			</div>
			<div class="email-selection">
				<form v-on:submit.prevent="goToInbox">
					<div class="input-box">
						<input class="input-email" name="email" aria-label="email" type="text" v-model="randomName" id="email-input"/>
						<div class="input-suffix" id="div-domain" data-clipboard-target="#email-input">@{{domain}}</div>
					</div>
					<div class="submit-box"><input type="submit" class="submit" value="Get Mail Nyow!"/></div>
				</form>
			</div>
		</div>
		<div class="info-guide">
			<div class="features" style="max-width:1100px">
				<div class="feature-card">
					<h3><i class="fas fa-mail-bulk"></i> Use any inbox to avoid spam</h3>
					<p>
						Use inboxkitten when you don't want to get spammed by revealing your real email address.
					</p>
				</div>
				<div class="feature-card">
					<h3><i class="fas fa-trash-alt"></i> Email Auto-Deletes</h3>
					<p>inboxkitten.com emails are in the public domain, and auto deletes after several hours. (officially 3 days according to mailgun)</p>
				</div>
			</div>
			<div class="snippet">
				<a href="https://snippet.uilicious.com/test/public/DKf5ZaxMWa15v47LEboF9F" class="article-body-image-wrapper" target="_blank" style="text-decoration:none; color: inherit; cursor:pointer;">
				<div class="features">
					<div class="feature-card">
						<h3><i class="fas fa-clipboard-check"></i> Ideal for UI / QA Testing</h3>
						<p>
							Test your web application user signup flows, and email notification.<br/>
							<a href="https://test.uilicious.com/test/public/7t74nVS828weKMtzGgJppF" target="_blank">Or even better, automate testing with uilicious!</a><br/>
						</p>
<pre class="hljs"><span class="hljs-comment" style="color: rgb(117, 113, 94);">// Lets goto inbox kitten</span>
<span class="hljs-selector-tag" style="color: rgb(249, 38, 114);">I</span><span class="hljs-selector-class" style="color: rgb(166, 226, 46);">.goTo</span>(<span class="hljs-string" style="color: rgb(230, 219, 116);">"https://inboxkitten.com"</span>)
<span class="hljs-selector-tag" style="color: rgb(249, 38, 114);">I</span><span class="hljs-selector-class" style="color: rgb(166, 226, 46);">.see</span>(<span class="hljs-string" style="color: rgb(230, 219, 116);">"Open-Source Disposable Email"</span>)

<span class="hljs-comment" style="color: rgb(117, 113, 94);">// Lets fill up the email form, and click on a button</span>
<span class="hljs-selector-tag" style="color: rgb(249, 38, 114);">I</span><span class="hljs-selector-class" style="color: rgb(166, 226, 46);">.fill</span>(<span class="hljs-string" style="color: rgb(230, 219, 116);">"email"</span>, <span class="hljs-string" style="color: rgb(230, 219, 116);">"ik-reciever-f7s1g28"</span>)
<span class="hljs-selector-tag" style="color: rgb(249, 38, 114);">I</span><span class="hljs-selector-class" style="color: rgb(166, 226, 46);">.click</span>(<span class="hljs-string" style="color: rgb(230, 219, 116);">"Get Mail Nyow!"</span>)

<span class="hljs-comment" style="color: rgb(117, 113, 94);">// See an email we expect, nyow</span>
<span class="hljs-selector-tag" style="color: rgb(249, 38, 114);">I</span><span class="hljs-selector-class" style="color: rgb(166, 226, 46);">.see</span>(<span class="hljs-string" style="color: rgb(230, 219, 116);">"Testing inboxkitten subject"</span>)
</pre>
					</div>
					<div class="feature-gif">
						<img src="@/assets/snippet.gif" alt="uilicious test" >
					</div>
				</div>
				</a>
			</div>
			<div class="deploy-segmet">
				<h3><i class="fas fa-user-secret"></i> Need a private / secure / selfhosted version?</h3>
				<p>Clone and adopt your own inboxkitten using our self-hosting package</p>

				<a href="https://github.com/uilicious/inboxkitten" class="self-host-tier-link">
					<div class="self-host-tier">
						<div class="tier-title">
							<h3>Self-Host</h3>
						</div>
						<div class="price">
							<h3>$0</h3>
							(*per month)
						</div>
					</div>
				</a>

				<p>All you need to do is the following steps</p>
				<p class="code deploy-code">
					git clone "https://github.com/uilicious/inboxkitten.git"<br/>
					cd inboxkitten<br/>
					./config.sh<br/>
					./build.sh<br/>
					firebase login<br/>
					./deploy/firebase/deploy.sh
				</p>
				<br/>
				<p class="disclaimer">
					*You will need to have signed up to firebase and mailgun, where you can deploy on their "free" tier. <br/>
					We take zero responsiblity over your email, laptop, or life (or lack of)<br/><br/>
					Optionally you should have some basic programming knowledge<br/>
					For more details (or other deplyment options) see our <a href="https://github.com/uilicious/inboxkitten">github repository</a>
				</p>
			</div>
			<div class="line-break"></div>
		</div>
		<div class="love-notes">
			<p>
				made with <span style="color: #e25555;">&hearts;</span> by <a href="https://uilicious.com">uilicious</a> in <a href="https://www.google.com.sg/search?q=singapore">Singapore</a>
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
	import 'normalize.css'
	import ClipboardJS from 'clipboard'

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

			this.$clipboard = []

			let self = this

			this.$clipboard[0] = new ClipboardJS('#div-domain', {
				text: function (trigger) {
					if (self.randomName.includes('@' + config.domain)) {
						return self.randomName
					}
					return self.randomName + '@' + config.domain
				}
			})

			this.$clipboard[0].on('success', function (e) {
				$('#email-input').select()
				$('#div-domain').addClass('tooltipped tooltipped-s')
				$('#div-domain').attr('aria-label', 'Copied!')
				$('#div-domain').on('mouseleave', function () {
					$('#div-domain').removeClass('tooltipped tooltipped-s')
					$('#div-domain').removeAttr('aria-label')
				})
			})
		},
		beforeDestroy () {
			if (this.$clipboard !== null) {
				this.$clipboard.forEach((cb) => {
					cb.destroy()
			})
			}
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
				}) + '-' + Math.floor(Math.random() * 90 + 10)
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
	@import url("https://use.fontawesome.com/releases/v5.3.1/css/all.css");
	@import "scss/landingpage.scss";
	@import "primer-tooltips/index.scss";
</style>
