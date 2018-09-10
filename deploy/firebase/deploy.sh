#!/bin/bash

# Deploy will terminate on any error
set -e

# Firebase Working directory
firebaseDir="`dirname \"$0\"`"
cd "$firebaseDir" || exit 1
firebaseDir="`pwd`"

# Project directory detection
projectDir="$(cd "$firebaseDir/../.."; pwd)"
echo ">> Assuming project directory of : $projectDir"

# Clearing out firebase public / functions folder
rm -rf "$firebaseDir/functions/"; 
rm -rf "$firebaseDir/public/"; 
mkdir -p "$firebaseDir/public/cli/";
mkdir -p "$firebaseDir/functions/";

# Transfering files into fire base deploy folder
echo ">> Preparing build files for firebase upload"
cp -R "$projectDir/ui/dist/" "$firebaseDir/public/"
cp -R "$projectDir/cli/bin/" "$firebaseDir/public/cli/"
cp -R "$projectDir/api/" "$firebaseDir/functions/"

# Reconfigure the API function for firebase
# cp "$firebaseDir/functions/firebase.js" "$firebaseDir/functions/index.js"

# Debug for file tree
cd "$firebaseDir"
if [ ! -z "DISPLAY_DEPLOY_FILE_TREE" ]; then
	tree -L 3;
fi

# Calling firebase deploy
if [ -z "$FIREBASE_TOKEN" ]; then
	echo ">> Deploying to firebase"
	firebase deploy
else
	echo ">> Deploying to firebase - using FIREBASE_TOKEN"
	firebase deploy --token "$FIREBASE_TOKEN"
fi
