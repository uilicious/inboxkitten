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
    let mailKey = myURL.searchParams.get('mailKey')
	if (mailKey == null || mailKey === ""){
		return new Response('Missing parameter - `mailKey`',
			{ status: 400, statusText: 'No `mailKey` param found' });
	}

	// Setup the authentication option object
    let authenticationKey = this.btoa("api:${MAILGUN_API_KEY}");

	let _authOption = {
		headers: {
			"Authorization" : "BASIC "+authenticationKey
		}
	};

	try {
        let [prefix, key, ...remainder] = mailKey.split("-")
        // slice the mailgunApi to include the region
        let apiUrl = "https://api.mailgun.net/v3"
        apiUrl = apiUrl.replace("://", "://"+prefix+".")
        let urlWithParams = apiUrl+"/domains/${MAILGUN_EMAIL_DOMAIN}/messages/"+key;
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
				"Content-Type": "application/json"
			}
		}
		return new Response(body, responseInit)
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
