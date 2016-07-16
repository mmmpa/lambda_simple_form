const assert = require('power-assert');
const handler = require('../lib/index').handler;

describe('handler', () => {
  describe('handler', () => {
    it('1', (done) => {
      handler({}, {fail: () => done()});
    });

    it('1', (done) => {
      handler({}, {fail: () => null, succeed: () => done()});
    });
  });
});
