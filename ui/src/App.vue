<template>
	<div id="app">
		<!-- Github corners -->
		<a href="https://github.com/uilicious/inboxkitten" class="github-corner" aria-label="View source on Github" target="_blank" style="z-index:99;"><svg width="80" height="80" viewBox="0 0 250 250" style="fill:#151513; color:#fff; position: absolute; border: 0; right: 0;" aria-hidden="true"><path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path><path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path><path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path></svg></a>
		<!-- Product hunt banner -->
		<!-- <div>
			<a href="https://www.producthunt.com/posts/inboxkitten" target="_blank" class="product-hunt">
				<img src="@/assets/product-hunt-240.png" class="ph-icon"/>
				<p>Support our product hunt launch here</p>
			</a>
		</div> -->
		<!-- <div style="position:fixed; top:3vh; right:2vw; z-index:10;" v-if="isShare"> -->
			<!--<a href="https://twitter.com/intent/tweet?ref_src=twsrc%5Etfw" class="twitter-hashtag-button" data-size="large" :data-text="tweetMsg" :data-url="tweetDataUrl" data-show-count="false">Tweet</a>-->
			<!--<a class="github-button" :href="githubLink" data-size="large" :aria-label="githubAriaLabel">Fork</a>-->
		<!-- </div> -->
		<router-view class="app-router-view"/>
	</div>
</template>

<script>
import shareConfig from '@/../config/shareConfig.js'

export default {
	name: 'App',
	data: () => {
		return {
			githubLink: shareConfig.githubForkLink,
			githubAriaLabel: shareConfig.githubAriaLabel,
			tweetDataUrl: shareConfig.tweetDataUrl,
			tweetMsg: shareConfig.tweetMessage,
			isShare: shareConfig.enabled
		}
	}
}
</script>

<style lang="scss" rel="stylesheet/scss">

	@import url("https://unpkg.com/purecss@1.0.0/build/pure-min.css");
	@import "scss/_producthunt.scss";
	@import "scss/_common.scss";

	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		width:100vw;
		display: flex;
		flex-direction: column;
	}

	.app-router-view {
		flex:1;
	}

	// Github corner styling
	.github-corner:hover .octo-arm{animation:octocat-wave 560ms ease-in-out}@keyframes octocat-wave{0%,100%{transform:rotate(0)}20%,60%{transform:rotate(-25deg)}40%,80%{transform:rotate(10deg)}}@media (max-width:500px){.github-corner:hover .octo-arm{animation:none}.github-corner .octo-arm{animation:octocat-wave 560ms ease-in-out}}

	@media only screen and (max-width:800px) {
		.github-corner {
			visibility: hidden;
		}
	}
</style>
