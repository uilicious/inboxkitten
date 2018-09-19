<template>
	<nav class="nav">
		<div class="logo-box">
			<img class="logo" src="@/assets/logo_no_text.svg" @click="goMainPage"/>
		</div>

			<form v-on:submit.prevent="changeInbox" class="form-box">
				<input class="input-email" name="email" aria-label="email" type="text" v-model="email" id="email-input"/>
				<div class="domain-text" @click="emailInputFocus">@{{domain}}</div>
				<input type="submit" class="submit" value="Go!"/>
			</form>
	</nav>
</template>

<script>
	import config from '@/../config/apiconfig.js'
	import 'normalize.css'
	import $ from 'jquery'
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
		},
		methods: {
			goMainPage () {
				this.$router.push({
					name: 'Kitten Land'
				})
			},
			emailInputFocus () {
				$('#email-input').select()
			},
			changeInbox () {
				this.$router.push({
					name: 'List',
					params: {
						email: this.email
					}
				})
				this.$eventHub.$emit('refreshInbox', {email: this.email})
			}
		}
	}
</script>

<style lang="scss" rel="stylesheet/scss">
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
		}

		.input-email {
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
	}

	@media (min-width: 760px){
		.nav{
			.logo-box{
				height:6rem;
				.logo{
					width:16rem;
				}
			}
		}

		.form-box{

			.input-email{
				text-align: right;
			}
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
			}
		}
	}

	@media (max-width:760px){
		.nav {
			height:4rem;
		}
	}

</style>
