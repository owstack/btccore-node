FROM node:8.9

# update apt-get
RUN apt-get update && apt-get install -y dnsutils

USER root
# Set up non root user
RUN useradd --user-group --create-home --shell /bin/false ows

# Setup environment variables
ENV NODE_ENV=production
ENV PKG_NAME=btcnode
ENV APP_NAME=bitcoin-core-services
ENV HOME_PATH=/home/ows
ENV BITCOIN_DATA=/data

ENV PKG_DIR=$HOME_PATH/$PKG_NAME
ENV APP_DIR=$HOME_PATH/$APP_NAME

# Set up folder and add install files
RUN mkdir -p $PKG_DIR && mkdir -p $BITCOIN_DATA
COPY package.json $PKG_DIR
WORKDIR $PKG_DIR

RUN chown -R ows:ows $HOME_PATH && chgrp ows /usr/local/lib/node_modules && chgrp ows /usr/local/bin

USER ows
RUN npm install -g @owstack/btc-node@0.1.0

WORKDIR $HOME_PATH
RUN $PKG_NAME create -d $BITCOIN_DATA $APP_NAME

WORKDIR $APP_DIR
RUN $PKG_NAME install @owstack/btc-explorer-api@0.0.6
RUN $PKG_NAME install @owstack/btc-wallet-service@0.0.9
RUN $PKG_NAME install @owstack/ows-explorer@0.0.3

USER root
CMD ["btcnode", "start", "-c", "/home/ows/config", "-m", "/home/ows/bitcoin-core-services"]
