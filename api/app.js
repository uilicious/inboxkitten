const express = require('express');
const cacheControl = require("./config/cacheControl");
const app = express();

// Setup the routes
const mailList = require("./src/api/mailList");
const mailGetInfo = require("./src/api/mailGetInfo");
const mailGetHtml = require("./src/api/mailGetHtml");

app.get("/api/v1/mail/list", (req, res) => {
    console.log("Received /api/v1/mail/list with parameters:", req.query);
    mailList(req, res);
});

app.get("/api/v1/mail/getInfo", (req, res) => {
    console.log("Received /api/v1/mail/getInfo with parameters:", req.query);
    mailGetInfo(req, res);
});

app.get("/api/v1/mail/getHtml", (req, res) => {
    console.log("Received /api/v1/mail/getHtml with parameters:", req.query);
    mailGetHtml(req, res);
});

// Static regex 
const staticRegex = /static\/(js|css|img)\/(.+)\.([a-zA-Z0-9]+)\.(css|js|png|gif)/g;

// Static folder hosting with cache control
app.use(express.static("public", {
    etag: true,
    setHeaders: function (res, path) {
        if (staticRegex.test(path)) {
            res.set('cache-control', cacheControl.immutable);
        } else {
            res.set('cache-control', cacheControl.static);
        }
    }
}));

// Custom 404 handling - use index.html
app.use(function (req, res) {
    res.set('cache-control', cacheControl.static);
    res.sendFile(__dirname + '/public/index.html');
});

// Setup the server
var server = app.listen(8000, function () {
    console.log("app running on port.", server.address().port);
});
