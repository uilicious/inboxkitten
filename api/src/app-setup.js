
// Dependencies loading
const express       = require("express");
const bodyParser    = require("body-parser");
const mailgunConfig = require("../config/mailgunConfig");

// Initializing the express app
const app = express();

// Allow cross site requests (for now)
app.use(function (req, res, next){
	res.setHeader("Access-Control-Allow-Origin", mailgunConfig.corsOrigin);
	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);

	// Pass to next layer of middleware
	next();
});

// Static folder hosting
app.use( express.static("public") )

// Setup JSON encoding
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Export the app module, for actual server deployment (on X)
module.exports = app;
