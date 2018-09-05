// Dependencies loading
const assert = require('assert');
const shortid = require('shortid');

// MailgunReader class
const mailgunReader = require("../src/mailgunReader");
const mailgunConfig = require("../config/mailgunConfig");

// MailgunReader instance
const reader = new mailgunReader(mailgunConfig);

// Does the test suite
describe('mailgunReader', function() {

	//
	// Testing for valid "404" errors
	//
	describe('blank-requests', function() {
		// when using a uuid (unless collision occured D=)
		it('should return empty event list', async () => {
			
			// Get the id to validate
			let id = shortid.generate();
			assert.notEqual(null, id);

			// Get the list of emails (as item)
			let eventListObj = await reader.recipientEventList(id+"@"+mailgunConfig.emailDomain);
			assert.notEqual(null, eventListObj);
			assert.equal(0, eventListObj.items );
		});
	});

	//
	// Testing the sending, listing and reading of emails
	//
	describe('send-list-recieve', function() {
		// Get the emails to send and recieve from
		let sender = shortid.generate()+"@"+mailgunConfig.emailDomain;
		let reciever = shortid.generate()+"@"+mailgunConfig.emailDomain;
		let emailContent = shortid.generate();

		// Sending of email
		it('sending-of-email', async () => {

			// Initialize the mailgun sender and its data
			let mailgunSender = require('mailgun-js')({apiKey: mailgunConfig.apiKey, domain: mailgunConfig.emailDomain});
			let data = {
				from : sender,
				to : reciever,
				subject : "Testing keys",
				text : emailContent
			}

			// Send the email in a promise
			let sendPromise = new Promise(function(good,bad) {
				mailgunSender.messages().send(data,function(error, body) {
					if( error ) {
						console.log(error);
						bad(error);
					} else {
						good(body);
					}
				});
			});

			// Wait for sending to complete
			let sendPromiseResult = await sendPromise;

		});
	});


});