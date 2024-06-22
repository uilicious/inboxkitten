// AXIOS dependencies
const axios = require("axios");

/**
* Simple axois get, with response data
* @param {String} urlWithParams
* @param {Object} options
*/
var axiosGet = function(urlWithParams, options){
	return new Promise(function(resolve, reject){
		// console.log(urlWithParams);
		axios.get(urlWithParams, options).then(response => {
			resolve(response.data)
		}).catch(e => {
			// console.log(e);
			reject(e)
		})
	})
}

/**
* Simple MailgunApi accessor class for reading event stream, and saved emails
*
* Example usage
* ```
* let reader = new mailgunReader( { apiKey:"api-*****", emailDomain:"inboxkitten.com" })
*
* // Returns a list of email recieve events
* reader.recipientEventList("some-domain.inboxkitten.com");
*
* // Get and return the email json
* reader.getRecipentEmail("some-email-id");
* ```
*/
let mailgunReader = function mailgunReader(config) {

	// The config object being used
	this._config = config;

	// Validate the config for required parameters
	if( this._config.apiKey == null || this._config.apiKey.length <= 0 ) {
		throw new Error("Missing config.apiKey");
	}
	if( this._config.emailDomain == null || this._config.emailDomain.length <= 0 ) {
		throw new Error("Missing config.emailDomain");
	}

	// Default mailgun domain if not used
	this._config.mailgunApi = this._config.mailgunApi || "https://api.mailgun.net/v3";

	// Setup the authentication option object
	this._authOption = {
		auth: {
			username : "api",
			password : this._config.apiKey
		}
	};
}

/**
 * Validate the request email against list of domains
 *
 * @param {String} email
 */
mailgunReader.prototype.recipientEmailValidation = function recipientEmailValidation(email) {
	// @TODO - the validation
	return true;
}

/**
 * Get and return a list of email events
 *
 * See : https://documentation.mailgun.com/en/latest/api-events.html#event-structure
 *
 * @param {String} email
 *
 * @return  Promise object, returning list of email events
 */
mailgunReader.prototype.recipientEventList = function recipientEventList(email) {
	// Validate email format
	if( !this.recipientEmailValidation(email) ) {
		return Promise.reject("Invalid email format : "+email);
	}

	// Compute the listing url
	let urlWithParams = this._config.mailgunApi+"/"+this._config.emailDomain+"/events?recipient="+email;

	// Lets get and return it with a promise
	return axiosGet(urlWithParams, this._authOption);
}

/**
 * Validate the url parameter for a valid mailgun api URL.
 * This is to safeguard the getURL from api key leakage
 *
 * @param {String} url
 */
mailgunReader.prototype.getUrlValidation = function getUrlValidation(email) {
	// @TODO - the validation
	return true;
}

/**
 * Get the content of URL and return it, using the mailgun key.
 * This is useful for stored emails returned by the event stream.
 *
 * @param {String} url
 */
mailgunReader.prototype.getUrl = function getUrl(url) {
	// Validate the URL
	if( !this.getUrlValidation(url) ) {
		return Promise.reject("Invalid getUrl request : "+url);
	}

	// Lets get and return it with a promise
	return axiosGet(url, this._authOption);
}

/**
 * Get the content of URL and return it, using the mailgun key.
 * This is useful for stored emails returned by the event stream.
 *
 * @param {String} url
 */
mailgunReader.prototype.getKey = function getKey({region, key}) {

	// Inject the region to the mailgunApi
	let apiUrl = this._config.mailgunApi
	apiUrl = apiUrl.replace("://", "://storage-" + region + ".")
	let urlWithParams = apiUrl + "/domains/" + this._config.emailDomain + "/messages/" + key;
	
	// Lets get and return it with a promise
	return axiosGet(urlWithParams, this._authOption);
}

// Export the mailgunReader class
module.exports = mailgunReader;

/**
 * Validate the email format and ensure it contains only allowed characters
 *
 * @param {String} email
 */
mailgunReader.prototype.validateEmail = function validateEmail(email) {
  // Remove leading/trailing whitespace
  email = email.trim();

  // Validate that the email contains only allowed characters
  const allowedCharacters = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/;
  if (!allowedCharacters.test(email)) {
    throw new Error("Invalid email format");
  }

  return email;
};
