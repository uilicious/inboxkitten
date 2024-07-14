// Loading mailgun reader and config
const mailgunReader = require("../mailgunReader");
const mailgunConfig = require("../../config/mailgunConfig");
const cacheControl  = require("../../config/cacheControl");

const reader = new mailgunReader(mailgunConfig);

/**
 * Mail listing API, returns the list of emails
 *
 * @param {*} req
 * @param {*} res
 */
module.exports = function(req, res) {
    let params = req.query;

    // recipient may be:
    // only the username, e.g. "john.doe"
    // or the full email, e.g. "john.doe@domain.com"
    let recipient = params.recipient;

    // Check if recipient is empty
    if (!recipient) {
        return res.status(400).send({ error: "No valid `recipient` param found" });
    }

    // Trim leading and trailing whitespace
    recipient = recipient.trim();

    // If recipient ends with `"@"+mailgunConfig.emailDomain`, remove it
    let pos = recipient.indexOf("@" + mailgunConfig.emailDomain);
    if (pos >= 0) {
        recipient = recipient.substring(0, pos);
    }

    // Validate recipient
    try {
        recipient = validateUsername(recipient);
    } catch (e) {
        return res.status(400).send({ error: "Invalid email" });
    }

    // Empty check
    if (!recipient) {
        return res.status(400).send({ error: "No valid `recipient` param found" });
    }

    reader.recipientEventList(recipient + "@" + mailgunConfig.emailDomain)
        .then(response => {
            res.set('cache-control', cacheControl.dynamic);
            res.status(200).send(response.items);
        })
        .catch(e => {
            console.error(`Error getting list of messages for "${recipient}":`, e);
            res.status(500).send({ error: e.toString() });
        });
};

/**
 * Strictly validate username, rejecting any username that does not conform to the standards
 * @param {*} username username to be validated
 * @returns {string} Validated username
 */
function validateUsername(username) {

    // Step 1: Trim leading and trailing whitespaces
    username = username.trim();

    // Step 2: Throw error if the sanitized string is empty
    if (username.length === 0) {
        throw new Error("Invalid email.");
    }

    // Step 3: Check for disallowed characters
    // Allowed characters: alphanumeric, dot (.), underscore (_), hyphen (-), plus (+)
    const disallowedChars = /[^a-zA-Z0-9._+-]/g;
    if (disallowedChars.test(username)) {
        throw new Error("Invalid email.");
    }

    // Step 4: Ensure that the username does not only contains symbols, but at least one alphanumeric character
    if (!/[a-zA-Z0-9]/.test(username)) {
        throw new Error("Invalid email.");
    }

    // Step 5: Check for consecutive dots
    if (/\.{2,}/.test(username)) {
        throw new Error("Invalid email.");
    }

    // Step 6: Ensure that the username starts and end with an alphanumeric character instead of a symbol
    if (/^[._+-]/.test(username) || /[._+-]$/.test(username)) {
        throw new Error("Invalid email.");
    }

    // Step 7A: Pure numeric usernames are disallowed
    if ((/^[0-9]*$/.test(username)) == true) {
        throw new Error("Invalid email.");
    }

    // Step 7B: Ensure that the username starts or end with an alphabetical character
    // This mitigate numeric iterations
    if (!(/^[a-zA-Z]/.test(username) || /[a-zA-Z]$/.test(username))) {
        throw new Error("Invalid email.");
    }

    return username;
}
