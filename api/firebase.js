/**
 * This is configured for use within firebase cloud function (or GCP cloud functions)
 * And will be automatically renamed into index.js by the build script
 * 
 * See : https://firebase.google.com/docs/functions/http-events
 */

// Dependencies loading
const functions = require('firebase-functions');
let app         = require("./src/app-setup");

// Setup the routes - for mail list / get
app.get("/api/v1/mail/list",   require("./src/api/mailList"));
app.get("/api/v1/mail/getKey", require("./src/api/mailGetKey"));
app.get("/api/v1/mail/getHtml", require("./src/api/mailGetHtml"));

// Expose the HTTP on request
exports.firebase_api_v1 = functions.https.onRequest(app);
