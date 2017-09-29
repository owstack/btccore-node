FROM buildpack-deps:jessie
MAINTAINER Ian Patton (ian.patton@gmail.com)

ENV BITCOIN_DATA=/data
ENV CONFIG_DIR=/home/ows/config

RUN mkdir -p $BITCOIN_DATA && mkdir -p $CONFIG_DIR

COPY default.bitcoin.conf $BITCOIN_DATA/bitcoin.conf
COPY default.btc-node.json $CONFIG_DIR/btc-node.json
COPY default.btc-node.conf $CONFIG_DIR/btc-node.conf

CMD ["echo","installed config files"]
