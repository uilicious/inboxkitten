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
	log : [
		{
			// Currently only elasticsearch is supported, scoped here for future alternatives
			// One possible option is google analytics endpoint
			type : "elasticsearch",

			//
			// Elasticsearch index endpoint, note that a POST request will be done here
			// the elasticsearch instance will then be expected to generate its own document id
			// See : https://stackoverflow.com/questions/24756337/how-insert-data-to-elasticsearch-without-id
			//
			url : "https://user:password@elasticsearch-server.secret-domain.com/cluster/index",


			// Enable logging of the full ipv4/6
			//
			// Else it mask (by default) the last digit of IPv4 address
			// or the "network" routing for IPv6
			// see : https://www.haproxy.com/blog/ip-masking-in-haproxy/
			logTrueIP : false
		}
	],

	// routing rules to evaluate, starting from 0 index
	routes : [
		{
			// "" host routing will match all
			host : [""],
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
				// 	// Country codes : https://support.cloudflare.com/hc/en-us/articles/205072537-What-are-the-two-letter-country-codes-for-the-Access-Rules-
				// 	country : [
				// 		"SG"
				// 	],
				// 	// Matching by region
				// 	region : [
				// 		"Europe"
				// 	],
				// 	// Timeout to abort request on
				// 	
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
// Logging internal logic
//
//---------------------------------------------------------------------------------------------

// Simple regex to validate for an ipv4
const ipv4_simpleRegex = /^[0-9a-z]{1,3}\.[0-9a-z]{1,3}\.[0-9a-z]{1,3}\.[0-9a-z]{1,3}$/i;

// Extract from various possible options, a valid ipv4 from the request
function getIPV4(request, logTrueIP = false) {
	let headers = request.headers;
	let ip = headers.get('cf-pseudo-ipv4') || headers.get('cf-connecting-ipv4') || headers.get('cf-connecting-ip') || '';

	// If ipv4 validation failed, return blank
	if(ip === '' || !ipv4_simpleRegex.test(ip)) {
		return "";
	}

	// Assume that its a valid ipv4
	// return immediately if no ipmasking is done
	if(logTrueIP == false) {
		return ip;
	}

	// Time to perform ip masking
	let ip_split = ip.split(".");
	ip_split[3] = "xxx";
	return ip_split.join(".");
}

// Extract from various possible options, a valid ipv6 from the request
function getIPV6(request, logTrueIP = false) {
	let headers = request.headers;
	let ip = headers.get('cf-connecting-ipv6') || headers.get('cf-connecting-ip') || '';

	// If ipv4 validation passes, return blank
	if(ip === '' || ipv4_simpleRegex.test(ip)) {
		return "";
	}

	// Assume that its an ipv6
	// return immediately if no ipmasking is done
	if(logTrueIP == false) {
		return ip;
	}

	// Time to perform ip masking
	let ip_split = ip.split(":");
	for(let i=2; i<ip_split.length; ++i) {
		ip_split[i] = "xxxx"
	}
	return ip_split.join(":");
}

// Log request with a single config map
async function logRequestWithConfigMap(logConfig, request, response, routeType, routeCount) {
	// Does nothing if logconfig is null
	if( logConfig == null || logConfig.url == null || logConfig.url.length <= 0 ) {
		return null;
	}

	// Trueip logging flag
	let logTrueIP = logConfig.logTrueIP || false;

	// The data to log
	var data = {
		'timestamp':  Date.now(),

		'route.type':  routeType,
		'route.count': routeCount,

		'req.url':        request.url,
		'req.referer':    request.referrer || '',
		'req.method':     request.method,

		'req.ipv4':          getIPV4(request, logTrueIP),
		'req.ipv6':          getIPV6(request, logTrueIP),
		'req.host':          request.headers.get('host') || '',
		'req.user-agent':    request.headers.get('user-agent') || '',
		'req.country-code':  request.headers.get('cf-ipcountry') || '',

		'req.cf.ray':     request.headers.get('cf-ray') || '',
		'req.cf.colo':    request.cf.colo || '',
		'req.tlsVersion': request.cf.tlsVersion || '',
		'req.tlsCipher':  request.cf.tlsCipher || '',

		'res.status':           response.status,
		'res.url':              response.url,
		'res.server':           response.header.get('server') || '',
		'res.via':              response.header.get('via') || '',
		'res.content-type':     response.header.get('content-type') || '',
		'res.content-encoding': response.header.get('content-encoding') || '',
		'res.content-length':   response.header.get('content-length') || '',
		'res.cache-control':    response.header.get('cache-control') || '',
		'res.cf.cache-status':  response.header.get('cf-cache-status') || '',
		'res.cf.ray':           response.header.get('cf-ray') || '',
	};
	
	// The elasticsearch POST request to perform for logging
	return await fetch(
		logConfig.url, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: new Headers({
		  'Content-Type': 'application/json',
		})
	})
}

// Log request with a config array
async function logRequestWithConfigArray(configArr, request, response, routeType, routeCount) {
	// Does nothing if configArr is null
	if( configArr == null || configArr.length <= 0 ) {
		return null;
	}

	// Lets iterate the config
	let promiseArray = [];
	for(let i=0; i<configArr.length; ++i) {
		promiseArray = logRequestWithConfigMap(configArr[i], request, response, routeType, routeCount);
	}

	// Return with a single promise object
	return Promise.all(promiseArray);
}

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
	 * @param  event from cloudflare to process
	 * 
	 * @return response object for cloudflare
	 */
	async handleRequestEvent(event) {
		// Get the request object
		let request = event.request;

		

	}
}