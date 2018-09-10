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

# Build the UI + CLI
echo ">> Building the UI (NPM install + run build)"
cd "$projectDir/ui"
npm install;
npm run build;

# Build the CLI
echo ">> Building the CLI"
cd "$projectDir/cli"
make build;

# Clearing out firebase public folder
rm -rf "$firebaseDir/functions/"; 
rm -rf "$firebaseDir/public/"; 
mkdir -p "$firebaseDir/public/cli/";
mkdir -p "$firebaseDir/functions/";

# Transfering files into fire base deploy folder
echo ">> Preparing build files for firebase upload"
cp -r "$projectDir/ui/dist/" "$firebaseDir/public/"
cp -r "$projectDir/cli/bin/" "$firebaseDir/public/cli/"
cp -r "$projectDir/api/" "$firebaseDir/functions/"

# Reconfigure the API function for firebase
cp "$firebaseDir/functions/firebase.js" "$firebaseDir/functions/index.js"

# Calling firebase deploy
cd "$firebaseDir"
echo ">> Deploying to firebase"
firebase deploy
