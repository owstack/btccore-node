FROM buildpack-deps:jessie
MAINTAINER Ian Patton (ian.patton@gmail.com)

ENV BITCOIN_DATA=/data
ENV CONFIG_DIR=/home/ows/config

RUN mkdir -p $BITCOIN_DATA
RUN mkdir -p $CONFIG_DIR

COPY default.bitcoin.conf $BITCOIN_DATA/bitcoin.conf
COPY default.btccore-node.json $CONFIG_DIR/btccore-node.json
COPY default.btc-node.conf $CONFIG_DIR/bitcoin.conf

CMD ["echo","installed config files"]
