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

function formatName (sender) {
	let [name, ...rest] = sender.split(' <')
	return [name, rest]
}
