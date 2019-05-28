<template>
	<nav class="nav">
		<div class="back-button" @click="backAPage"><i class="fa fa-arrow-left fa-3x"/></div>
		<div class="logo-box">
			<img class="logo" src="@/assets/logo_no_text.svg" @click="goMainPage"/>
		</div>

			<form v-on:submit.prevent="" class="form-box">
				<input class="input-email" name="email" aria-label="email" type="text" v-model="email" id="email-input"/>
				<div class="domain-text" id="div-domain" data-clipboard-target="#email-input">@{{domain}}</div>
				<input type="submit" class="submit" value="Go!" @click="changeInbox"/>
				<button class="refresh" @click="emitRefresh">Refresh</button>
			</form>
	</nav>
</template>

<script>
	import config from '@/../config/apiconfig.js'
	import 'normalize.css'
	import $ from 'jquery'
	import ClipboardJS from 'clipboard'

	export default {
		name: 'NavBar',
		data: () => {
			return {
				email: ''
			}
		},
		computed: {
			domain () {
				return config.domain
			}
		},
		mounted () {
			this.email = this.$route.params.email
			if (this.email === '') {
				this.goMainPage()
			}

			this.$clipboard = []

			let self = this

			this.$clipboard[0] = new ClipboardJS('#div-domain', {
				text: function (trigger) {
					if (self.email.includes('@' + config.domain)) {
						return self.email
					}
					return self.email + '@' + config.domain
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
		methods: {
			goMainPage () {
				this.$router.push({
					name: 'Kitten Land'
				})
			},
			emitRefresh () {
				this.$eventHub.$emit('refresh', '')
			},
			changeInbox () {
				this.$router.push({
					name: 'List',
					params: {
						email: this.email
					}
				})
				this.$eventHub.$emit('refreshInbox', {email: this.email})
			},
			backAPage () {
				if (this.$route.name === 'List') {
					this.$router.push({
						name: 'Kitten Land'
					})
				} else {
					this.$router.push({
						name: 'List'
					})
				}
			}
		}
	}
</script>

<style lang="scss" rel="stylesheet/scss">
	@import "primer-tooltips/index.scss";
	@import "@/scss/_color.scss";
	.nav {
		background: #36D1DC;  /* fallback for old browsers */
		background: -webkit-linear-gradient(to right, #5B86E5, #36D1DC);  /* Chrome 10-25, Safari 5.1-6 */
		background: linear-gradient(to right, #5B86E5, #36D1DC); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
		width: 100vw;
		height: 10rem;
		text-align: left;
		padding-top:2rem;
		padding-bottom:2rem;
		top: 0;

		.logo-box{
			width:100%;
			height:2rem;
			text-align: center;
			vertical-align: center;
			display: block;
			overflow: hidden;

			.logo {
				width:6rem;
			}
			.logo:hover {
				cursor: pointer;
			}
		}

		.back-button {
			position:absolute;
			padding-left:30rem;
			padding-top:3rem;
			padding-right:3rem;
			padding-bottom:3rem;
			cursor: pointer;
			margin:0;
		}
	}

	//
	// Email form box
	//

	.form-box {
		display:flex;
		flex-direction: row;
		justify-content: center;
		align-items: stretch;

		.domain-text {
			display: none;
			width:14rem;
		}

		.input-email {
			text-align: center;
			border: 3px solid black;
		}
		.submit {
			background: $cta-base;
			color: $cta-base-text;
			border: 3px solid black;
			border-left-width: 0;
		}

		.submit:hover {
			background-color: $cta-hover;
			color: $cta-hover-text;
		}
		.refresh {
			background: #005CFF;
			color: $cta-base-text;
			border: 3px solid black;
			border-left-width: 0;
		}

		.refresh:hover {
			background-color: $cta-hover;
			color: $cta-hover-text;
		}
	}

	@media (min-width: 760px){ // IPad and above
		.nav{
			.logo-box{
				height:6rem;
				.logo{
					width:16rem;
				}
			}

			.back-button {
				padding-left:3rem;
			}
		}

		.form-box{
			.domain-text{
				display: inline-block;
				background:white;
				text-align: center;
				margin: 0;
				padding:0.2rem; // need help on this
				vertical-align: middle;
				border: 3px solid black;
				border-left-width: 0;
				background-color: $domain-base;
				cursor: pointer;
				width:10rem;
			}
		}
	}

	@media (max-width: 800px) { // IPad portrait
		.nav{
			.back-button{
				padding:3rem;
				padding-left:3rem;
			}
		}
	}

	@media (max-width:760px){ // Smartphones
		.nav {
			height:4rem;

			.back-button {
				padding: 1rem;
				padding-left: 2rem;

				font-size: 10px;
			}
		}

		.form-box{
			.input-email{
				width: 9rem;
			}
			.refresh {
				display:none;
			}
		}
	}

	@media (max-width: 320px){ // IPhone 5/SE

		.form-box{
			.input-email{
				width: 7rem;
			}
		}
	}

</style>
