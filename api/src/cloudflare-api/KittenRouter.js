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

/*
const exampleConfig = {

	// logging endpoint to use
	log : [
		{
			// Currently only elasticsearch is supported, scoped here for future alternatives
			// One possible option is google analytics endpoint
			type : "elasticsearch",

			//
			// Elasticsearch index endpoint 
			//
			url : "https://elasticsearch-server.secret-domain.com/",

			//
			// Authorization header (if needed)
			//
			authUser : "user",
			authPass : "pass",

			//
			// Index prefix for storing data, this is before the "YYYY.MM" is attached
			//
			indexPrefix : "test-data-",

			// Enable logging of the full ipv4/6
			//
			// Else it mask (by default) the last digit of IPv4 address
			// or the "network" routing for IPv6
			// see : https://www.haproxy.com/blog/ip-masking-in-haproxy/
			logTrueIP : false,

			// @TODO support
			// Additional cookies to log
			//
			// Be careful not to log "sensitive" cookies, that can compromise security
			// typically this would be seesion keys.
			// cookies : ["__cfduid", "_ga", "_gid", "account_id"]
		}
	],

	// Routing rules to evaluate, starting from 0 index
	// these routes will always be processed in sequence
	route : [

		// Lets load all requests to commonshost first
		"commonshost.inboxkitten.com",

		// If it fails, we fallback to firebase
		"firebase.inboxkitten.com"

		// // Object based route definitions
		// //-----------------------------------------------------------------
		// {
		// 	// "" host routing will match all
		// 	reqHost : [""],
		// 	// Routing prefix to check for, note that "" will match all
		// 	reqPrefix : [""],
		
		// 	// Origin servers to route to
		// 	host : "host-endpoint-c",
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
			
		// 	// Fetching sub options (like cache overwrite)
		// 	fetchConfig : { cf: { cacheEverything: true } }
	
		// 	// @TODO (consider support for nested object based origin decleration?)
		// 	// Might be useful for some region based routing or maybe crazier?
		// 	// Racing origin requests and terminating the "slower copy"
		// 	//-------------------------------------------------------------------------
		// }
	],

	// Set to true to disable fallback to origin host 
	// when all routes fails
	disableOriginFallback : false,

	// @TODO support default timeout to process a request in milliseconds
	// defaultOriginTimeout : 10000, // 10,000 ms = 10 s

	// @TODO crazier caching options to consider
	// - KeyValue caching (probably pointless, cost wise)
	// - In memory caching (with a limit of 500 objects + 10 kb per object?)
	// See : https://developers.cloudflare.com/workers/writing-workers/storing-data/
}
*/

//---------------------------------------------------------------------------------------------
//
// Logging internal logic
//
//---------------------------------------------------------------------------------------------

// Simple regex to validate for an ipv4
const ipv4_simpleRegex = /^[0-9a-z]{1,3}\.[0-9a-z]{1,3}\.[0-9a-z]{1,3}\.[0-9a-z]{1,3}$/i;

/**
 * Extract from a request, various possible ip properties (in cludflare) 
 * for a valid ipv4 address
 * 
 * @param {Request} request object to extract from
 * @param {Boolean} logTrueIP (defaul false) used to log unmasked ip if true
 * 
 * @return {String} ipv4 string if found, else a blank string of ""
 */
function getIPV4(request, logTrueIP = false) {
	let headers = request.headers;
	let ip = headers.get('cf-pseudo-ipv4') || headers.get('cf-connecting-ipv4') || headers.get('cf-connecting-ip') || '';
	ip = ip.trim();

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

/**
 * Extract from a request, various possible ip properties (in cludflare) 
 * for a valid ipv6 address
 * 
 * @param {Request} request object to extract from
 * @param {Boolean} logTrueIP (defaul false) used to log unmasked ip if true
 * 
 * @return {String} ipv6 string if found, else a blank string of ""
 */
function getIPV6(request, logTrueIP = false) {
	let headers = request.headers;
	let ip = headers.get('cf-connecting-ipv6') || headers.get('cf-connecting-ip') || '';
	ip = ip.trim();

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

	// Index YYYY.MM formating
	let indexYearAndMonth = (new Date()).toISOString().substr(0,7).replace("-",".");
	let indexPrefix = logConfig.indexPrefix || "KittenRouter-log-";

	// The full POST request URL
	let fullLoggingURL = logConfig.url.trim();
	if( !fullLoggingURL.endsWith("/") ) {
		fullLoggingURL = fullLoggingURL+"/";
	}
	fullLoggingURL = fullLoggingURL+logConfig.indexPrefix+indexYearAndMonth+"/_doc/";

	// Trueip logging flag
	let logTrueIP = logConfig.logTrueIP || false;

	// The data to log
	let data = {
		'timestamp': (new Date()).toISOString(),

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
		'req.cf.colo':    (request.cf && request.cf.colo) || '',
		'req.tlsVersion': (request.cf && request.cf.tlsVersion) || '',
		'req.tlsCipher':  (request.cf && request.cf.tlsCipher) || '',

		'res.status':           response.status,
		'res.url':              response.url,
		'res.server':           response.headers.get('server') || '',
		'res.via':              response.headers.get('via') || '',
		'res.content-type':     response.headers.get('content-type') || '',
		'res.content-encoding': response.headers.get('content-encoding') || '',
		'res.content-length':   response.headers.get('content-length') || '',
		'res.cache-control':    response.headers.get('cache-control') || '',
		'res.cf.cache-status':  response.headers.get('cf-cache-status') || '',
		'res.cf.ray':           response.headers.get('cf-ray') || '',

		'config.logTrueIP': logTrueIP
	};

	// // Cookies to log
	// let cookieNames = logConfig.cookies;
	// if( cookieNames != null && cookieNames.length > 0 ) {
	// 	let cookieJar = request.headers.get("Cookie")
	// 	// @TODO : iterate cookies and log relevent keys
	// }

	// Lets prepare the headers
	let logHeaders = {
		'Content-Type': 'application/json',
	};

	// Lets handle authentication
	if( logConfig.basicAuthToken && logConfig.basicAuthToken.length > 0 ) {
		logHeaders["Authorization"] = "Basic "+btoa(logConfig.basicAuthToken);
	}

	// The elasticsearch POST request to perform for logging
	let logResult = await fetch(
		fullLoggingURL, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: new Headers(logHeaders)
	})

	// Log the log?
	if( logConfig.consoleDebug ) {
		console.log("KittenRouter logging response", logResult);
	}

	// Return the result
	return logResult;
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
		promiseArray[i] = logRequestWithConfigMap(configArr[i], request, response, routeType, routeCount);
	}

	// Return with a single promise object
	return Promise.all(promiseArray);
}

//---------------------------------------------------------------------------------------------
//
// Utility functions
//
//---------------------------------------------------------------------------------------------

/**
 * Clones a URL object, with an origin string
 * 
 * @param {URL} inURL to clone over
 * @param {String} originHostStr to overwrite host with
 * 
 * @return {URL} cloned URL object with new origin host
 */
function cloneUrlWithNewOriginHostString(inURL, originHostStr) {
	let ret = new URL(inURL);
	ret.host = originHostStr;
	return ret;
}

/**
 * Generate a Response object, containing an error
 * @param {String} errorCode for the error
 * @param {String} errorMsg containing error details
 * @param {int} httpCode (default=500) for response object 
 */
function setupResponseError(errorCode, errorMsg, httpCode = 500) {
	let ret = new Response(
		JSON.stringify({
			error: {
				code : errorCode,
				message : errorMsg
			}
		}),
		{ 
			status: httpCode, 
			statusText: errorCode, 
			headers: {
				"Content-Type": "application/json",
				//"KittenRouterException": "true"
			}
		}
	);
	ret._isKittenRouterException = true;
	return ret;
}

/**
 * Lets do a oversimplified check if a response object is valid
 * if the response code is 200~399
 * 
 * @param {*} resObj 
 * 
 * @return true if its a valid response object
 */
function isGoodResponseObject(resObj) {
	return resObj != null && resObj.status >= 200 && resObj.status < 400;
}

/**
 * Check if the given response object is a KittenRouter exception
 * @param {Response} resObj to validate
 * 
 * @return true if its a KittenRouter exception 
 */
function isKittenRouterException(resObj) {
	return resObj != null && resObj._isKittenRouterException;
	// resObj.headers && resObj.headers.get("KittenRouterException") == "true";
}

//---------------------------------------------------------------------------------------------
//
// Routing internal logic
//
//---------------------------------------------------------------------------------------------

/**
 * Makes a request, with a different origin host
 * 
 * @param {String} originHostStr to overwrite host with
 * @param {Request} inRequest to use 
 * 
 * @return {Response} object of the request
 */
// Process a routing request, and return its response object
async function processOriginRoutingStr(originHostStr, inRequest) {
	return fetch( //
		cloneUrlWithNewOriginHostString(inRequest.url,originHostStr), //
		inRequest //
	);
}

// // Process a routing request, and return its response object
// async function processOriginRouting(origin, inRequest) {
// 	if( (typeof origin) === "string" ) {
// 		return processOriginRoutingStr(origin, inRequest);
// 	}
// 	throw "Object based routing config is NOT yet supported";
// }

/**
 * Process a request, and perform the required route request and logging
 * This DOES NOT handle the fetch fallback
 * 
 * @param {Object} configObj conataining both the .route, and .log array config
 * @param {*} fetchEvent provided from cloudflare, attaches logging waitUntil
 * @param {Request} inRequest to process 
 * 
 * @return {Response} if a valid route with result is found, else return final route request failure (if any), else return null
 */
async function processRoutingRequest( configObj, fetchEvent, inRequest ) {
	// Lets get the route, and log array first
	let routeArray = configObj.route;
	let logArray = configObj.log;

	// Return null, on empty routeArray
	if( routeArray == null || routeArray.length <= 0 ) {
		return null;
	}

	// setup the variable for response object
	let resObj = null;

	// Lets iterate the routes
	for( let i=0; i<routeArray.length; ++i ) {
		let route = routeArray[i];

		// Route string processing
		if( (typeof route) === "string" ) {
			// Lets handle string origins
			resObj = await processOriginRoutingStr( route, inRequest );

			// Lets log 
			fetchEvent.waitUntil( logRequestWithConfigArray( logArray, inRequest, resObj, "ROUTE_REQUEST", i) );

			// If its a valid response, return it
			if( isGoodResponseObject(resObj) ) {
				return resObj;
			}

			// Lets continue to next route
			continue;
		}

		// Throw an exception on an unknown route type
		return setupResponseError("UNKNOWN_CONFIG", "Object based route config is not yet supported");
	}

	return resObj;
}

/**
 * Process the fetch event as it comes from cloudflare
 * 
 * @param {Object} configObj for the KittenRouter.config
 * @param {*} fetchEvent provided from cloudflare
 * 
 * @return {Response} if a valid route with result is found, else the last route error (if applicable)
 */
async function processFetchEvent( configObj, fetchEvent ) {
	// Lets unpack out the request
	let inReq = fetchEvent.request;
	let resObj = null;

	// Lets process the routing request
	//----------------------------------------------------------------------

	// Lets try to get a response from a route
	resObj = await processRoutingRequest( configObj, fetchEvent, inReq );

	// Lets return the response object if its valid
	// We do an oversimilified assumption that its valid 
	// if the response code is 200~399
	if( isGoodResponseObject(resObj) ) {
		return resObj;
	}

	// Throw and show results from setupResponseError (for direct feedback loop)
	if( isKittenRouterException(resObj) ) {
		return resObj;
	}

	// At this point all routes are assumed to have failed
	// As such we will attempt to do a fallback to the default origin
	//----------------------------------------------------------------------

	// Origin fallback disabled, return last response, or a hard error
	if( configObj.disableOriginFallback ) {
		// No response object returned by routes : assume no valid routes
		if( resObj == null ) {
			return setupResponseError("NO_VALID_ROUTE", "No valid route found in config");
		}

		// Else return the last failed route response
		return resObj;
	}

	// Lets fetch the cloudflare origin request, log it, and return its result instead
	resObj = await fetch(inReq);
	fetchEvent.waitUntil( logRequestWithConfigArray( configObj.log, inReq, resObj, "ORIGIN_FALLBACK", -1) );
	return resObj;
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
	 * @param inConfig for configuring KittenRouter
	 */
	constructor(inConfig) {
		this.config = inConfig || {}; // fallback for blank object (make certain things easier)
	}

	/**
	 * Request handling function, and routing
	 * 
	 * @param  fetchEvent from cloudflare to process
	 * 
	 * @return response object for cloudflare
	 */
	async handleFetchEvent(fetchEvent) {
		return await processFetchEvent(this.config, fetchEvent);
	}
}

// Export out the KittenRouter class, if possible
// Skipped if used directly in cloudflare worker
module.exports = KittenRouter;

//---------------------------------------------------------------------------------------------
//
// Quick and dirty sample implementation (for cloudflare debugging)
//
//---------------------------------------------------------------------------------------------

/*
//
// If module does not exist, this is probably a cloudflare debugging session
// Lets do this =)
//
if( this.module == null ) {
	// KittenRouter setup
	const router = new KittenRouter({

	 // logging endpoint to use
	 log : [
		{
		  // Currently only elasticsearch is supported, scoped here for future alternatives
		  // One possible option is google analytics endpoint
		  type : "elasticsearch",

			//
			// Elasticsearch index endpoint 
			//
		  url : "https://inboxkitten.logging.com/",

			//
			// Authorization header (if needed)
			//
			basicAuthToken : "elasticsearch:password",

			//
			// Index prefix for storing data, this is before the "YYYY.MM" is attached
			//
			indexPrefix : "test-data-",

			// Enable logging of the full ipv4/6
			//
			// Else it mask (by default) the last digit of IPv4 address
			// or the "network" routing for IPv6
			// see : https://www.haproxy.com/blog/ip-masking-in-haproxy/
			logTrueIP : false,

			// @TODO support
			// Additional cookies to log
			//
			// Be careful not to log "sensitive" cookies, that can compromise security
			// typically this would be seesion keys.
			// cookies : ["__cfduid", "_ga", "_gid", "account_id"]
		}
	 ],

		route: [
			"commonshost.inboxkitten.com",
			"firebase.inboxkitten.com"
		]
	});

	// Cloudflare fetch result handling
	addEventListener('fetch', event => {
		event.respondWith(router.handleFetchEvent(event))
	});
}
*/