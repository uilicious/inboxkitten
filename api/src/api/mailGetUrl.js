// Loading mailgun reader and config
const mailgunReader = require("../mailgunReader");
const mailgunConfig = require("../../config/mailgunConfig");
const cacheControl  = require("../../config/cacheControl");

const reader = new mailgunReader(mailgunConfig);

/**
 * Get and return the URL link from the mailgun API - for the mail gcontent
 * 
 * NOTE - this is to be deprecated
 *
 * @param {*} req
 * @param {*} res
 */
module.exports = function(req, res){
	let params = req.query
	let url = params.url
	if (url == null || url === ""){
		 res.status(400).send('{ "error" : "No `url` param found" }');
	}

	reader.getUrl(url).then(response => {
		res.set('cache-control', cacheControl.static)
		res.status(200).send(response)
	})
	.catch(e => {
		console.error("Error: ", error)
		res.status(500).send("{error: '"+e+"'}")
	});
}
