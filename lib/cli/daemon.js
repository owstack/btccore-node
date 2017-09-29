'use strict';

var program = require('commander');
var path = require('path');
var btc = require('..');

function main(servicesPath, additionalServices) {
  /* jshint maxstatements: 100 */

  var version = btc.version;
  var start = btc.scaffold.start;
  var findConfig = btc.scaffold.findConfig;
  var defaultConfig = btc.scaffold.defaultConfig;

  program
    .version(version)
    .description('Start the current node')
    .option('-c, --config <dir>', 'Specify the directory with Btc Node configuration');

  program.parse(process.argv);

  if (program.config) {
    program.config = path.resolve(process.cwd(), program.config);
  }
  var configInfo = findConfig(program.config || process.cwd());
  if (!configInfo) {
    configInfo = defaultConfig({
      additionalServices: additionalServices
    });
  }
  if (servicesPath) {
    configInfo.servicesPath = servicesPath;
  }
  start(configInfo);
}

module.exports = main;
