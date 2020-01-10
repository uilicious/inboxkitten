// app package loading
let app = require("./src/app-setup");

// Setup the routes
app.get("/api/v1/mail/list",   require("./src/api/mailList"));
app.get("/api/v1/mail/getKey", require("./src/api/mailGetKey"));
app.get("/api/v1/mail/getHtml", require("./src/api/mailGetHtml"));

// Static folder hosting
app.use( app.express.static("public") )

// Custom 404 handling - use index.html
app.use(function(req, res) {
	res.sendFile(__dirname + '/public/index.html');
});

// Setup the server
var server = app.listen(8000, function () {
	console.log("app running on port.", server.address().port);
});
