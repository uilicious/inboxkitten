
// Dependencies loading
const express       = require("express");
const bodyParser    = require("body-parser");
const cors          = require('cors');
const mailgunConfig = require("../config/mailgunConfig");

// Initializing the express app
const app = express();

// Allow cross site requests (for now)
app.use(cors());

// Setup JSON encoding
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Add an easy way to get the express module
app.express = express;

// Export the app module, for actual server deployment (on X)
module.exports = app;
