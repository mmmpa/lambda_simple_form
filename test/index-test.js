const assert = require('power-assert');
const handler = require('../lib/index').handler;
const conf = require('./test-configuration').configuration;
const merge = conf.merge;

function params(a) {
  let base = {
    name: 'name',
    email: 'test@example.com',
    age: '20',
    gender: 'female'
  };

  return merge(base, a);
}

describe('handler', () => {
  describe('handler', () => {
    it('1', (done) => {
      handler({}, {fail: () => done()});
    });

    it('1', (done) => {
      handler(params(), {succeed: () => done()});
    });
  });
});
