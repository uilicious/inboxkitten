<template>
	<div>
		<div class="nav">
			<img class="nav-main-logo" src="@/assets/logo_no_text.svg" @click="goToMainPage"/>
			<h4 class="nav-header" @click="goToMainPage">Inbox Kitten</h4>
		</div>
		<div class="header-gradient-background">
			<div class="header">
				<div class="logo-box">
					<img class="logo" src="@/assets/kitten_router.png"/>
				</div>
			</div>
		</div>
		<div class="info-guide">
			<div class="features" style="max-width:1100px">
				<div class="feature-card">
                    <img class="logo" src="@/assets/elasticsearch.png" style="width:3rem"/>
					<h3>ElasticSearch</h3>
					<p>
						Log down your network traffic to your own elasticsearch server for analytics!
					</p>
				</div>
				<div class="feature-card">
                    <i class="fas fa-server fa-3x"></i>
					<h3>Find next available server</h3>
					<p>With the list of configured servers, KittenRouter can help you redirect the request to the next available server.</p>
				</div>
			</div>
			<div class="features">
                <div class="feature-card"></div>
                <div class="feature-card feature-card-hover">
                    <a href="https://github.com/uilicious/kittenrouter" target="_blank" style="text-decoration: none; color: inherit; cursor: pointer;">
                        <p> Get your own Kitten Router from Github now! </p>
<pre class="hljs" style="display: block; overflow-x: auto; padding: 0.5em; background: rgb(240, 240, 240); color: rgb(68, 68, 68);"><span>https://github.com/uilicious/kittenrouter</span></pre>
                    </a>
                </div>
                <div class="feature-card"></div>
			</div>
		</div>
        <div class="line-break"></div>
		<div class="love-notes">
			<p>
				made with <span style="color: #e25555;">&hearts;</span> by <a href="https://uilicious.com">uilicious</a> in <a href="https://www.google.com.sg/search?q=singapore">Singapore</a>
			</p>
		</div>
    </div>
</template>

<script>
import shareConfig from '@/../config/shareConfig.js'
export default {
	name: 'App',
	data: () => {
		return {
			mainURL: shareConfig.mainURL
		}
    },
    mounted () {
        document.getElementsByClassName('github-corner')[0].href = 'https://github.com/uilicious/kittenrouter'
	},
	methods: {
		goToMainPage () {
			location.href = this.mainURL
		}
	}
}
</script>

<style lang="scss" rel="stylesheet/scss">
	@import url("https://use.fontawesome.com/releases/v5.3.1/css/all.css");
    @import "scss/landingpage.scss";

	.nav {
		display:flex;
		justify-content: flex-start;
		align-items: center;

		padding-left:2rem;
		background: #36D1DC;  /* fallback for old browsers */
		background: -webkit-linear-gradient(to right, #5B86E5, #36D1DC);  /* Chrome 10-25, Safari 5.1-6 */
		background: linear-gradient(to right, #5B86E5, #36D1DC); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
		width: 100vw;
		height: 5.5rem;
		text-align: left;

		.nav-main-logo {
			width:4rem;
			padding-right: 1rem;
			cursor: pointer;
		}

		.nav-header {
			padding-right: 1rem;
			cursor: pointer;
		}
	}
</style>
