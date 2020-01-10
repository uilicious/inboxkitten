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
# Applying the configuration
#
echo ">> Applying config settings"
cat "$projectDir/api/config/mailgunConfig.sample.js" | envsubst > "$projectDir/api/config/mailgunConfig.js"
cat "$projectDir/ui/config/apiconfig.sample.js" | envsubst > "$projectDir/ui/config/apiconfig.js"

#
# Doing the required builds
#