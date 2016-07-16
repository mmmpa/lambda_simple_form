const assert = require('power-assert');
const Director = require('../lib/src/director').Director;
const conf = require('./test-configuration').configuration;

function setup() {
  let config = conf.configuration();
  config.database.tableName += '_test';
  return new Director(config);
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
