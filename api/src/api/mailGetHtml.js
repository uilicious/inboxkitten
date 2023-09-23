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

	let region = req.query.region
	let key = req.query.key
	
	if (region == null || region === ""){
		return res.status(400).send('{ "error" : "No `region` param found" }');
	}

	if (key == null || key === ""){
		return res.status(400).send('{ "error" : "No `key` param found" }');
	}

	reader.getKey({region, key}).then(response => {
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
		console.error(`Error getting mail HTML for /${region}/${key}: `, e)
		res.status(500).send("{error: '"+e+"'}")
	});
}
