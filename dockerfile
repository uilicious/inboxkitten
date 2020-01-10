#
#
# Base alpine image with all the various dependencies
#
#
FROM node:12-alpine AS baseimage

# Install dependencies
RUN apk add --no-cache gettext

# Setup the /application/ directory
RUN mkdir -p /application/
# WORKDIR /application/

#
#
# Initial docker builder (resets node_modules)
#
#
FROM baseimage AS builder

# node-gyp installation 
RUN apk add --no-cache make gcc g++ python

# Copy over the requried files
COPY api /application/api/
COPY ui  /application/ui/
COPY docker-entrypoint.sh  /application/docker-entrypoint.sh

# Scrub out node_modules
RUN rm -f /application/api/node_modules
RUN rm -f /application/ui/node_modules

# Lets do the initial npm install
RUN cd /application/ui  && ls && npm install --production
RUN cd /application/api && ls && npm install --production

#
#
# Docker application
#
#
FROM node:12-alpine as application

# Copy over the built files
COPY --from=builder /application /application/

# Debugging logging
RUN ls /application

# Expose the server port
EXPOSE 8000

#
# Configurable environment variable
#
ENV MAILGUN_EMAIL_DOMAIN=""
ENV MAILGUN_API_KEY=""
ENV WEBSITE_DOMAIN=""

# #
# # Preload the NPM installs
# #
# RUN cd /application/ui  && ls && npm install
# RUN cd /application/api && ls && npm install

# Setup the entrypoint
ENTRYPOINT [ "/application/docker-entrypoint.sh" ]
CMD []
