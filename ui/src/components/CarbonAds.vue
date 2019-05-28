<template>
	<div id="_carbon_ads_div"></div>
</template>

<script>
	import config from '@/../config/carbonads.js'
	export default {
		name: 'CarbonAds',
		data: () => {
			return {
				placement: ''
			}
		},
		mounted () {
			// // Skip if disabled
			// if (!config.enable) {
			// 	return
			// }

			// // Does a placement check if configured
			// if (config.placementList) {
			// 	let placementList = config.placementList
			// 	if (placementList.indexOf(this.placement) < 0) {
			// 		// No placement found, rejects
			// 		return
			// 	}
			// }

			// Lets do the script injection
			let scriptTag = document.createElement('script')
			scriptTag.setAttribute('src', config.carbon_ad_src)
			scriptTag.setAttribute('type', 'text/javascript')
			scriptTag.setAttribute('async', 'async')
			scriptTag.setAttribute('id', '_carbonads_js')

			document.getElementById('_carbon_ads_div').appendChild(scriptTag)
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss">
#carbonads {
	display: block;
	overflow: hidden;
	padding: 10px;
	box-shadow: 0 1px 3px hsla(0, 0%, 0%, .05);
	border-radius: 4px;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', Helvetica, Arial, sans-serif;
	line-height: 1.5;
	max-width: 300px;
	font-size: 12px;
	background-color: #fff;
	float:left;
	z-index: 4;
	position: absolute;
}

#carbonads a {
	text-decoration: none;
}

#carbonads span {
	position: relative;
	display: block;
	overflow: hidden;
}

.carbon-img {
	float: left;
	margin-right: 1em;
}

.carbon-img img {
	display: block;
}

.carbon-text {
	display: block;
	float: left;
	max-width: calc(100% - 130px - 1em);
	text-align: left;
	color: #637381;
}

.carbon-poweredby {
	position: absolute;
	left: 142px;
	bottom: 0;
	display: block;
	font-size: 8px;
	color: #c5cdd0;
	font-weight: 500;
	text-transform: uppercase;
	line-height: 1;
	letter-spacing: 1px;
}

@media only screen and (max-width:1300px) and (min-width: 760px) {
	#carbonads {
	display: block;
	overflow: hidden;
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
	padding: 1em;
	background: #fff;
	text-align: center;
	line-height: 1.5;
	font-size: 14px;
	max-width: 130px;
	}

	#carbonads a {
	color: inherit;
	text-decoration: none;
	}

	#carbonads a:hover {
	color: inherit;
	}

	#carbonads span {
	display: block;
	overflow: hidden;
	}

	.carbon-img {
	display: block;
	margin: 0 auto 8px;
	line-height: 1;
	}

	.carbon-text {
	display: block;
	margin-bottom: 8px;
	text-align: left;
	color: #637381;
	max-width:130px;
	}

	.carbon-poweredby {
	text-transform: uppercase;
	display: block;
	font-size: 10px;
	letter-spacing: 1px;
	line-height: 1;
	}
}

@media only screen and (max-width:800px){
	#carbonads {
		position:fixed;
		width:100vw;
		max-width: 100vw;
		z-index: 99;
	}
}

</style>
