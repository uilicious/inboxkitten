#!/bin/sh

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
	echo ">> Please type in your MAILGUN_API_KEY";
	read -sp '>> MAILGUN_API_KEY : ' MAILGUN_API_KEY;
	echo "";
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
# Setup the UI
#
echo ">> Setting up UI"

# Clone the files
rm -rf /application/api/public/*
cp -r /application/ui-dist/ /application/api/public/

# Find and replace
find /application/api/public/ -type f -exec sed -i "s/\$\{MAILGUN_EMAIL_DOMAIN\}/$MAILGUN_EMAIL_DOMAIN/g" {} +
find /application/api/public/ -type f -exec sed -i "s/\$\{WEBSITE_DOMAIN\}/$WEBSITE_DOMAIN/g" {} +

#
# Setup the API
#
echo ">> Setting up API config"
cat "application/api/config/mailgunConfig.sample.js" | envsubst > "application/api/config/mailgunConfig.js"

# Start the API
cd /application/api/
npm start
