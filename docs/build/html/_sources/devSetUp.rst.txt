.. _devSetUp:

Setting Up and running inbox kitten (Serverless)
================================================

notes
-----
- dev is only compatible with node 10 currently
- dev needs to be runned with api concurrently

Setting up and running API
--------------------------
1. Open a bash terminal
2. Enter the following command into the terminal

::

    cd api

3. Enter the following command into the terminal 

::

    npm install

4. Go to /api/config and find mailgunConfig.sample.js, make a copy and rename the copy as mailgunConfig.js. Edit the apikey and email domain respectively.

- APIKEY: Mailgun's private API key
- EMAIL DOMAIN: Mailgun's provided email domain e.g. sandbox82ha8919eja9djs.mailgun.org

5. Enter the following command into the terminal

::

    npm run start

Currently, if nothing else was set up, an message indicating index.html is missing should appear.

6. You can proceed to any of this url extensions

- /api/v1/mail/list
- /api/v1/mail/getinfo
- /api/v1/mail/gethtml

Setting up and running dev
--------------------------
1. Open up another bash terminal
2. Enter the following command into the terminal

::

    cd ui

3. Enter the following command into the terminal

::

    apt-get update
    apt-get install python 2 make build-essential

4. Since inbox kitten only works in node 10, enter the following command

::

    node -v
    npm install -g n
    n 10

5. Now open up another bash terminal and enter and run the following commands

::

    cd ui
    npm install

6. Go to /ui/config and find apiConfig.sample.js, make a copy and rename the copy as apiConfig.js. Edit the website_domain and domain respectively.

NOTE:

- WEBSITE_DOMAIN is the address your api is running on. So if it's running on localhost:8000 , WEBSITE_DOMAIN is localhost:8000.
- DOMAIN is the mailgun email link. e.g. sandbox209sa9sa892.mailgun.org

7. Enter the following command into the terminal

::

    npm run dev

8. If you want to view the dev. Example if localhost:8000 is the website domain, go to locahost:8000/api/v1/mail to see the program.

Setting up and running build
----------------------------
1. Change directory to ui via this command

::

    cd ui

2. For deployment, enter the following command

::
    
    npm run build

3. Copy contents of ui/dist folder into api/public folder using this command

::

    cp -r dist/* ../api/public

4. Change directory to api via this command

::

    cd ../api

5. Lastly enter this command to run the build

::

    npm run start