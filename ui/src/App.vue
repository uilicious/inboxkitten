<template>
	<div id="app">
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

	// Some forceful scroll bar fixing
	html, body {
		margin: 0;
		padding: 0;
		overflow-x: hidden;
	}

	// Github corner styling
	.github-corner:hover .octo-arm{animation:octocat-wave 560ms ease-in-out}@keyframes octocat-wave{0%,100%{transform:rotate(0)}20%,60%{transform:rotate(-25deg)}40%,80%{transform:rotate(10deg)}}@media (max-width:500px){.github-corner:hover .octo-arm{animation:none}.github-corner .octo-arm{animation:octocat-wave 560ms ease-in-out}}
</style>
