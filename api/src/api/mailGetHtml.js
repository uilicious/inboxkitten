// Loading mailgun reader and config
const mailgunReader = require("../mailgunReader");
const mailgunConfig = require("../../config/mailgunConfig");
const cacheControl  = require("../../config/cacheControl");

const reader = new mailgunReader(mailgunConfig);

/**
 * Get and return the etatic email HTML content from the mailgun API, given the mailKey
 *
 * @param {*} req
 * @param {*} res
 */
module.exports = function(req, res){
	let params = req.query
	let mailKey = params.mailKey
	if (mailKey == null || mailKey === ""){
		res.status(400).send('{ "error" : "No `mailKey` param found" }');
	}

	reader.getKey(mailKey).then(response => {
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

		res.set('cache-control', cacheControl.static)
		res.status(200).send(body)
	})
	.catch(e => {
		res.status(500).send("{error: '"+e+"'}")
	});
}
