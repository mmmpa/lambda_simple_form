exports.config = {
  attributes: ['name', 'email', 'age', 'gender'],
  validation: {
    name: {
      isLength: {min: 1, max: 20, message: '1-20文字で入力してください'}
    },
    email: {
      isEmail: {message: 'メールアドレスを入力してください'}
    },
    age: {
      isNumeric: {message: '数字を入力してください'}
    },
    gender: {
      isIn: ['female', 'male', 'other']
    }
  }
};
