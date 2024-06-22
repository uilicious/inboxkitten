/**
 * CORS Options handling for cloudflare api
 */
const config = require("../../config/mailgunConfig")

const corsHeaders = {
	"Access-Control-Allow-Origin": config.corsOrigin,
	"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
	"Access-Control-Allow-Headers": "Content-Type",
}

module.exports = async function optionsHandler(request) {
	// Handle CORS pre-flight request.
	if (
		request.headers.get("Origin") !== null &&
		request.headers.get("Access-Control-Request-Method") !== null &&
		request.headers.get("Access-Control-Request-Headers") !== null
	) {
		return new Response(null, {
			headers: corsHeaders
		});
	} 

	// Handle standard OPTIONS request.
	return new Response(null, {
		headers: {
			"Allow": "GET, POST, OPTIONS",
		}
	});
}