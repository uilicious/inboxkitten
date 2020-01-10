# Developing on localhost / Custom deployment

Note: You will still need to do the mail gun setup in the firebase guide.

Instead of running `./config.sh`, you should setup the config files respectively for the deployment.

## Running the api server

**Configuring : api/config/mailgunConfig.js**

```
module.exports = {
	"apiKey" : "<MAILGUN_API_KEY>",
	"emailDomain" : "<MAILGUN_EMAIL_DOMAIN>",
	"corsOrigin" : "http://localhost:8000"
}
```

+ MAILGUN_API_KEY : Mailgun private api key
+ MAILGUN_EMAIL_DOMAIN : domain for mailgun 
+ UI_HOST : Url to the UI domain. `http://localhost:8000` is the default for the UI `npm run dev`, 

**Running the express.js API server**

```
	# Assuming that you are on the root directory of Inboxkitten
	$ cd api
	
	# Start the server
	$ npm start
```

Validate your API server is online at `http://localhost:8000/api/v1/mail/list?recipient=hello-world`

You should see an empty array representing an empty inbox.

## Running the ui server - in development mode

**Configuring ui/config/apiconfig.js**
```
export default {
	apiUrl: 'http://localhost:8000/api/v1/mail',
	domain: '<MAILGUN_EMAIL_DOMAIN>'
}
```

+ apiUrl : Api server to point to, `localhost:8000` is the default for the api server `npm start`
+ MAILGUN_EMAIL_DOMAIN : domain for mailgun 

**Running the nodejs+webpack UI server**

```
	# Assuming that you are on the root directory of Inboxkitten
	$ cd ui
	
	# If you do not have a http server, you can install one
	$ npm run dev
```

You can now access it on `http://localhost:8000` and enjoy your kitten-ventures.

## Running cli

This is built using the `./build.sh` script

```
	# Assuming that you are on the root directory of Inboxkitten
	$ cd cli
	
	# You can immediately execute the executable
	$ ./bin/inboxkitten
	
	# Retrieving list of email
	$ ./bin/inboxkitten list exampleEmailName
	
	# Retrieving individual email
	$ ./bin/inboxkitten get sw eyJwIjpmYWxzZSwiayI6IjI3YzVkNmZkLTk5ZjQtNGY5MC1iYTM4LThiNDBhNTJmNzA1OCIsInMiOiI0NzFhZjYxYjA4IiwiYyI6InRhbmtiIn0=
	
	# Target different api endpoint
	$ ./bin/inboxkitten -api http://localhost:8000/api/v1 (list|get) [params]             
```
To run without compilation of `inboxkitten.go` in the src/ folder
```
	$ ./go.sh run src/inboxkitten.go
```

## Calling the API using curl
If you have your API running on port `8000`,
```
	# Get list of email
	$ curl localhost:8000/api/v1/mail/list\?recipient=hard-dust-64

	# Get individual email
	$ curl localhost:8000/api/v1/mail/list\?mailKey=se-eyJwIjpmYWxzZSwiayI6ImVlMWNiMTAzLWZhZjMtNDg3Ni04MjI2LWE1YmE1ZTU3YzMxMiIsInMiOiI3NTdhNTY5ZGFkIiwiYyI6InRhbmtiIn0=
```

If you have it hosted on the net, change the endpoint to where you have hosted it on :)