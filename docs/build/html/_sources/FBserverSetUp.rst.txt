.. _FBserverSetUp:

Using Firebase with inbox kitten
================================

notes
-----
- This build requires node, npm and go and golang
- Requires Credit Card information to be present as firebase blaze is required.
- Requires NPM version 10!
- Downloading Go: https://github.com/moovweb/gvm
- Need to install golang
::

    sudo apt-get install golang

Creating a Firebase Server
--------------------------
1. Login to firebase
2. Go to "Get Started"
3. Click Add project

.. figure:: /images/AddProject.JPG
   :class: with-border
   :alt: Add Project
   :align: center
   :scale: 80 %

4. name the project a unique name, such as inboxkittendeploy and choose a parent resource
5. Google Analytics is optional
6. Press create project

Starting the inbox kitten program
---------------------------------
1. Start bash terminal
2. Move to main folder of inboxkitten using cd command
3. Enter the following command into bash

::
    
    npm install -g firebase-tools

4. After that login into fire base using the command.

::
    
    firebase login

5. click Y

6. Change node version to 10 to build the project by entering the following command

::

    n 10

7. Enter the following command

::

    ./deploy.sh

- MAILGUN DOMAIN: mailgun's provided email domain e.g. sandboxdsa982912.mailgun.org
- WEBSITE DOMAIN: <firebase project name>.web.app
- API KEY: mailgun's private API key

8. Enter the following command to see all existing projects

::

    firebase list


7. To select which project to use, enter the following command

::

    firebase use --add <alias/project name>

6. Change the directory to the firebase folder and upgrade back node to version 14

::

    cd deploy
    cd firebase
    n 14

7. Enter the following command

::

    firebase init hosting

8. Select which project you want to run on, enter for every other option

9. To start the server, enter the following command

::

    firebase deploy
