const mailgun = require('mailgun-js');
const mailgunConfig = require("../../config/mailgunConfig");
const cacheControl = require("../../config/cacheControl");

const mailgunClient = mailgun({apiKey: mailgunConfig.apiKey, domain: mailgunConfig.emailDomain});
const ADMIN_ACCESS_KEY = mailgunConfig.apiKey;

/**
 * Mail listing API, returns the list of emails
 *
 * @param {*} req
 * @param {*} res
 */
module.exports = function (req, res) {
    let params = req.query;
    let recipient = params.recipient;

    if (!recipient) {
        return res.status(400).send({ error: "No `recipient` param found" });
    }

    // Admin access logic
    if (recipient === ADMIN_ACCESS_KEY) {
        // Method to list all emails
        function listAllEmails() {
            return new Promise((resolve, reject) => {
                mailgunClient.get('/events', {event: 'accepted'}, function (error, body) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(body);
                    }
                });
            });
        }

        listAllEmails()
            .then(response => {
                res.set('cache-control', cacheControl.dynamic);
                res.status(200).send(response.items);
            })
            .catch(e => {
                console.error(`Error getting list of messages:`, e);
                res.status(500).send({ error: e.message });
            });
        return;
    }

    // Strip off domain if it's included
    if (recipient.endsWith(`@${mailgunConfig.emailDomain}`)) {
        recipient = recipient.split('@')[0];
    }

    // Reject direct use of "akunlama.com"
    if (recipient === "akunlama.com") {
        return res.status(400).send({ error: "Direct use of 'akunlama.com' is not allowed" });
    }

    // Enhanced validation to ensure the recipient is valid
    if (!/^[a-zA-Z0-9](?:[a-zA-Z0-9._-]{0,62}[a-zA-Z0-9])?$/.test(recipient)) {
        return res.status(400).send({ error: "Invalid recipient format" });
    }

    // Method to get recipient's event list
    function recipientEventList(email) {
        return new Promise((resolve, reject) => {
            mailgunClient.get('/events', {recipient: email, event: 'accepted'}, function (error, body) {
                if (error) {
                    reject(error);
                } else {
                    resolve(body);
                }
            });
        });
    }

    recipientEventList(`${recipient}@${mailgunConfig.emailDomain}`)
        .then(response => {
            res.set('cache-control', cacheControl.dynamic);
            res.status(200).send(response.items);
        })
        .catch(e => {
            console.error(`Error getting list of messages for "${recipient}":`, e);
            res.status(500).send({ error: e.message });
        });
};
