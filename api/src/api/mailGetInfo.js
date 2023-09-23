// Loading mailgun reader and config
const mailgunReader = require("../mailgunReader");
const mailgunConfig = require("../../config/mailgunConfig");
const cacheControl  = require("../../config/cacheControl");

const reader = new mailgunReader(mailgunConfig);

/**
 * Get and return the static email header details from the mailgun API given the mailKey
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

		// Return with cache control
		res.set('cache-control', cacheControl.static)
		res.status(200).send(emailDetails)
	})
	.catch(e => {
		console.error(`Error getting mail metadata info for /${region}/${key}: `, e)
		res.status(500).send("{error: '"+e+"'}")
	});
}

function formatName (sender) {
	let [name, ...rest] = sender.split(' <')
	return [name, rest]
}
