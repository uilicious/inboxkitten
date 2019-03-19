addEventListener('fetch', event => {
	event.respondWith(fetchAndApply(event.request))
})

/**
 * Making a curl request that looks like
 * curl -X POST --data 'key=world' example.com
 * or
 * curl -X POST --form 'key=world' example.com
 */
async function fetchAndApply(request) {
	const myURL = new URL(request.url);
	let recipient = myURL.searchParams.get('recipient')

	if (recipient == null){
		return new Response('Missing parameter - `recipient`',
			{ status: 400, statusText: 'No `recipient` param found' });
	}

	// strip off all @domain if there is any
	if(recipient.indexOf("@") >= 0){
		recipient = recipient.substring(0, recipient.indexOf("@"))
	}

	// Setup the authentication option object
    let authenticationKey = this.btoa("api:${MAILGUN_API_KEY}");

	let _authOption = {
		headers: {
			"Authorization" : "BASIC "+authenticationKey
		}
	};

	try {
		const postData = await fetchGet("https://api.mailgun.net/v3/${MAILGUN_EMAIL_DOMAIN}/events?recipient="+recipient+"@${MAILGUN_EMAIL_DOMAIN}", _authOption);
		let responseInit = {
			headers: {
				"Content-Type": "application/json"
			}
		}
		return new Response(JSON.stringify(postData.items), responseInit)
	} catch (err) {
		return new Response(err)
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
