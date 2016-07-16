const assert = require('power-assert');
const Record = require('../lib/src/record').Record;

function setup() {
  return new Record(merge(dbConfiguration(), recordConfiguration()));
}

function merge(a, b) {
  let ab = {};

  for (let k in a) {
    ab[k] = a[k];
  }

  for (let k in b) {
    ab[k] = b[k];
  }

  return ab;
}

function dbConfiguration() {
  return {
    database: 'lambda_simple_form',
    table: 'lambda_simple_form_test'
  }
}

function recordConfiguration() {
  return {
    attributes: ['name', 'email', 'age', 'gender', 'blank'],
    validation: {
      name: {
        isLength: {min: 1, max: 5, message: '1-20文字で入力してください'}
      },
      email: {
        isEmail: {message: 'メールアドレスを入力してください'}
      },
      age: {
        isNumeric: {message: '数字を入力してください'},
        inRange: {min: 16, max: 100}
      },
      gender: {
        isIn: ['female', 'male', 'other']
      }
    }
  }
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

describe('', ()=> {
  describe('name', ()=> {
    it('1', ()=> {
      let r = setup();
      assert.equal(r.assign(params({name: 'a'})).save(), true);
    });

    it('2', ()=> {
      let r = setup();
      assert.equal(r.assign(params({name: 'aaaaaa'})).save(), false);
    });

    it('3', ()=> {
      let r = setup();
      assert.equal(r.assign(params({name: ''})).save(), false);
    });
  });

  describe('age', ()=> {
    it('1', ()=> {
      let r = setup();
      assert.equal(r.assign(params({age: ''})).save(), false);
    });

    it('2', ()=> {
      let r = setup();
      assert.equal(r.assign(params({age: 15})).save(), false);
    });

    it('3', ()=> {
      let r = setup();
      assert.equal(r.assign(params({age: 101})).save(), false);
    });

    it('4', ()=> {
      let r = setup();
      assert.equal(r.assign(params({age: 'a'})).save(), false);
    });

    it('5', ()=> {
      let r = setup();
      assert.equal(r.assign(params({age: 16})).save(), true);
    });
  });

  describe('email', ()=> {
    it('1', ()=> {
      let r = setup();
      assert.equal(r.assign(params({email: ''})).save(), false);
    });
  });

  describe('gender', ()=> {
    it('1', ()=> {
      let r = setup();
      assert.equal(r.assign(params({gender: ''})).save(), false);
    });
  });

});
