#!/bin/bash

# Deploy will terminate on any error
set -e

# cloudflare Working directory
cloudflareDir="`dirname \"$0\"`"
cd "$cloudflareDir" || exit 1
cloudflareDir="`pwd`"

# Project directory detection
projectDir="$(cd "$cloudflareDir/../.."; pwd)"
echo ">> Assuming project directory of : $projectDir"

# Clearing out cloudflare public / functions folder
rm -rf "$cloudflareDir/dist/"; 
mkdir -p "$cloudflareDir/dist/";

# Transfering files into fire base deploy folder
echo ">> Preparing build files for api cloudflare upload"
cd "$projectDir/api/"
npm run build-cloudflare
cp -a "$projectDir/api/dist/." "$cloudflareDir/dist/"

# Add in commit hash, to help debug deployment build
git rev-parse HEAD > "$cloudflareDir/dist/GITHASH"

# Debug for file tree
cd "$cloudflareDir"
if [ ! -z "DISPLAY_DEPLOY_FILE_TREE" ]; then
	tree -L 3;
fi

#
# Getting the various configuration settings from command line / environment variable
#

if [ -z "$CLOUDFLARE_EMAIL" ]; then
	echo ">> Please type in your CLOUDFLARE_EMAIL (eg: admin@yourdomain.com)";
	read -p '>> CLOUDFLARE_EMAIL : ' CLOUDFLARE_EMAIL;
else
	echo ">> Detected CLOUDFLARE_EMAIL env variable : $CLOUDFLARE_EMAIL";
fi

if [ -z "$CLOUDFLARE_API_KEY" ]; then
	echo ">> Please type in your CLOUDFLARE_API_KEY";
	read -sp '>> CLOUDFLARE_API_KEY : ' CLOUDFLARE_API_KEY;
	echo "";
else
	echo ">> Detected CLOUDFLARE_API_KEY env variable : [intentionally redacted]";
fi

if [ -z "$CLOUDFLARE_ZONE_ID" ]; then
	echo ">> Please type in your CLOUDFLARE_ZONE_ID";
	read -sp '>> CLOUDFLARE_ZONE_ID : ' CLOUDFLARE_ZONE_ID;
	echo "";
else
	echo ">> Detected CLOUDFLARE_ZONE_ID env variable : [intentionally redacted]";
fi

if [ -z "$MAILGUN_EMAIL_DOMAIN" ]; then
	echo ">> Please type in your MAILGUN_EMAIL_DOMAIN (eg: inboxkitten.com)";
	read -p '>> MAILGUN_EMAIL_DOMAIN : ' MAILGUN_EMAIL_DOMAIN;
else
	echo ">> Detected MAILGUN_EMAIL_DOMAIN env variable : $MAILGUN_EMAIL_DOMAIN";
fi
#
# Exporting variables, for envsubst support
#
export MAILGUN_EMAIL_DOMAIN="$MAILGUN_EMAIL_DOMAIN"
export CLOUDFLARE_ZONE_ID="$CLOUDFLARE_ZONE_ID"
export CLOUDFLARE_API_KEY="$CLOUDFLARE_API_KEY"
export CLOUDFLARE_EMAIL="$CLOUDFLARE_EMAIL"

# Calling cloudflare deploy, with parameters passing forward
echo ">> Deploying to cloudflare"
echo
curl -X PUT "https://api.cloudflare.com/client/v4/zones/"$CLOUDFLARE_ZONE_ID"/workers/script" -H "X-Auth-Email:$CLOUDFLARE_EMAIL" -H "X-Auth-Key:$CLOUDFLARE_API_KEY" -H "Content-Type:application/javascript" --data-binary "@./dist/main.js"

read -p ">> Set up route on cloudflare? (yes/no)" CLOUDFLARE_SETUP_ROUTE;
if [ "$CLOUDFLARE_SETUP_ROUTE" == "yes" ]; then
    echo ">> Setting route on cloudflare"
    curl -X POST "https://api.cloudflare.com/client/v4/zones/"$CLOUDFLARE_ZONE_ID"/workers/filters" -H "X-Auth-Email:$CLOUDFLARE_EMAIL" -H "X-Auth-Key:$CLOUDFLARE_API_KEY" -H "Content-type: application/json" -d '{"pattern": "'$MAILGUN_EMAIL_DOMAIN'/api/*", "enabled": true}'
fi

echo ">> Cloudflare script completed"