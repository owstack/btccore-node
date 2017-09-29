FROM node:8

# update apt-get
RUN apt-get update && apt-get install -y dnsutils

USER root
# Set up non root user
RUN useradd --user-group --create-home --shell /bin/false ows

# Setup environment variables
ENV NODE_ENV=production
ENV HOME_PATH=/home/ows

ENV PKG_NAME=btc-node
ENV PKG_DIR=$HOME_PATH/$PKG_NAME

ENV APP_NAME=bitcoin-core-services
ENV APP_DIR=$HOME_PATH/$APP_NAME

ENV BITCOIN_DATA=/data

# Set up folder and add install files
RUN mkdir -p $PKG_DIR
RUN mkdir -p $BITCOIN_DATA
COPY package.json $PKG_DIR
WORKDIR $PKG_DIR

RUN chown -R ows:ows $HOME_PATH
RUN chgrp ows /usr/local/lib/node_modules
RUN chgrp ows /usr/local/bin

USER ows
RUN npm install -g owstack/btc-node

WORKDIR $HOME_PATH
RUN $PKG_NAME create -d $BITCOIN_DATA $APP_NAME
WORKDIR $APP_DIR
RUN $PKG_NAME install https://github.com/owstack/btc-explorer-api.git
RUN $PKG_NAME install https://github.com/owstack/btc-wallet-service.git
USER root
CMD ["btc-node","start"]
