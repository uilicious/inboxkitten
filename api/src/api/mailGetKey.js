// Loading mailgun reader and config
const mailgunReader = require("../mailgunReader");
const mailgunConfig = require("../../config/mailgunConfig");

const reader = new mailgunReader(mailgunConfig);

/**
 * Get and return the URL content from the mailgun API
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
		res.status(200).send(emailDetails)
	})
	.catch(e => {
		res.status(500).send("{error: '"+e+"'}")
	});
}

function formatName (sender) {
	let [name, ...rest] = sender.split(' <')
	return [name, rest]
}
