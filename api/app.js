// Cache control settings
const cacheControl = require("./config/cacheControl");

// app package loading
let app = require("./src/app-setup");

// Setup the routes
app.get("/api/v1/mail/list",    require("./src/api/mailList"));
app.get("/api/v1/mail/getInfo", require("./src/api/mailGetInfo"));
app.get("/api/v1/mail/getHtml", require("./src/api/mailGetHtml"));

// Legacy fallback behaviour - 
// Note this is to be deprecated (after updating UI)
app.get("/api/v1/mail/getKey",  require("./src/api/mailGetInfo"));

// Static regex 
const staticRegex = /static\/(js|css|img)\/(.+)\.([a-zA-Z0-9]+)\.(css|js|png|gif)/g;

// Static folder hosting with cache control
// See express static options: https://expressjs.com/en/4x/api.html#express.static
app.use( app.express.static("public", {
	etag: true,
	setHeaders: function (res, path, stat) {
		if( staticRegex.test(path) ) {
			res.set('cache-control', cacheControl.immutable);
		} else {
			res.set('cache-control', cacheControl.static   );
		}
	}
}) )

// Custom 404 handling - use index.html
app.use(function(req, res) {
	res.set('cache-control', cacheControl.static)
	res.sendFile(__dirname + '/public/index.html');
});

// Setup the server
var server = app.listen(8000, function () {
	console.log("app running on port.", server.address().port);
});
