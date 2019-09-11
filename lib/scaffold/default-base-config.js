'use strict';

/**
 * Will return the path and default btc-node configuration on environment variables
 * or default locations.
 * @param {Object} options
 * @param {String} options.network - testnet or livenet
 */
function getDefaultBaseConfig(options) {
  if (!options) {
    options = {};
  }
  return {
    path: process.cwd(),
    config: {
      network: options.network || 'livenet',
      port: 3001,
      services: ['bitcoind', 'web'],
      servicesConfig: {
        bitcoind: {
          connect: [{
            zmqpubrawtx: 'tcp://bitcoin-core:28332',
            zmqpubhashblock: 'tcp://bitcoin-core:28332',
            rpcprotocol: 'http',
            rpchost: 'bitcoin-core',
            rpcport: 8332,
            rpcuser: 'bitcoin',
            rpcpassword: 'local321'
          }]
        }
      }
    }
  };
}

module.exports = getDefaultBaseConfig;
