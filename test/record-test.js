const assert = require('power-assert');
const Record = require('../lib/src/record').Record;
const Director = require('../lib/src/director').Director;
const conf = require('./test-configuration').configuration;
const merge = conf.merge;


function setup() {
  return new Record(conf.configuration());
}

function setupDirector() {
  return new Director(conf.configuration());
}

function params(a) {
  let base = {
    name: 'name',
    email: 'test@example.com',
    age: '20',
    gender: 'female'
  };

  return merge(base, a);
}

describe('record', ()=> {
  describe('validation', ()=> {
    describe('name', ()=> {
      it('1', ()=> {
        let r = setup();
        assert.equal(r.assign(params({name: 'a'})).validate(), true);
      });

      it('2', ()=> {
        let r = setup();
        assert.equal(r.assign(params({name: 'aaaaaa'})).validate(), false);
      });

      it('3', ()=> {
        let r = setup();
        assert.equal(r.assign(params({name: ''})).validate(), false);
      });
    });

    describe('age', ()=> {
      it('1', ()=> {
        let r = setup();
        assert.equal(r.assign(params({age: ''})).validate(), false);
      });

      it('2', ()=> {
        let r = setup();
        assert.equal(r.assign(params({age: 15})).validate(), false);
      });

      it('3', ()=> {
        let r = setup();
        assert.equal(r.assign(params({age: 101})).validate(), false);
      });

      it('4', ()=> {
        let r = setup();
        assert.equal(r.assign(params({age: 'a'})).validate(), false);
      });

      it('5', ()=> {
        let r = setup();
        assert.equal(r.assign(params({age: 16})).validate(), true);
      });
    });

    describe('email', ()=> {
      it('1', ()=> {
        let r = setup();
        assert.equal(r.assign(params({email: ''})).validate(), false);
      });
    });

    describe('gender', ()=> {
      it('1', ()=> {
        let r = setup();
        assert.equal(r.assign(params({gender: ''})).validate(), false);
      });
    });
  });

  describe('save', ()=> {
    it('1', (done)=> {
      let r = setup();
      r.assign(params());
      setupDirector().createTable(()=> {
        r.save((saved)=> {
          console.log(saved);
          done();
        });
      });
    });
  });
});
