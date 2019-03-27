let commonsHostConfig = {
	root: './index.html',
	fallback: { 200: './index.html' },
	directories: { trailingSlash: 'never' },
	accessControl: { allowOrigin: '*' },
	headers: [
		{ fields: { 'X-Frame-Options': 'deny' } }
		// {
		// 	uri: '/static/{dir}/{filename}.{hash}.{type}',
		// 	fields: {
		// 		'Cache-Control': 'public, max-age=31536000, immutable'
		// 	}
		// }
	],
	manifest: [{ get: '/index.html', push: '/favicon.ico' }]
}

module.exports = {
	hosts: [
		Object.assign({ domain: 'inboxkitten.com' }, commonsHostConfig),
		Object.assign({ domain: 'commonshost-raw.inboxkitten.com' }, commonsHostConfig),
		Object.assign({ domain: 'commonshost.inboxkitten.com' }, commonsHostConfig)
	]
}