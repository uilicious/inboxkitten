#!/bin/bash

# Deploy will terminate on any error
set -e

# Project directory detection
projectDir="`dirname \"$0\"`"
cd "$projectDir" || exit 1
projectDir="`pwd`"
echo ">> Assuming project directory of : $projectDir"

# Build the UI + CLI
echo ">> Building the UI (NPM install + run build)"
cd "$projectDir/ui"
npm install;
npm run build;

# Build the API
echo ">> Building the API (NPM install)"
cd "$projectDir/api"
npm install;
# npm run build;

# Build the CLI
echo ">> Building the CLI"
cd "$projectDir/cli"
make build;
