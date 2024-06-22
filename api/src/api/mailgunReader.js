/ api/src/mailgunReader.js

class MailgunReader {
    constructor(config) {
        this.config = config;
        this.mailgun = require('mailgun-js')({apiKey: config.apiKey, domain: config.emailDomain});
    }

    listAllEmails() {
        return new Promise((resolve, reject) => {
            this.mailgun.events().list({event: 'accepted'}, function (error, body) {
                if (error) {
                    reject(error);
                } else {
                    resolve(body);
                }
            });
        });
    }

    // Other methods
}

module.exports = MailgunReader;
