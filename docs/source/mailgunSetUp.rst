.. _mailgunSetUp:

Setting up Mailgun
==================
**PS Requires user to add credit card information. It works without paying any money but still requires credit card information to use it in foundation trial**

Getting details such as API Key and Mailgun Email domain
--------------------------------------------------------
1. Click Dashboard Tab
2. Under sending domain, the string ending with mailgun.org is the sandbox domain name

.. figure:: /images/MailgunReceive.png
   :class: with-border
   :alt: Mailgun Receive
   :align: center
   :scale: 80 %

3. Click API Keys

.. figure:: /images/MailgunAPIKey.png
   :class: with-border
   :alt: Mailgun API Key
   :align: center
   :scale: 80 %

4. The private API Key is used as the connection API Key

.. figure:: /images/MailgunAPI.png
   :class: with-border
   :alt: Mailgun API Key
   :align: center
   :scale: 80 %

Setting up a route to receive emails
-------------------------------------
1. Proceed to the receiving tab
2. Click on create new route

.. figure:: /images/MailgunReceive.png
   :class: with-border
   :alt: Mailgun Receive
   :align: center
   :scale: 80 %

3. Change Expression type to match recipient if you want to catch specific email addresses or else just use Catch All
4. Check Store and Notify

.. figure:: /images/MailgunCreateRoute1.JPG
   :class: with-border
   :alt: Mailgun Create Route 1
   :align: center
   :scale: 80 %

5. Click on create route

.. figure:: /images/MailgunCreateRoute2.JPG
   :class: with-border
   :alt: Mailgun Create Route 2
   :align: center
   :scale: 80 %

At this point, Mailgun should receive any email sent to the sendbox domain.
E.g. if the domain is sandbox293ds9021.mailgun.org, to send an email to your domain the format will be [name]@sandbox293ds9021.mailgun.org, example mail sent to cat@sandbox293ds9021.mailgun.org will be stored in mailgun's storage.
