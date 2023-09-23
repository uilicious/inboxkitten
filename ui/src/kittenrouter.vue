<template>
	<div>
		<!-- <carbon-ads placement="InboxKittenLanding"></carbon-ads> -->
		<div class="kittenrouter-navigation">
			<img class="kittenrouter-nav-main-logo" src="@/assets/inbox_kitten.png" @click="goToMainPage"/>
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
                    <img class="logo" src="@/assets/elasticsearch.png" style="width:3.7rem"/>
					<h3>ElasticSearch</h3>
					<p>
						Log down your network traffic to your own elasticsearch server for analytics!
					</p>
				</div>
				<div class="feature-card">
                    <i class="fas fa-server fa-4x"></i>
					<h3>Find next available server</h3>
					<p>With the list of configured servers, KittenRouter can help you redirect the request to the next available server.</p>
				</div>
				<div class="feature-card">
                    <img class="logo" src="@/assets/cloudflare.png" style="width:10rem"/>
					<h3>Deploy it on Cloudflare</h3>
					<p>Kitten Router is built for Cloudflare Workers script!</p>
				</div>
			</div>
		</div>
		<div class="info-guide">
			<div class="deploy-segmet">
				<h2>Configuring Kitten Router</h2>
				<p>Before you use Kitten Router, make sure that your configuration settings are correct. Below is a sample configuration.</p>
			</div>
		</div>
		<div class="code config-code">
<pre style="color:#000020;background:#f6f8ff;"><span style="color:#200080; font-weight:bold; ">let</span> config <span style="color:#308080; ">=</span> <span style="color:#406080; ">{</span>

	<span style="color:#595979; ">// logging endpoint to use</span>
	<span style="color:#200080; font-weight:bold; ">log</span> <span style="color:#406080; ">:</span> <span style="color:#308080; ">[</span>
		<span style="color:#406080; ">{</span>
			type <span style="color:#406080; ">:</span> <span style="color:#800000; ">"</span><span style="color:#1060b6; ">elasticsearch</span><span style="color:#800000; ">"</span><span style="color:#308080; ">,</span>
			url <span style="color:#406080; ">:</span> <span style="color:#800000; ">"</span><span style="color:#1060b6; ">https://&lt;Your elasticsearch server url&gt;</span><span style="color:#800000; ">"</span><span style="color:#308080; ">,</span>

			<span style="color:#595979; ">//</span>
			<span style="color:#595979; ">// Authorization header (if needed)</span>
			<span style="color:#595979; ">//</span>
			basicAuthToken <span style="color:#406080; ">:</span> <span style="color:#800000; ">"</span><span style="color:#1060b6; ">username:password</span><span style="color:#800000; ">"</span><span style="color:#308080; ">,</span>

			<span style="color:#595979; ">//</span>
			<span style="color:#595979; ">// Index prefix for storing data, this is before the "YYYY.MM" is attached</span>
			<span style="color:#595979; ">//</span>
			indexPrefix <span style="color:#406080; ">:</span> <span style="color:#800000; ">"</span><span style="color:#1060b6; ">test-data-</span><span style="color:#800000; ">"</span><span style="color:#308080; ">,</span>

			<span style="color:#595979; ">// Enable logging of the full ipv4/6</span>
			<span style="color:#595979; ">//</span>
			<span style="color:#595979; ">// Else it mask (by default) the last digit of IPv4 address</span>
			<span style="color:#595979; ">// or the "network" routing for IPv6</span>
			<span style="color:#595979; ">// see : </span><span style="color:#5555dd; ">https://www.haproxy.com/blog/ip-masking-in-haproxy/</span>
			logTrueIP <span style="color:#406080; ">:</span> <span style="color:#0f4d75; ">false</span>
		<span style="color:#406080; ">}</span>
	<span style="color:#308080; ">]</span><span style="color:#308080; ">,</span>

	<span style="color:#595979; ">// Routing rules to evaluate, starting from 0 index</span>
	<span style="color:#595979; ">// these routes will always be processed in sequence</span>
	route <span style="color:#406080; ">:</span> <span style="color:#308080; ">[</span>
		<span style="color:#595979; ">// Lets load all requests to commonshost first</span>
		<span style="color:#800000; ">"</span><span style="color:#1060b6; ">commonshost.inboxkitten.com</span><span style="color:#800000; ">"</span>

		<span style="color:#595979; ">// If it fails, we fallback to firebase</span>
		<span style="color:#595979; ">//"firebase.inboxkitten.com"</span>
	<span style="color:#308080; ">]</span><span style="color:#308080; ">,</span>

	<span style="color:#595979; ">// Set to true to disable fallback to origin host </span>
	<span style="color:#595979; ">// when all routes fails</span>
	disableOriginFallback <span style="color:#406080; ">:</span> <span style="color:#0f4d75; ">false</span><span style="color:#308080; ">,</span>
<span style="color:#406080; ">}</span>
</pre>
		</div>
		<div class="info-guide">
			<div class="features steps">
			<div class="feature-card">
				<h2>Option 1: Using Kitten Router manually</h2>
				<div class="code deploy-code">
					<div style="text-align:justify">
						1. Copy the configuration<br/>
						2. Copy the index.js file in Github <br/>
						&nbsp;&nbsp;&nbsp;into your Cloudflare Worker script<br/>
						3. Initialize KittenRouter variable in your script<br/>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;let router = new KittenRouter(config)<br/>
						4. Use it to route all your desires
					</div>
				</div>
			</div>
			<div class="feature-card">
				<h2>Option 2: Using Kitten Router via NPM</h2>
				<div class="code deploy-code">
					<div style="text-align:justify">
						1. Copy the configuration<br/>
						2. Install KittenRouter via NPM<br/>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;npm install --save kittenrouter<br/>
						3. Initialize KittenRouter class in your script<br/>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const KittenRouter = require("kittenrouter")<br/>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;let router = new KittenRouter(config)<br/>
						4. Use it to route all your desires
					</div>
				</div>
			</div>
			</div>
		</div>

		<div class="info-guide">
			<div class="features">
                <div class="feature-card"></div>
                <div class="feature-card feature-card-hover">
                    <a href="https://github.com/uilicious/kittenrouter" target="_blank" style="text-decoration: none; color: inherit; cursor: pointer;">
                        <h2> Check out Kitten Router at Github to find out more! </h2>
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

// import CarbonAds from './components/CarbonAds.vue'

export default {
	name: 'App',
	components: {
		// CarbonAds: CarbonAds
	},
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

	.kittenrouter-navigation {
		display:flex;
		justify-content: flex-end;
		align-items: center;
		float:right;
		width: 100vw;
		height: 1rem;
		text-align: left;

		.kittenrouter-nav-main-logo {
			width:8rem;
			padding-top:7rem;
			padding-right: 4rem;
			z-index: 2;
			cursor: pointer;
		}

		.kittenrouter-nav-header {
			padding-top:6rem;
			padding-right: 3rem;
			cursor: pointer;
		}
	}

	@media only screen and (max-width:470px) {
		.kittenrouter-navigation .kittenrouter-nav-main-logo {
			padding-right: 4rem;
			width:5rem;
			z-index: 3;
		}
		.kittenrouter-nav-header {
			display: none;
		}
	}

	@media only screen and (max-width: 800px) {
		.kittenrouter-navigation {
			padding-top: 140px;
		}
	}
</style>
