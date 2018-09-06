// Loading mailgun reader and config
const mailgunReader = require("../mailgunReader");
const mailgunConfig = require("../config/mailgunConfig")

const reader = new mailgunReader(mailgunConfig);

/**
 * Mail listing api, returns the item list
 * 
 * @param {*} req 
 * @param {*} res 
 */
module.exports = function(req, res){
	let params = req.body
	let recipient = params.recipient
	if (recipient == null){
		 res.status(400).send("No `recipient` param found.")
	}

	recipientEventList(recipient).then(response => {
		 res.status(200).send(response.items)
	})
	.catch(e => {
		 res.status(500).send(e)
	})

}
