// Dependencies loading
const assert  = require('assert');
const delay   = require('delay');
const md5     = require('md5');
const uuidv4  = require('uuid/v4');
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
	describe('empty-guid-inbox-requests', function() {
		// when using a uuid (unless collision occured D=)
		it('should return empty event list', async () => {
			
			// Get the id to validate
			let id = md5(uuidv4());
			assert.notEqual(id, null);

			// Get the list of emails (as item)
			let eventListObj = await reader.recipientEventList(id+"@"+mailgunConfig.emailDomain);
			assert.notEqual(eventListObj, null);
			assert.equal( eventListObj.items.length , 0);
		});
	});

	//
	// Testing the sending, listing and reading of emails
	//
	describe('send-list-recieve', function() {
		// Get the emails to send and recieve from
		let sender = md5(uuidv4())+"@"+mailgunConfig.emailDomain;
		let reciever = md5(uuidv4())+"@"+mailgunConfig.emailDomain;
		let emailContent = md5(uuidv4());

		// Test timeout to use
		let thirtySeconds = 30 * 1000;

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
		}).timeout(thirtySeconds);

		// The email event to use
		let emailEvent = null;

		// Listing of email
		it('listing-of-email', async () => {

			// Loop and get email event (there might be significant time delay)
			while(emailEvent == null) {
				// Lets not spam
				await delay(2500);

				// Get the list of emails (as item)
				let eventListObj = await reader.recipientEventList(reciever);
				assert.notEqual(eventListObj, null);

				// Continue loop if length is 0
				if( eventListObj.items.length == 0 ) {
					continue;
				}

				// Get the email event
				//assert.equal(eventListObj.items.length, 1);
				emailEvent = eventListObj.items[0];
				assert.notEqual(emailEvent, null);
			}

		}).timeout(thirtySeconds * 5);

		// Listing of email
		it('reading-of-email', async () => {
			assert.notEqual(emailEvent, null);

			// Get the email URL
			let emailUrl = emailEvent.storage.url;
			assert.notEqual(emailUrl, null);
			
			// Lets get the email content
			let content = await reader.getUrl(emailUrl);
			assert.notEqual(content, null);
			
			// Assert content exists with GUID, 
			// which is definitive proof that the test work,
			// unless multiple suns started exploding
			assert.equal( content["stripped-html"].indexOf(emailContent) >= 0, true );
		});
	});


});