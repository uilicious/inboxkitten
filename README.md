# Cute disposible email - served by a kitten

[![Build Status](https://travis-ci.org/uilicious/inboxkitten.svg?branch=master)](https://travis-ci.org/uilicious/inboxkitten)

Inboxkitten is an open-source disposable email service that you can freely deploy adopt on your own!

Follow the 5 steps guide below to get started!

- [Step 0 - Clone Me](https://github.com/uilicious/inboxkitten#clone-me)
- [Step 1 - Mailgun & Firebase signup](https://github.com/uilicious/inboxkitten#mailgun-firebase-signup)
- [Step 2 - Configuration](https://github.com/uilicious/inboxkitten#configuration)
- [Step 3 - Build the package](https://github.com/uilicious/inboxkitten#build)
- [Step 4 - Deployment](https://github.com/uilicious/inboxkitten#deploy)

# Firebase Deployment Guide

## [Step 0 - Clone Me](#clone-me)

```
	$ git clone https://github.com/uilicious/inboxkitten.git
```

## [Step 1 - Mailgun & Firebase signup](#mailgun-firebase-signup)

### Mailgun
To sign up for a Mailgun account, go to the [signup](https://signup.mailgun.com/new/signup) page.

#### Custom Domain
```
	1. Click on `Add New Domain` button under your Domains panel. 
	2. Follow the steps accordingly
```
If not, you can use the default domain that was provided by Mailgun.

#### Routes Configuration
After setting up your domain, in order for you to receive email, you have to configure the routes. [Routes](https://documentation.mailgun.com/en/latest/quickstart-receiving.html) act as rules that will filter through all the incoming mails and execute actions on matched conditions.

In your Routes panel, simply click on `Create Route` button and follow the steps accordingly.

<img src="./assets/mailgun_create_route.png" alt="Mailgun Route" width="600px"/>

The above route will match all names ending with `@inboxkitten.com`, store them in the storage that mailgun provides (only for 3 days) and stop processing any other rules once this route is matched. 

#### Mailgun API Key
You can locate your Mailgun API key by clicking on the domain that you are managing. In it you can see your API key.

<img src="./assets/mailgun_api_key.png" alt="Mailgun API key" width="500px"/>

Or you can go to the security settings and locate the API key there.

<img src="./assets/mailgun_api_key_2.png" alt="Mailgun API key" width="500px"/>


### Firebase

1. Go to [Firebase](https://firebase.google.com) and click on `Get Started`.
2. Sign in with your favorite Google account.
3. Click on `Add Project` and create your own firebase inboxkitten project.
4. Remember the project ID  

On your local machine where your InboxKitten is located at,
```
	# Go to the root folder of InboxKitten
	$ cd <the place where you clone your inboxkitten>
	
	# Ensure that firebase CLI tool is installed
	$ npm install -g firebase-tools
	
	# Login to your firebase account
	$ firebase login
	
	# Set your firebase project
	$ firebase use --add <project name that you remembered>
```


## [Step 2 - Configuration](#configuration)

In the root directory of Inboxkitten, run the following command
```
	$ ./config.sh
```

During the run time of `./config.sh`, there are three environment variables that is being used to set the configuration for your configuration files.

1. `MAILGUN_EMAIL_DOMAIN` - any custom domain that you owned or the default domain in Mailgun
2. `WEBSITE_DOMAIN`  - any custom domain that you owned. If you use your default firebase url, it will be `<Your project>.firebaseapp.com`
3. `MAILGUN_API_KEY` - retrieve the api key from your Mailgun account

<img src="./assets/configuration.png" alt="configuration" width="500px"/>

## [Step 3 - Build the package](#build)

```
	$ ./build.sh
```

`./build.sh` will package the three components to be ready for deployment.


## [Step 4 - Deployment](#deploy)

```
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
