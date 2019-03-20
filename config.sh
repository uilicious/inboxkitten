#!/bin/bash

# Deploy will terminate on any error
set -e

# Firebase Working directory
projectDir="`dirname \"$0\"`"
cd "$projectDir" || exit 1
projectDir="`pwd`"

#
# Scanning and installing dependencies
# (Assuming a mac)
#
if [ -z "$(which envsubst)" ]; then
	if [ -z "$(which brew)" ]; then
		echo ">> envsubst not detected : please install =["
	else
		echo ">> envsubst not detected : using brew to install"
		brew install gettext
		brew link --force gettext 
	fi
fi
if [ -z "$(which npm)" ]; then
	echo ">> NPM not detected : please install =["
	exit 1;
fi
if [ -z "$(which node)" ]; then
	echo ">> node not detected : please install =["
	exit 1;
fi
if [ -z "$(which go)" ]; then
	echo ">> go not detected : please install =["
	exit 1;
fi

#
# Getting the various configuration settings from command line / environment variable
#
if [ -z "$MAILGUN_EMAIL_DOMAIN" ]; then
	echo ">> Please type in your MAILGUN_EMAIL_DOMAIN (eg: inboxkitten.com)";
	read -p '>> MAILGUN_EMAIL_DOMAIN : ' MAILGUN_EMAIL_DOMAIN;
else
	echo ">> Detected MAILGUN_EMAIL_DOMAIN env variable : $MAILGUN_EMAIL_DOMAIN";
fi

if [ -z "$WEBSITE_DOMAIN" ]; then
	echo ">> Please type in your WEBSITE_DOMAIN (eg: inboxkitten.com)";
	read -p '>> WEBSITE_DOMAIN : ' WEBSITE_DOMAIN;
else
	echo ">> Detected WEBSITE_DOMAIN env variable : $WEBSITE_DOMAIN";
fi

if [ -z "$MAILGUN_API_KEY" ]; then
	echo ">> Please type in your MAILGUN_API_KEY";
	read -sp '>> MAILGUN_API_KEY : ' MAILGUN_API_KEY;
	echo "";
else
	echo ">> Detected MAILGUN_API_KEY env variable : [intentionally redacted]";
fi

#
# Exporting variables, for envsubst support
#
export MAILGUN_EMAIL_DOMAIN="$MAILGUN_EMAIL_DOMAIN"
export MAILGUN_API_KEY="$MAILGUN_API_KEY"
export WEBSITE_DOMAIN="$WEBSITE_DOMAIN"

#
# Applying the configuration
#
echo ">> Applying config settings"
cat "$projectDir/api/config/mailgunConfig.sample.js" | envsubst > "$projectDir/api/config/mailgunConfig.js"
cat "$projectDir/ui/config/apiconfig.sample.js" | envsubst > "$projectDir/ui/config/apiconfig.js"