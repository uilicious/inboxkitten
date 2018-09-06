#!/bin/bash

# Working directory
workingDir="`dirname \"$0\"`"
cd "$workingDir" || exit 1

# GOPATH overwrite
WORKING_PWD=`pwd $workingDir`
mkdir -p "$WORKING_PWD/gopath/src"
export GOPATH="$WORKING_PWD/GOPATH"
export GOBIN="$GOPATH/bin"

# Execute go with all other arguments
go $@
