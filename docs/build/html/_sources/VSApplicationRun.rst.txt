.. _VSApplicationRun:

Running inboxkitten
===================

Visual Studio (By Editing Docker File)
--------------------------------------
1. Open up the dockerfile
2. Scroll down and Enter the Mailgun Email Domain and Mailgun API Key from the previous step. Website_Domain = "localhost:8000"

.. figure:: /images/DockerConfig.JPG
   :class: with-border
   :alt: Docker Configuration
   :align: center
   :scale: 80 %

3. Open up a new terminal by going to the terminal tab on the top left. Click on new terminal.

.. figure:: /images/NewTerminal.JPG
   :class: with-border
   :alt: Terminal
   :align: center
   :scale: 80 %

4. Go into bash and type
::

   sudo docker build -t [name of instance]:[tag] .
   e.g. sudo docker build -t test:1.0.0 .

This builds the image to allow docker to run the image.

5. Type in bash this to run the code
::

   sudo docker run -p 8000:8000 [name of instance]:[tag]
   e.g. sudo docker run -p 8000:8000 test:1.0.0

This runs the instance that was built

6. Open up a browser

7. go to `localhost:8000 <localhost:8000>`_ to use the running instance of inbox kitten

Running with only bash
----------------------
Using the bash enter the following command
::

   # PS: you should modify this for your use case
   docker run \
      -e MAILGUN_EMAIL_DOMAIN="<email-domain>" \
      -e MAILGUN_API_KEY="<api-key>" \
      -e WEBSITE_DOMAIN="localhost:8000" \ 
      -p 8000:8000 \
      uilicious/inboxkitten

Fill in the relavant information needed.

Using inboxkitten
-----------------
1. Once Inbox Kitten has been started 
2. Send any email to [name]@[domain name] e.g. if domain name is sandbox293ds9021.com then any email sent to [name]@sandbox293ds9021.com will be received
3. Go to inbox kitten then enter the name here
4. Click Get Mail Nyow! and it will show all emails that exist in the inbox.

Removing an image of a running instance
---------------------------------------
1. Go to remote explorer
2. Search for the name and tag that you have build that you want to delete

.. figure:: /images/StopInstance.JPG
   :class: with-border
   :alt: Terminal
   :align: center
   :scale: 100 %

3. Right click on it and select remove container

.. figure:: /images/DeleteInstance.JPG
   :class: with-border
   :alt: Terminal
   :align: center
   :scale: 100 %

Stopping a running instance
---------------------------
1. Go to remote explorer
2. Search for the name and tag that is currently running

.. figure:: /images/StopInstance.JPG
   :class: with-border
   :alt: Terminal
   :align: center
   :scale: 100 %

3. Right click on it and select stop container

.. figure:: /images/StopContainer.png
   :class: with-border
   :alt: Terminal
   :align: center
   :scale: 100 %