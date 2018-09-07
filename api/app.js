// app package loading
let app = require("./src/app-setup");

// Setup the routes
app.get("/api/v1/mail/list",   require("./src/api/mailList"));
app.get("/api/v1/mail/getKey", require("./src/api/mailGetKey"));

// Setup the server
var server = app.listen(8800, function () {
	console.log("app running on port.", server.address().port);
});
