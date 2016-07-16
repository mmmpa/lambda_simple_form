const assert = require('power-assert');
const Director = require('../lib/src/director').Director;
const conf = require('./test-configuration').configuration;

function setup() {
  return new Director(conf.configuration);
}

describe('table', ()=> {
  describe('name', ()=> {
    it('1', (done)=> {
      let d = setup();
      d.createTable(()=> done());
    });

    it('1', (done)=> {
      let d = setup();
      d.deleteTable(()=> done());
    });
  });
});
