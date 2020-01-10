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