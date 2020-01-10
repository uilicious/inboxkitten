#
# Build the golang imageproxy application
#
FROM golang:1.12.6-alpine3.10 AS builder

# Lets get some useful stiff for building
RUN apk add --no-cache bash git openssh

# Get the image proxy repo
RUN go get willnorris.com/go/imageproxy/cmd/imageproxy

# Double checking that the single binary is installed
RUN ls -alh /go/bin

#
# Lets build the actual container
#
FROM alpine:latest  

# Lets add SSL support
RUN apk --no-cache add ca-certificates

# Copy over built file into bin
WORKDIR /bin/
COPY --from=builder /go/bin/imageproxy .

# Set workdir to /tmp/
WORKDIR /tmp/

# Debug checker 
RUN imageproxy --help || true

# Default entry starts the server at port 80
ENTRYPOINT [ "imageproxy" ]
CMD [ "-addr", "localhost:80" ]