# Cute disposible email - served by a kitten

[![Build Status](https://travis-ci.org/uilicious/inboxkitten.svg?branch=master)](https://travis-ci.org/uilicious/inboxkitten)

# Firebase Deployment Guide

## Step 1 - Mailgun & Firebase signup



## Step 2 - Configuration

In the root directory of Inboxkitten, run the following command
```
	$ ./config.sh
```

During the run time of `./config.sh`, there are three environment variables that is being used to set the configuration for your configuration files.

1. `MAILGUN_EMAIL_DOMAIN` - any custom domain that you owned or the default domain in Mailgun
2. `WEBSITE_DOMAIN`  - any custom domain that you owned
3. `MAILGUN_API_KEY` - retrieve the api key from your Mailgun account

 ![configuration](./assets/configuration.png)


## Step 3 - Build the package

```
	$ ./build.sh
```

`./build.sh` will package the three components to be ready for deployment.


## Step 4 - Deployment

Assuming that you have your Firebase configuration ready (if it is not ready, read here).

```
	# Ensure that firebase CLI tool is installed
	$ npm install -g firebase-tools
	
	# Login to your firebase account
	$ firebase login
	
	# Set your firebase project
	$ firebase use --add <project name you created in your firebase account>
	
	# Run the deployment script
	$ ./deploy/firebase/deploy.sh 
```

# Developing on localhost

After running the `./config.sh` you can follow the steps below to run Inboxkitten on your localhost.

## Running api

```
	# Assuming that you are on the root directory of Inboxkitten
	$ cd api
	
	# Start the server
	$ npm start
```

## Running ui
```
	# Assuming that you are on the root directory of Inboxkitten
	$ cd ui
	
	# If you do not have a http server, you can install one
	$ npm run dev
```

You can now access it on `http://localhost:8080` and enjoy your kitten-ventures.

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
	$ ./bin/inboxkitten -api http://localhost:8800/api/v1 (list|get) [params]             
```
To run without compilation of `inboxkitten.go` in the src/ folder
```
	$ ./go.sh run src/inboxkitten.go
```

