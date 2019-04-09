/**
 * KittenRouter is a utility class used to 
 * 
 * - log request, for monitoring purposes (with ip masking for GDPR)
 * - reroute fetch requests an alternative "origin" endpoint
 * 	- automatically failover on request failure / timeout
 * 	- logging of failed requests
 * 	- fallback to default cloudflare "origin" endpoint
 * 
 * And as the name implies, is a sub project for InboxKitten.
 */

/**
 * Useful various refrence documentation, on how this whole class should be implemented
 * 
 * Cloudflare refrence documentation
 * - https://blog.cloudflare.com/logs-from-the-edge/
 * - https://developers.cloudflare.com/workers/reference/cache-api/
 * - https://blog.cloudflare.com/introducing-the-workers-cache-api-giving-you-control-over-how-your-content-is-cached/
 * - https://support.cloudflare.com/hc/en-us/articles/200170986-How-does-Cloudflare-handle-HTTP-Request-headers-
 * - https://support.cloudflare.com/hc/en-us/articles/202494830-Pseudo-IPv4-Supporting-IPv6-addresses-in-legacy-IPv4-applications
 * 
 * Webworker documentation (for fetch API)
 * - https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch
 * - https://developer.mozilla.org/en-US/docs/Web/API/Request
 * - https://developer.mozilla.org/en-US/docs/Web/API/Response
 */

//---------------------------------------------------------------------------------------------
//
// The following is an example config object, used to setup KittenRouter
// and kinda serve as a semi-functional spec of how KittenRouter is expected to work.
//
//---------------------------------------------------------------------------------------------
const exampleConfig = {

	// logging endpoint to use
	log : {
		// Currently only elasticsearch is supported, scoped here for future alternatives
		type : "elasticsearch",

		// Elasticsearch index endpoint, note that a POST request will be done here
		url : "https://user:password@elasticsearch-server.secret-domain.com/cluster/index",

		// Mask the last digit of IPv4 address
		// or the "network" routing for IPv6
		// see : https://www.haproxy.com/blog/ip-masking-in-haproxy/
		maskIP : true
	},

	// routing rules to evaluate, starting from 0 index
	routes : [
		{
			// Routing prefix to check for, note that "" will match all
			prefix : [""],
			origins : [
				"host-endpoint-a",
				"host-endpoint-b",
				// // @TODO (consider support for object based origin decleration?)
				// // Might be useful for some region based routing
				// // or maybe crazier? racing origin requests and terminating the "slower copy"
				// {
				// 	host : "host-endpoint-c"
				// 	port : 443,
				// 	protocol : "https",
				// 	// Matching by country
				// 	country : [
				// 		"SG"
				// 	],
				// 	// Matching by region
				// 	region : [
				// 		"Europe"
				// 	],
				// 	// Fetching sub options (like cache overwrite)
				// 	fetchConfig : { cf: { cacheEverything: true } }
				// }
			]
		}
	],

	// Allow fallback to origin host fetch request
	defaultFetchFallback : true

	// @TODO crazier caching options to consider
	// - KeyValue caching (probably pointless, cost wise)
	// - In memory caching (with a limit of 500 objects + 10 kb per object?)
	// See : https://developers.cloudflare.com/workers/writing-workers/storing-data/
}

//---------------------------------------------------------------------------------------------
//
// Class internal function logic
//
//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//
// Class implementation (and public interface)
//
//---------------------------------------------------------------------------------------------

class KittenRouter {
	
	/**
	 * Setup KittenRouter instance with the given config
	 * 
	 * @param config for configuring KittenRouter
	 */
	constructor(config) {
		this.config = config || {}; // fallback for blank object (make certain things easier)
	}

	/**
	 * Request handling function, and routing
	 * 
	 * @param  request from cloudflare to process
	 * 
	 * @return response object for cloudflare
	 */
	handleRequest(request) {

	}
}