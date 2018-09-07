#!/bin/bash

# Firebase Working directory
workingDir="`dirname \"$0\"`"
cd "$workingDir" || exit 1
workingDir="`pwd`"

# Project directory detection
projectDir="$(cd "$workingDir/../.."; pwd)"
echo ">> Assuming project directory of : $projectDir"

# Build the UI + CLI
echo ">> Building the UI (NPM install + run build)"
cd "$projectDir/ui"
npm install;
npm run build;

# $(cd "$projectDir/ui"; npm install; npm run build)
# $(cd "$projectDir/cli"; make build)

# Copying over built files

