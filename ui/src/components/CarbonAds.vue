<template>
	<div></div>
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
		created () {
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

			document.head.appendChild(scriptTag)
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
</style>
