# Cute disposible email - served by a kitten

[![Build Status](https://travis-ci.org/uilicious/inboxkitten.svg?branch=master)](https://travis-ci.org/uilicious/inboxkitten)

Inboxkitten is an open-source disposable email service that you can freely deploy adopt on your own!

Follow the 5 steps guide below to get started!

- [Step 0 - Clone Me](https://github.com/uilicious/inboxkitten#step-0---clone-me)
- [Step 1 - Mailgun & Firebase signup](https://github.com/uilicious/inboxkitten#step-1---mailgun--firebase-signup)
- [Step 2 - Configuration](https://github.com/uilicious/inboxkitten#step-2---configuration)
- [Step 3 - Build the package](https://github.com/uilicious/inboxkitten#step-3---build-the-package)
- [Step 4 - Deployment](https://github.com/uilicious/inboxkitten#step-4---deployment)

# Firebase Deployment Guide

## Step 0 - Clone Me

```
	$ git clone https://github.com/uilicious/inboxkitten.git
```

___

## Step 1 - Mailgun & Firebase signup

### Mailgun
To sign up for a Mailgun account, go to the <a href="https://signup.mailgun.com/new/signup" target="_blank">signup</a> page.

#### Custom Domain
```
	1. Click on `Add New Domain` button under your Domains panel. 
	2. Follow the steps accordingly
```
> You can use the default domain that was provided by Mailgun if you do not have your own domain.

#### Routes Configuration
After setting up your domain, in order for you to receive email, you have to configure the routes. <a href="https://documentation.mailgun.com/en/latest/quickstart-receiving.html" target="_blank">Routes</a> act as rules that will filter through all the incoming mails and execute actions on matched conditions.

In your Routes panel, simply click on `Create Route` button and follow the steps accordingly.

<img src="./assets/mailgun_create_route.png" alt="Mailgun Route" width="600px"/>

> The above route will match all names ending with `@inboxkitten.com`, store them in the storage that mailgun provides (only for 3 days) and stop processing any other rules once this route is matched. 

#### Mailgun API Key
You can locate your Mailgun API key by clicking on the domain that you are managing. In it you can see your API key.

<img src="./assets/mailgun_api_key.png" alt="Mailgun API key" width="500px"/>

Or you can go to the security settings and locate the API key there.

<img src="./assets/mailgun_api_key_2.png" alt="Mailgun API key" width="500px"/>

___

### Firebase

1. Go to <a href="https://firebase.google.com" target="_blank">Firebase</a> and click on `Get Started`.
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

___

## Step 2 - Configuration

In the root directory of Inboxkitten, run the following command
```
	$ ./config.sh
```

During the run time of `./config.sh`, there are three environment variables that is being used to set the configuration for your configuration files.

1. `MAILGUN_EMAIL_DOMAIN` - any custom domain that you owned or the default domain in Mailgun
2. `WEBSITE_DOMAIN`  - any custom domain that you owned. If you use your default firebase url, it will be `<Your project>.firebaseapp.com`
3. `MAILGUN_API_KEY` - retrieve the api key from your Mailgun account

<img src="./assets/configuration.png" alt="configuration" width="500px"/>

___

## Step 3 - Build the package

```
	$ ./build.sh
```

`./build.sh` will package the three components to be ready for deployment.

___

## Step 4 - Deployment

```
	# Run the deployment script
	$ ./deploy/firebase/deploy.sh 
```
---

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

## Calling the API using curl
If you have your API running on port `8800`,
```
	# Get list of email
	$ curl localhost:8800/api/v1/mail/list\?recipient=hard-dust-64

	# Get individual email
	$ curl localhost:8800/api/v1/mail/list\?mailKey=se-eyJwIjpmYWxzZSwiayI6ImVlMWNiMTAzLWZhZjMtNDg3Ni04MjI2LWE1YmE1ZTU3YzMxMiIsInMiOiI3NTdhNTY5ZGFkIiwiYyI6InRhbmtiIn0=
```

If you have it hosted on the net, change the endpoint to where you have hosted it on :)

# Code Guide
If you are interested to developing Inboxkitten, this is a brief guide of how  Inboxkitten has been structured.

## Main Components
 - API - that serves as the backbone to connect to MailGun
 - UI - the user interface that you see on <a href="https://inboxkitten.com" target="_blank">Inboxkitten</a> that interacts with the API
 - CLI - the command line tool that you can use to interact with the API

### API
Under the `api` folder is where all the code resides for the API component. The API component utilizes `axios` to perform its requests to Mailgun.

- The configuration settings of the API are all located under `config/`
    - `mailgunConfig.js` is the configuration file that contains the keys and domains 
    - `mailgunConfig.sample.js` is the template that `./config.sh` used to write into `mailgunConfig.js`
- The rest of the code resides in `src/`.
    - The main point of entry in an ExpressJS setup is at `app-setup.js`. In this file, 
    - `mailgunReader.js` contains the underlying code that connects to Mailgun
    - the `api` folder will contain the code that performs the validation of the params in the endpoint that the user called before sending over to `mailgunReader.js`.
- The `test` folder contains the mocha test cases to check the `mailgunReader.js`.

To add any endpoints, it is recommended to create a prototype function in `mailgunReader.js` that performs the execution that connects to Mailgun. Following which, you should create the endpoint that user will be using as a new file under `src/api/` folder for easy maintenance.

### UI
The UI component code is under `ui` folder. It is constructed using Vue.js for its frontend development and `axios` to perform to requests to API component.

- The configuration settings of the UI are all located under `config/`
    - `apiconfig.js` contains the configuration for connecting to API component as well as the domain to display on the UI.
    - `apiconfig.sample.js` is the template used in `./config.sh` for writing into `apiconfig.js`
    - The other configuration to be concerned would be the `shareConfig.js` where it is the settings for shareable features such as Twitter's tweeting and GitHub's fork.
    - The other files are auto generated files by vue-cli.
- The `src` folder contains the body for UI. It is separated into 3 folders.
    - The `assets` will contain the images.
    - The `components` will contain the components used in the UI.
    - The `router` is an auto generated file but it is used to add subpaths to link to the components.
    - The `scss` contains the styling used for Inboxkitten's UI.
- The `dist` folder contains the files built using the `npm run build` command.
- The `uilicious-test` is an uilicious test script that can be ran on [test.uilicious.com](https://test.uilicious.com) to check if your email has been received properly.

The main entrypoint will be the `App.vue` and by default the Vue router will direct to `landingpage.vue`.


### CLI
The CLI is under the `cli` folder. There are only one file that performs the tasks to connect to the API component. It is `inboxkitten.go` under the `src` folder. The `go.sh` script is a custom go script that ensures the environment is within the `cli` folder.