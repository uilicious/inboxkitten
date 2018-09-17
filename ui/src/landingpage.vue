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

	// Loading of font awesome
	// @import url("https://use.fontawesome.com/releases/v5.3.1/css/all.css");
	
	// Loading of color scheme
	@import "scss/_color.scss";
	
	// Min-width for body (for some sanity)
	body {
		min-width: 280px;
	}

	//
	// Landing page header and logo
	//
	.header {
		padding-top: 3rem;
		padding-bottom: 2rem;
		width: 100vw;
		background-color: $color1-base;

		.logo {
			width:40vw;
			max-width: 800px;
			margin-bottom:1rem;
		}

		h1 {
			color:$bright-text;
			padding-left:2rem;
			padding-right:2rem;
		}
		h2 {
			color:$dark-text;
			padding-left:2rem;
			padding-right:2rem;
		}

		h1,h2 {
			margin:0;
		}

		@media only screen and (max-width:760px) {
			.logo {
				width: 80vw;
			}

			// Line display hack to force a new block
			h1 a {
				display:block;
			}
		}
	}

	//
	// Email selection box
	//
	.email-selection {
		width: 100vw;
		background-color: $color2-base;

		padding-top: 2rem;
		padding-bottom: 2rem;

		// Adust the input box elements borders
		$input-box-el-border-radius: 0.4rem;

		// The main input box
		.input-box {
			
			// Remove space between inline-blocks
			font-size:0; 

			// Input-box radius : note you will need 
			// to update input left top/bottom radius as well
			background-color:$color5-base;
			display: inline-block;
			border-radius: $input-box-el-border-radius;

			// Common settings for input, and suffix label
			.input-email, .input-suffix {
				padding:0;
				margin:0;
				font-size:1rem;
				padding-top:0.25rem;
				padding-bottom:0.25rem;
			}

			// Input email styling
			.input-email {
				border:0px;
				width: 12rem;
				display: inline-block;
				text-align:center;

				// Border radius overwrite
				border-top-left-radius: $input-box-el-border-radius;
				border-bottom-left-radius: $input-box-el-border-radius;
				border-top-right-radius: 0rem;
				border-bottom-right-radius: 0rem;

				// input text color
				color: $dark-text;
			}

			// Input email suffix
			.input-suffix {
				width: 10rem;
				display: inline-block;
				padding-left:1rem;
				padding-right:1rem;

				// Text with subtle fade out
				color: fade-out($dark-text, 0.3);
			}
		}

		// Submit box 
		.submit-box {
			display:inline-block;
			margin-left:1rem;
		}
		// Submission button styling
		.submit  {
			padding: 0.25rem 1rem 0.25rem 1rem;
			margin:0;
			border: 0;

			font-size:1rem;
			font-weight: bold;
			
			background: $cta-base;
			color: $cta-base-text;

			border-radius: $input-box-el-border-radius;

			font-size: 100%;
			font-family: inherit;
			text-transform: none;
			-webkit-appearance: button;
		}

		// Hover submit button styling
		.submit:hover {
			background: $cta-hover;
			color: $cta-hover-text;
		}

		/*
		@media only screen and (max-width:760px) {
			// Collapes the inbox input into 2 lines
			.input-box {
				display: inline-block;
				vertical-align: middle;
				width: 12rem;
				.input-email {
					border-top-right-radius: $input-box-el-border-radius;
					border-bottom-left-radius: 0;
				}
			}

			// Increase submit button height
			.submit-box {
				display: inline-block;
				vertical-align: middle;
				.submit {
					display: inline;
					height: 3.5rem;
				}
			}
		}
		*/

		@media only screen and (max-width:760px) {
			// Collapes the inbox input into 2 lines
			.input-box {
				display: inline-block;
				vertical-align: middle;
				width: 75%;
				.input-email {
					border-top-right-radius: $input-box-el-border-radius;
					border-bottom-left-radius: 0;
					width: 100%;
					height:2rem;
				}
			}

			// Increase submit button height
			.submit-box {
				margin-top:1.25rem;
				margin-left:0;

				display: block;
				vertical-align: middle;
				
				.submit {
					display: inline;
					width: 75%;
					height:2.5rem;
				}
			}
		}
	}
	/*
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
		display:flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		margin-top: 5rem;
	}

	.intermission-header {
		height: 30vh;
	}
	*/
</style>
