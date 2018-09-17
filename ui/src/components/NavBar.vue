<template>
	<nav class="nav">
		<div class="logo-box">
			<img class="logo" src="@/assets/logo_no_text.svg" @click="goMainPage"/>
		</div>

    <div class="email-selection">
      <form v-on:submit.prevent="goToInbox" class="form-box">
        <input class="input-email" name="email" aria-label="email" type="text" v-model="randomName" id="email-input"/>
        <input type="submit" class="submit" value="Go!"/>
      </form>
    </div>
	</nav>
</template>

<script>
	import config from '@/../config/apiconfig.js'
  import 'normalize.css'
	export default {
		name: 'NavBar',
		computed: {
			domain () {
				return config.domain
			}
		},
		methods: {
			goMainPage () {
				this.$router.push({
					name: 'Kitten Land'
				})
			}
		}
	}
</script>

<style lang="scss" rel="stylesheet/scss">
	@import "@/scss/_color.scss";
  $submit-box-width: 3rem;
  $box-height: 2rem;
	.nav {
		background-color: $color1-base;
		width: 100vw;
		text-align: left;
    padding-top:2rem;
    padding-bottom:2rem;

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
  // Email selection box
  //
  .submit {
    background: $cta-base;
    color: $cta-base-text;
    border: 3px solid black;
    border-left-width: 0;
  }

  .input-email {
    border: 3px solid black;
  }

  .form-box {
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-items: stretch;
  }

  @media (min-width: 760px){
    .nav{
      .logo-box{
        height:4rem;
        .logo{
          width:10rem;
        }
      }
    }


  }

</style>
