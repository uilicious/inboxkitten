/**
 * Cloudflare fetch result handling
 */
addEventListener('fetch', event => {
	event.respondWith(handleFetchEvent(event))
})

const KittenRouter = require("kittenrouter");
const kittenRouterConfig = require("./config/kittenRouterConfig") || {};
const router = new KittenRouter(kittenRouterConfig);

async function handleFetchEvent(event) {

	// Get the request object
	let req = event.request;
	// Get the request URL
	let url = new URL(req.url)

	// Does the CORS options hanlding
	if (req.method === "OPTIONS") {
		return require("./src/cloudflare-api/optionsHandler")(req)
	} 

	// Get the pathname
	let pathname = url.pathname;
	
	// Does API processing
	if(pathname === "/api/v1/mail/list"){
		return require("./src/cloudflare-api/mailList")(url)
	} else if(pathname === "/api/v1/mail/getKey") {
		return require("./src/cloudflare-api/mailGetKey")(url)
	} else if (pathname === "/api/v1/mail/getHtml") {
		return require("./src/cloudflare-api/mailGetHtml")(url)
	} else if (pathname.startsWith("/api/")) {
		// Throw an exception for invalid API endpoints
		return new Response('Invalid endpoint - ' + pathname, { status: 400, statusText: 'INVALID_ENDPOINT' });
	}

	// KittenRouter handling
	if( 
		pathname === "" || pathname === "/" ||
		pathname.startsWith("/inbox/") || 
		pathname.startsWith("/static/css") || 
		pathname.startsWith("/static/img") || 
		pathname.startsWith("/static/js")
	) {
		return router.handleFetchEvent(event);
	}
	
	// Throw an exception for invalid file request
	return new Response('Invalid filepath - ' + url.pathname, { status: 404, statusText: 'UNKNOWN_FILEPATH' });
}
