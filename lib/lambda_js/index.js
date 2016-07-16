const Recorder = require('../src/recorder').Recorder;

exports.handler = (event, context, callback) => {
  let record = new Recorder({
    attributes: ['name', 'email', 'age', 'gender'],
    validation: {
      name: {
        isLength: {min: 1, max: 20, message: '1-20文字で入力してください'},
        notEmpty: {}
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
  });

  if(record.save(event)){
    return {result: 'success'}
  }else{
    return {result: 'fail', errors: record.errors}
  }
};

if (process.env.TEST) {
  exports.handler({
    unknown: 'hoge'
  }, null, null)
  exports.handler({
    name: '<xmp><xmp><xmp><xmp><xmp>',
    email: '<xmp>',
    age: '<xmp>',
  }, null, null)
  exports.handler({
    name: 'name',
    email: 'test@example.com',
    age: 10,
    gender: 'male'
  }, null, null)
}
