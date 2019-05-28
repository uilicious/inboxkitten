/**
 * Making a curl request that looks like
 * curl -X POST --data 'key=world' example.com
 * or
 * curl -X POST --form 'key=world' example.com
 */
let config = require("../../config/mailgunConfig")

module.exports = async function(url) {
	let recipient = url.searchParams.get('recipient')
	if (recipient == null){
		return new Response("{error: 'No `recipient` param found'}",
			{ status: 400, statusText: 'INVALID_PARAMETER', headers: {
				"Content-Type": "application/json"
			} 
		});
	}

	// strip off all @domain if there is any
	if(recipient.indexOf("@") >= 0){
		recipient = recipient.substring(0, recipient.indexOf("@"))
	}

	// Setup the authentication option object
	let authenticationKey = this.btoa("api:" + config.apiKey);

	let _authOption = {
		headers: {
			"Authorization" : "BASIC " + authenticationKey
		}
	};

	try {
		const postData = await fetchGet("https://api.mailgun.net/v3/" + config.emailDomain + "/events?recipient="+recipient+"@"+config.emailDomain, _authOption);
		let responseInit = {
			headers: {
				"Content-Type": "application/json"
			}
		}
		return new Response(JSON.stringify(postData.items), responseInit)
	} catch (err) {
		return new Response("{error: '"+err+"'}",
			{ status: 400, statusText: 'INVALID_PARAMETER', headers: {
				"Content-Type": "application/json"
			} 
		});
	}
}


/**
* Simple fetch get, with response data
* @param {String} urlWithParams
* @param {Object} options
*/
var fetchGet = function(urlWithParams, options){
	return new Promise(function(resolve, reject){
		fetch(urlWithParams, options).then(response => {
			resolve(response.json())
		}).catch(e => {
			reject(e)
		})
	})
}
