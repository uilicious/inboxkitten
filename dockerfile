#-------------------------------------------------------
#
# Base alpine images with all the runtime os dependencies
#
# Note that the node-sass is broken with node 12
# https://github.com/nodejs/docker-node/issues/1028
#
#-------------------------------------------------------

# Does basic node, and runtime dependencies
FROM node:10-alpine AS baseimage
RUN apk add --no-cache gettext
RUN mkdir -p /application/
# WORKDIR /application/

#-------------------------------------------------------
#
# code builders (used by dockerbuilders)
#
#-------------------------------------------------------

# Install dependencies for some NPM modules
FROM baseimage AS codebuilder
RUN apk add --no-cache make gcc g++ python

#-------------------------------------------------------
#
# Docker builders (also resets node_modules)
#
# Note each major dependency is compiled seperately
# so as to isolate the impact of each code change
#
#-------------------------------------------------------

# Build the API
# with reseted node_modules
FROM codebuilder AS apibuilder
# copy and reset the code
COPY api /application/api/
RUN rm -rf /application/api/node_modules
RUN cd /application/api && ls && npm install

# Build the UI
# with reseted node_modules
FROM codebuilder AS uibuilder
# copy and reset the code
COPY ui  /application/ui/
RUN rm -rf /application/ui/node_modules
RUN rm -rf /application/ui/dist
RUN cd /application/ui  && ls && npm install
# Lets do the UI build
RUN cp /application/ui/config/apiconfig.sample.js /application/ui/config/apiconfig.js
RUN cd /application/ui && npm run build

# Entry script 
# & Permission reset
FROM codebuilder AS entrypointbuilder
COPY docker-entrypoint.sh  /application/docker-entrypoint.sh
RUN chmod +x /application/docker-entrypoint.sh

#-------------------------------------------------------
#
# Full Docker application
#
#-------------------------------------------------------
FROM baseimage as inboxkitten

# Copy over the built files
COPY --from=apibuilder        /application/api                  /application/api
COPY --from=uibuilder         /application/ui/dist              /application/ui-dist
COPY --from=entrypointbuilder /application/docker-entrypoint.sh /application/docker-entrypoint.sh

# Debugging logging
# RUN ls /application/./
# RUN ls /application/ui-dist
# RUN ls /application/api

# Expose the server port
EXPOSE 8000

#
# Configurable environment variable
#
ENV MAILGUN_EMAIL_DOMAIN=""
ENV MAILGUN_API_KEY=""
ENV WEBSITE_DOMAIN=""

# Setup the workdir
WORKDIR "/application/"

# Setup the entrypoint
ENTRYPOINT [ "/application/docker-entrypoint.sh" ]
CMD []
