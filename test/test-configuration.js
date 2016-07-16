exports.configuration = conf = {}

conf.merge = (a, b) => {
  let ab = {};

  for (let k in a) {
    ab[k] = a[k];
  }

  for (let k in b) {
    ab[k] = b[k];
  }

  return ab;
};

conf.dbConfiguration = ()=> ({
  database: {
    region: "us-west-2",
    endpoint: "http://localhost:8000",
    tableName: 'lambda_simple_form_test'
  }
});

conf.recordConfiguration = ()=> ({
  attributes: ['name', 'email', 'age', 'gender'],
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
});

conf.configuration = ()=> conf.merge(conf.dbConfiguration(), conf.recordConfiguration());