/**
 * Making a curl request that looks like
 * curl -X POST --data 'key=world' example.com
 * or
 * curl -X POST --form 'key=world' example.com
 */

let config = require("../../config/mailgunConfig")

module.exports = async function(url) {
    let mailKey = url.searchParams.get('mailKey')
	if (mailKey == null || mailKey === ""){

		return new Response("{error: 'No `mailKey` param found'}",
			{ status: 400, statusText: 'INVALID_PARAMETER', headers: {
				"Content-Type": "application/json"
			} 
		});
	}

	// Setup the authentication option object
    let authenticationKey = this.btoa("api:" + config.apiKey);

	let _authOption = {
		headers: {
			"Authorization" : "BASIC " + authenticationKey
		}
	};

	try {
		let prefix = mailKey.slice(0,2)
		let key = mailKey.slice(3)
		
        // slice the mailgunApi to include the region
        let apiUrl = "https://api.mailgun.net/v3"
        apiUrl = apiUrl.replace("://", "://"+prefix+".")
        let urlWithParams = apiUrl+"/domains/" + config.emailDomain + "/messages/"+key;
        const response = await fetchGet(urlWithParams, _authOption);
        
        let body = response["body-html"] || response["body-plain"]
		if( body === undefined || body == null) {
			body = 'The kittens found no messages :('
		}

		// Add JS injection to force all links to open as a new tab
		// instead of opening inside the iframe
		body += '<script>' +
			'let linkArray = document.getElementsByTagName("a");' +
			'for (let i=0; i<linkArray.length; ++i) { linkArray[i].target="_blank"; }' +
			// eslint-disable-next-line
			'<\/script>'

		let responseInit = {
			headers: {
				"Content-Type": "text/html"
				//@TODO : Consider caching here?
			}
		}
		return new Response(body, responseInit)
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
