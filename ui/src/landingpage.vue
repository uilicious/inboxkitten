<template>
	<div class="landing-page">
		<!-- <carbon-ads placement="InboxKittenLanding"></carbon-ads> -->
		<!-- <div><a href="/kittenrouter" class="product-hunt">Introducing Kitten Router 🐱 </a></div> -->
		<div class="landing-navigation">
			<router-link to="/kittenrouter">
				<img class="landing-nav-main-logo" src="@/assets/kitten_router.png" />
			</router-link>
		</div>
		<div class="header-gradient-background">
			<div class="header">
				<img class="logo" src="@/assets/inbox_kitten.png" />
				<h1>
					Open-Source
					<a></a> Disposable Email
				</h1>
				<h2>(Served by Serverless Kittens)</h2>
			</div>
			<div class="email-selection">
				<form v-on:submit.prevent="goToInbox">
					<div class="input-box">
						<input
							class="input-email"
							name="email"
							aria-label="email"
							type="text"
							v-model="randomName"
							id="email-input"
						/>
						<div class="input-suffix" id="div-domain" data-clipboard-target="#email-input">@{{domain}}</div>
					</div>
					<div class="submit-box">
						<input type="submit" class="submit" value="Get Mail Nyow!" />
					</div>
				</form>
			</div>
		</div>
		<div class="info-guide mx-a my-0 p-2" style="max-width: 1240px; ">
			<div class="pure-g mx-a" style="max-width: 1000px; background: #fbc02d4f;">
				<div class="pure-u-1-1">
						<section class="p-1">
						<h3>
							<i class="fas fa-exclamation-triangle"></i> PSA: Please use inboxkitten, for only testing, or non critical emails.
						</h3>
						<p><a href="https://uilicious.com/blog/psa-inboxkitten-will-be-blocking-no-reply-google/" target="_blank">We block "no-reply@google" to prevent abuse on our platform, see more details on our blog post (here)</a></p>
					</section>
				</div>
			</div>
			<div class="pure-g mx-a my-1" style="max-width: 1000px;">
				<div class="pure-u-1-2">
					<section class="p-1">
						<h3>
							<i class="fas fa-mail-bulk"></i> Use any inbox to avoid spam
						</h3>
						<p>Use inboxkitten when you don't want to get spammed by revealing your real email address.</p>
					</section>
				</div>
				<div class="pure-u-1-2">
					<section class="p-1">
						<h3>
							<i class="fas fa-trash-alt"></i> Email Auto-Deletes
						</h3>
						<p>Inboxkitten.com emails are in the public domain, and auto deletes after several hours. (officially 3 days according to mailgun)</p>
					</section>
				</div>
			</div>

			<section class="my-1 p-1" style="background-color: #eee;">
				<div class="mb-1">
					<h3>
						<i class="fas fa-clipboard-check"></i> Ideal for UI / QA Testing
					</h3>
					<p>
						Test your web application user signup flows, and email notification.
						<br />
						<a
							href="https://test.uilicious.com/test/public/7t74nVS828weKMtzGgJppF"
							target="_blank"
						>Or even better, automate testing with uilicious!</a>
					</p>
				</div>
				<div class="flex-row">
					<div class="code mb-0" style="flex: 1 0 auto;">
						<pre style="margin: 0; line-height: 125%"><span style="color: #66d9ef">let</span> <span style="color: #a6e22e">email</span> <span style="color: #f92672">=</span> <span style="color: #e6db74">"death-flew-61"</span>

<span style="color: #d5cccc">// Go to inbox</span>
<span style="color: #a6e22e">I</span><span style="color: #f8f8f2">.</span><span style="color: #a6e22e">goTo</span><span style="color: #f8f8f2">(</span><span style="color: #e6db74">"https://inboxkitten.com/inbox/"</span> <span style="color: #f92672">+</span> <span style="color: #a6e22e">email</span> <span style="color: #f92672">+</span> <span style="color: #e6db74">"/list"</span><span style="color: #f8f8f2">)</span>

<span style="color: #d5cccc">// Wait for some time for the email to arrive</span>
<span style="color: #a6e22e">I</span><span style="color: #f8f8f2">.</span><span style="color: #a6e22e">see</span><span style="color: #f8f8f2">(</span><span style="color: #e6db74">"@inboxkitten"</span><span style="color: #f8f8f2">)</span>
<span style="color: #a6e22e">I</span><span style="color: #f8f8f2">.</span><span style="color: #a6e22e">wait</span><span style="color: #f8f8f2">(</span><span style="color: #ae81ff">15</span><span style="color: #f8f8f2">)</span>

<span style="color: #d5cccc">// Open the mail</span>
<span style="color: #a6e22e">I</span><span style="color: #f8f8f2">.</span><span style="color: #a6e22e">see</span><span style="color: #f8f8f2">(</span><span style="color: #e6db74">"Reset your password"</span><span style="color: #f8f8f2">)</span>
<span style="color: #a6e22e">I</span><span style="color: #f8f8f2">.</span><span style="color: #a6e22e">click</span><span style="color: #f8f8f2">(</span><span style="color: #e6db74">"Reset your password"</span><span style="color: #f8f8f2">)</span>

<span style="color: #d5cccc">// click on the "reset password" button </span>
<span style="color: #a6e22e">UI</span><span style="color: #f8f8f2">.</span><span style="color: #a6e22e">context</span><span style="color: #f8f8f2">(</span><span style="color: #e6db74">"#message-content"</span><span style="color: #f8f8f2">,</span> <span style="color: #f8f8f2">()</span><span style="color: #f92672">=&gt;</span><span style="color: #f8f8f2">{</span>
    <span style="color: #a6e22e">I</span><span style="color: #f8f8f2">.</span><span style="color: #a6e22e">see</span><span style="color: #f8f8f2">(</span><span style="color: #e6db74">"Here's your magic link"</span><span style="color: #f8f8f2">)</span>
    <span style="color: #a6e22e">I</span><span style="color: #f8f8f2">.</span><span style="color: #a6e22e">click</span><span style="color: #f8f8f2">(</span><span style="color: #e6db74">"Reset password"</span><span style="color: #f8f8f2">)</span>
<span style="color: #f8f8f2">})</span>

<span style="color: #d5cccc">// Check that I'm at the "Reset password" page</span>
<span style="color: #a6e22e">I</span><span style="color: #f8f8f2">.</span><span style="color: #a6e22e">amAt</span><span style="color: #f8f8f2">(</span><span
	style="color: #e6db74"
>"https://user.uilicious.com/resetPassword"</span><span
	style="color: #f8f8f2"
>)</span>
</pre>
					</div>

					<iframe
						src="https://snippet.uilicious.com/embed/test/public/FPNPw6BRyc4agxP5SV1nry?step=2&autoplay=1"
						frameborder="0"
						width="600px"
						height="400px;"
						class="ml-1"
						style="flex: 1 0 auto; border-radius: 5px; overflow: hidden;"
					></iframe>

				</div>
			</section>

			<div class="deploy-segmet my-1 p-2">
				<h3>
					<i class="fas fa-user-secret"></i> Need a private / secure / selfhosted version?
				</h3>
				<p>Clone and adopt your own inboxkitten using our self-hosting package</p>

				<a href="https://github.com/uilicious/inboxkitten" class="self-host-tier-link">
					<div class="self-host-tier">
						<div class="tier-title">
							<h3>Self-Host</h3>
						</div>
						<div class="price">
							<h3>$0</h3>(*per month)
						</div>
					</div>
				</a>

				<p>All you need to do is the following steps</p>
				<div class="code mx-a mb-1" style="max-width: 600px"><pre>git clone "https://github.com/uilicious/inboxkitten.git"
cd inboxkitten
./config.sh
./build.sh
firebase login
./deploy/firebase/deploy.sh
</pre></div>
				<p class="disclaimer">
					*You will need to have signed up to firebase and mailgun, where you can deploy on their "free" tier.
					<br />We take zero responsiblity over your email, laptop, or life (or lack of)
					<br />
					<br />Optionally you should have some basic programming knowledge
					<br />For more details (or other deplyment options) see our
					<a
						href="https://github.com/uilicious/inboxkitten"
					>github repository</a>
				</p>
			</div>
			<div class="line-break"></div>
		</div>
		<div class="love-notes">
			<p>
				made with
				<span style="color: #e25555;">&hearts;</span> by
				<a href="https://uilicious.com">uilicious</a> in
				<a href="https://www.google.com.sg/search?q=singapore">Singapore</a>
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
import { generate, count } from "random-words";

// import CarbonAds from './components/CarbonAds.vue'

export default {
	name: 'LandingPage',
	components: {
		// CarbonAds: CarbonAds
	},
	data () {
		return {
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
			this.$clipboard.forEach(cb => {
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
			
			return (
				generate({
					exactly: 1,
					wordsPerString: 2,
					separator: '-'
				}) +
				'-' +
				Math.floor(Math.random() * 90 + 10)
			)
		},
		goToInbox () {
			this.$router.push({
				name: 'Inbox',
				params: {
					email: this.randomName
				}
			})
		},
		goToKittenRouter () {
			location.href = '/kittenrouter'
		}
	}
}
</script>

<style lang="scss" rel="stylesheet/scss">
	@import url("https://use.fontawesome.com/releases/v5.3.1/css/all.css");
	@import "scss/landingpage.scss";
	@import "primer-tooltips/index.scss";

	.landing-navigation {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		float: right;
		width: 100vw;
		height: 1rem;
		text-align: left;

		.landing-nav-main-logo {
			width: 8rem;
			padding-top: 7rem;
			padding-right: 4rem;
			z-index: 2;
		}

		.landing-nav-header {
			padding-top: 6rem;
			padding-right: 3rem;
			cursor: pointer;
		}
	}

	@media only screen and (max-width: 470px) {
		.landing-navigation .landing-nav-main-logo {
			padding-right: 4rem;
			width: 5rem;
			z-index: 3;
		}
		.landing-nav-header {
			display: none;
		}
	}
	@media only screen and (max-width: 800px) {
		.landing-navigation {
			padding-top: 140px;
		}
	}
</style>
