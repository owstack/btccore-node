'use strict';

var path = require('path');
var mkdirp = require('mkdirp');
var fs = require('fs');
var packageJson = require('../../package');

function getMajorVersion(versionString) {
  return parseInt(versionString.split('.')[0]);
}

/**
 * Will return the path and default btccore-node configuration. It will search for the
 * configuration file in the "~/.btccore" directory, and if it doesn't exist, it will create one
 * based on default settings.
 * @param {Object} [options]
 * @param {Array} [options.additionalServices] - An optional array of services.
 */
function getDefaultConfig(options) {
  /* jshint maxstatements: 40 */
  if (!options) {
    options = {};
  }

  var defaultPath = path.resolve(process.env.HOME, './.btccore');
  var defaultConfigFile = path.resolve(defaultPath, './btccore-node.json');

  if (!fs.existsSync(defaultPath)) {
    mkdirp.sync(defaultPath);
  }

  if (fs.existsSync(defaultConfigFile)) {
    var currentConfig = require(defaultConfigFile);

    // config must have a `version` field with major equal to package major version
    if(currentConfig.version && getMajorVersion(packageJson.version) === getMajorVersion(currentConfig.version)) {
      return {
        path: defaultPath,
        config: currentConfig
      };
    }

    console.log(`The configuration file at '${defaultConfigFile}' is incompatible with this version of Btccore.`);

    var now = new Date();
    // btccore-node.YYYY-MM-DD.UnixTimestamp.json
    var backupFileName = `btccore-node.${now.getUTCFullYear()}-${now.getUTCMonth()}-${now.getUTCDate()}.${now.getTime()}.json`;
    var backupFile = path.resolve(defaultPath, backupFileName);
    fs.renameSync(defaultConfigFile, backupFile);
    console.log(`The previous configuration file has been moved to: ${backupFile}.`);
  }

  console.log(`Creating a new configuration file at: ${defaultConfigFile}.`);

  var defaultServices = [
    'address',
    'block',
    'db',
    'fee',
    'header',
    'mempool',
    'p2p',
    'timestamp',
    'transaction',
    'web'
  ];

  var defaultDataDir = path.resolve(defaultPath, './data');

  if (!fs.existsSync(defaultDataDir)) {
    mkdirp.sync(defaultDataDir);
  }

  var defaultConfig = {
    version: packageJson.version,
    network: 'livenet/btc',
    port: 3001,
    services: options.additionalServices ? defaultServices.concat(options.additionalServices) : defaultServices,
    datadir: defaultDataDir,
    servicesConfig: {
      'btccore-explorer-api': {
        cwdRequirePath: 'node_modules/btccore-explorer-api'
      },
      'explorer-ui': {
        cwdRequirePath: 'node_modules/explorer-ui'
      }
    }
  };
  fs.writeFileSync(defaultConfigFile, JSON.stringify(defaultConfig, null, 2));

  var config = JSON.parse(fs.readFileSync(defaultConfigFile, 'utf-8'));

  return {
    path: defaultPath,
    config: config
  };

}

module.exports = getDefaultConfig;