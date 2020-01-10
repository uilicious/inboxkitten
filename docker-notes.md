# Docker build process

## inside the respective folder (eg: ./ssh/)
docker build -t {tagname} .
docker build -t $(basename "$PWD") .

## running the build
docker run -d -P --name {tagname} {container_name}
docker run -d -P --name $(basename "$PWD") $(basename "$PWD")

-d : detach mode
-P : auto publish all ports
-e : set env key=value pairs

## adding listener port
docker port containername XPortNum

# Useful command chains

## build, run
docker build -t $(basename "$PWD") . && docker run -d -P --name $(basename "$PWD") $(basename "$PWD");

## nuke all, build, run
docker rm $(docker ps -a -q); docker build -t $(basename "$PWD") . && docker run -d -P --name $(basename "$PWD") $(basename "$PWD");

## stop all, nuke all, build, run
docker stop $(docker ps -aq); docker rm $(docker ps -a -q); docker build -t $(basename "$PWD") . && docker run -d -P --name $(basename "$PWD") $(basename "$PWD");

# Stop current "basename", Nuke it, Build it, Run it
```
docker stop $(docker ps -a | grep $(basename "$PWD") | awk '{print $1}'); 
docker rm $(docker ps -a | grep $(basename "$PWD") | awk '{print $1}');
docker build -t $(basename "$PWD") . && 
docker run -d -P --name $(basename "$PWD") $(basename "$PWD");
```

Or as a single line

`docker stop $(docker ps -a | grep $(basename "$PWD") | awk '{print $1}'); docker rm $(docker ps -a | grep $(basename "$PWD") | awk '{print $1}'); docker build -t $(basename "$PWD") . && docker run -d -P --name $(basename "$PWD") $(basename "$PWD");`

# Docker commands

## Delete all containers
docker rm $(docker ps -a -q)
## Delete all images
docker rmi $(docker images -q)


# ENTRYPOINT vs CMD

- ENTRYPOINT is runs WITH cmd,
- CMD is commonly overwritten by user
- Technically user can overwrite ENTRYPOINT with additional command "flags"
- Final executed command : ENTRYPOINT CMD
