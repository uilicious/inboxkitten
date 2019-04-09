/**
 * Cloudflare fetch result handling
 */
addEventListener('fetch', event => {
	event.respondWith(fetchAndApply(event.request))
})

async function fetchAndApply(request) {
	// Get the request URL
	let url = new URL(request.url)

	// Does the CORS options hanlding
	if (request.method === "OPTIONS") {
		return require("./src/cloudflare-api/optionsHandler")(request)
	} 
	
	// Does API processing
	if(url.pathname === "/api/v1/mail/list"){
		return require("./src/cloudflare-api/mailList")(url)
	} else if(url.pathname === "/api/v1/mail/getKey") {
		return require("./src/cloudflare-api/mailGetKey")(url)
	} else if (url.pathname === "/api/v1/mail/getHtml") {
		return require("./src/cloudflare-api/mailGetHtml")(url)
	} else if (url.pathname.startsWith("/api/")) {
		// Throw an exception for invalid API endpoints
		return new Response('Invalid endpoint - ' + url.pathname, { status: 400, statusText: 'INVALID_ENDPOINT' });
	}

	// Throw an exception for invalid file request
	return new Response('Invalid filepath - ' + url.pathname, { status: 404, statusText: 'UNKNOWN_FILEPATH' });
}
