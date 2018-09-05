// Dependencies loading
const express = require("express");
const bodyParser = require("body-parser");

// Initializing the express app
const app = express();

// Setup JSON encoding
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup the server 
var server = app.listen(8800, function () {
	console.log("app running on port.", server.address().port);
});
