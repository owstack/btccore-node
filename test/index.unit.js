'use strict';

var should = require('chai').should();

describe('Index Exports', function() {
  it('will export btc-lib', function() {
    var btc = require('../');
    should.exist(btc.lib);
    should.exist(btc.lib.Transaction);
    should.exist(btc.lib.Block);
  });
});
