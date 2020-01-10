#!/bin/sh

#
# Entrypoint start
#
echo ">>---------------------------------------------------------------------"
echo ">> Starting inboxkitten container : Get Mail Nyow!"
echo ">>---------------------------------------------------------------------"

#
# Getting the various configuration settings from command line / environment variable
#
if [ -z "$MAILGUN_EMAIL_DOMAIN" ]; then
	echo "[FATAL ERROR] Missing MAILGUN_EMAIL_DOMAIN (eg: inboxkitten.com)";
    exit 1;
else
	echo ">> Detected MAILGUN_EMAIL_DOMAIN env variable : $MAILGUN_EMAIL_DOMAIN";
fi

if [ -z "$MAILGUN_API_KEY" ]; then
	echo "[FATAL ERROR] Missing MAILGUN_API_KEY";
	exit 1;
else
	echo ">> Detected MAILGUN_API_KEY env variable : [intentionally redacted]";
fi

if [ -z "$WEBSITE_DOMAIN" ]; then
	echo ">> Missing WEBSITE_DOMAIN, using MAILGUN_EMAIL_DOMAIN : $MAILGUN_EMAIL_DOMAIN"
    export WEBSITE_DOMAIN="$MAILGUN_EMAIL_DOMAIN"
else
	echo ">> Detected WEBSITE_DOMAIN env variable : $WEBSITE_DOMAIN";
fi

#
# End of env variable checks
# Moving to config setups
#
echo ">>---------------------------------------------------------------------"

# Debug check
# ls /application/

#
# Setup the UI
#
echo ">> Setting up UI"

# Clone the files
rm -rf /application/api/public/
mkdir /application/api/public/
cp -r /application/ui-dist/* /application/api/public/

# Debug check
# ls /application/api/public/

# Search token (so that it does not get character substituted)
TOKEN_MAILGUN_EMAIL_DOMAIN='${MAILGUN_EMAIL_DOMAIN}'
TOKEN_WEBSITE_DOMAIN='${WEBSITE_DOMAIN}'

# Find and replace
find /application/api/public/ -type f -exec sed -i "s/$TOKEN_MAILGUN_EMAIL_DOMAIN/$MAILGUN_EMAIL_DOMAIN/g" {} +
find /application/api/public/ -type f -exec sed -i "s/$TOKEN_WEBSITE_DOMAIN/$WEBSITE_DOMAIN/g" {} +

#
# Setup the API
#
echo ">> Setting up API config"
cat "/application/api/config/mailgunConfig.sample.js" | envsubst > "/application/api/config/mailgunConfig.js"

#
# Start the server
#
echo ">>---------------------------------------------------------------------"
echo ">> Starting the server"
echo ">>---------------------------------------------------------------------"
cd /application/api/
npm start
