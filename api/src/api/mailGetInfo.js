// Loading mailgun reader and config
const mailgunReader = require("../mailgunReader");
const mailgunConfig = require("../../config/mailgunConfig");
const cacheControl = require("../../config/cacheControl");
const reader = new mailgunReader(mailgunConfig);

/**
 * Validate the recipient parameter
 *
 * @param {String} recipient
 */
function validateRecipient(recipient) {
  // Remove leading/trailing whitespace
  recipient = recipient.trim();

  // Ensure recipient contains valid characters and ends with the correct domain
  const recipientRegex = /^[a-zA-Z0-9._-]+@akunlama\.com$/;
  if (!recipientRegex.test(recipient)) {
    throw new Error("Invalid recipient format");
  }

  return recipient;
}

/**
 * Get and return the static email header details from the mailgun API given the mailKey
 *
 * @param {*} req
 * @param {*} res
 */
module.exports = function (req, res) {
  let recipient = req.query.recipient;

  try {
    recipient = validateRecipient(recipient);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }

  reader.getKey({ recipient }).then(response => {
    let emailDetails = {};
    // Format and extract the name of the user
    let [name, ...rest] = formatName(response.from);
    emailDetails.name = name;
    // Extract the rest of the email domain after splitting
    if (rest[0].length > 0) {
      emailDetails.emailAddress = ' <' + rest;
    }
    // Extract the subject of the response
    emailDetails.subject = response.subject;
    // Extract the recipients
    emailDetails.recipients = response.recipients;
    // Return with cache control
    res.set('cache-control', cacheControl.static);
    res.status(200).send(emailDetails);
  })
    .catch(e => {
      console.error(`Error getting mail metadata info for ${recipient}: `, e);
      res.status(500).send({ error: 'Internal Server Error' });
    });
};

function formatName(sender) {
  let [name, ...rest] = sender.split(' <');
  return [name, rest];
}
