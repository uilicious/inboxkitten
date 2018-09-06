// Dependencies loading
const express       = require("express");
const bodyParser    = require("body-parser");
const mailgunConfig = require("./config/mailgunConfig");

// Initializing the express app
const app = express();

// Setup JSON encoding
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Allow cross site requests (for now)
app.use(function (req, res, next){
	res.setHeader("Access-Control-Allow-Origin", mailgunConfig.emailDomain);
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

// Setup the routes
app.get("/api/v1/mail/list",   require("./src/api/mailList"));
app.get("/api/v1/mail/getUrl", require("./src/api/mailGetUrl"));

// Setup the server 
var server = app.listen(8800, function () {
	console.log("app running on port.", server.address().port);
});
