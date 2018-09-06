// Loading mailgun reader and config
const mailgunReader = require("../mailgunReader");
const mailgunConfig = require("../config/mailgunConfig")

const reader = new mailgunReader(mailgunConfig);

/**
 * Get and return the URL content from the mailgun API
 * 
 * @param {*} req 
 * @param {*} res 
 */
module.exports = function(req, res){
	let params = req.body
	let url = params.url
	if (url == null || url === ""){
		 res.status(400).send("No `url` param found.")
	}

	reader.getUrl(recipient).then(response => {
		 res.status(200).send(response.items)
	})
	.catch(e => {
		 res.status(500).send(e)
	});
}
