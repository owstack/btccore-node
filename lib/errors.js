'use strict';

var createError = require('errno').create;

var BtcNodeError = createError('BtcNodeError');

var RPCError = createError('RPCError', BtcNodeError);

module.exports = {
  Error: BtcNodeError,
  RPCError: RPCError
};
