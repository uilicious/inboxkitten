module.exports = {
	hosts: [
		{
			domain: 'inboxkitten.com',
			root: './index.html',
			fallback: { 200: './index.html' },
			directories: { trailingSlash: 'never' },
			accessControl: { allowOrigin: '*' },
			headers: [{ fields: { 'X-Frame-Options': 'deny' } }],
			manifest: [{ get: '/index.html', push: '/favicon.ico' }]
		},
		{
			domain: 'commonshost.inboxkitten.com',
			root: './index.html',
			fallback: { 200: './index.html' },
			directories: { trailingSlash: 'never' },
			accessControl: { allowOrigin: '*' },
			headers: [{ fields: { 'X-Frame-Options': 'deny' } }],
			manifest: [{ get: '/index.html', push: '/favicon.ico' }]
		},
		{
			domain: 'commonshost-raw.inboxkitten.com',
			root: './index.html',
			fallback: { 200: './index.html' },
			directories: { trailingSlash: 'never' },
			accessControl: { allowOrigin: '*' },
			headers: [{ fields: { 'X-Frame-Options': 'deny' } }],
			manifest: [{ get: '/index.html', push: '/favicon.ico' }]
		}
	]
}