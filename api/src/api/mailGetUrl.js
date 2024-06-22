// Loading mailgun reader and config
const mailgunReader = require("../mailgunReader");
const mailgunConfig = require("../../config/mailgunConfig");
const cacheControl = require("../../config/cacheControl");

const reader = new mailgunReader(mailgunConfig);

/**
 * Validate the URL parameter
 *
 * @param {String} url
 */
function validateUrl(url) {
  // Remove leading/trailing whitespace
  url = url.trim();

  // Ensure the URL is not empty
  if (url === '') {
    throw new Error("Invalid URL");
  }

  return url;
}

/**
 * Get and return the URL link from the mailgun API - for the mail content
 *
 * @param {*} req
 * @param {*} res
 */
module.exports = function (req, res) {
  let url = req.query.url;

  if (url == null || url === "") {
    return res.status(400).send('{ "error" : "No `url` param found" }');
  }

  try {
    url = validateUrl(url);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }

  reader.getUrl(url).then(response => {
    res.set('cache-control', cacheControl.static);
    res.status(200).send(response);
  })
  .catch(e => {
    console.error("Error: ", e);
    res.status(500).send({ error: 'Internal Server Error' });
  });
};
