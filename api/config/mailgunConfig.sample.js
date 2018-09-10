//
// API key and valid mailgun domain supported (using sandbox)
//
module.exports = {
	"apiKey" : "${MAILGUN_API_KEY}",
	"emailDomain" : "${MAILGUN_EMAIL_DOMAIN}",
	"corsOrigin" : "https://${MAILGUN_EMAIL_DOMAIN}"
}
