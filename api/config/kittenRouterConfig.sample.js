//
// Routing and logging options
//
module.exports = {

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
			basicAuthToken : "user:pass",

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
	],

	// Set to true to disable fallback to origin host 
	// when all routes fails
	disableOriginFallback : false,
}