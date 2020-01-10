#!/bin/bash

docker stop $(docker ps -a | grep $(basename "$PWD") | awk '{print $1}'); 
docker rm $(docker ps -a | grep $(basename "$PWD") | awk '{print $1}');
docker build -t $(basename "$PWD") .  
# docker run -d -P --name $(basename "$PWD") $(basename "$PWD");