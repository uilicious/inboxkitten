
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
		// Initialize the variables
		let prefix, key;
			
		// Lets check for newer key format
		if( mailKey.length > 37 ) {
			// Handle newer key format
			let pt = fullKey.lastIndexOf("-", fullKey.length - 36);
			prefix = fullKey.slice(0,pt);
			key = fullKey.slice(pt+1);
		} else {
			// Fallback to original logic
			let pt = fullKey.lastIndexOf("-");
			prefix = fullKey.slice(0,pt);
			key = fullKey.slice(pt+1);
		}
		
        // slice the mailgunApi to include the region
        let apiUrl = "https://api.mailgun.net/v3"
        apiUrl = apiUrl.replace("://", "://"+prefix+".")
        let urlWithParams = apiUrl+"/domains/" + config.emailDomain + "/messages/"+key;
		const response = await fetchGet(urlWithParams, _authOption);

        let emailDetails = {}

        // Format and extract the name of the user
        let [name, ...rest] = formatName(response.from)
        emailDetails.name = name

        // Extract the rest of the email domain after splitting
        if (rest[0].length > 0) {
            emailDetails.emailAddress = ' <' + rest
        }

        // Extract the subject of the response
        emailDetails.subject = response.subject

        // Extract the recipients
        emailDetails.recipients = response.recipients

		let responseInit = {
			headers: {
				"Content-Type": "application/json"
			}
		}
		return new Response(JSON.stringify(emailDetails), responseInit)
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
let fetchGet = function(urlWithParams, options){
	return new Promise(function(resolve, reject){
		fetch(urlWithParams, options).then(response => {
			resolve(response.json())
		}).catch(e => {
			reject(e)
		})
	})
}

function formatName (sender) {
	let [name, ...rest] = sender.split(' <')
	return [name, rest]
}
