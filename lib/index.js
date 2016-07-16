"use strict";

const Record = require('./src/record').Record;
const database = require(process.env.TEST ? './src/dummy' : './src/database').database;

exports.handler = (event, context, callback) => {
  let record = new Record({
    database: database,
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
  });

  record.assign(event).save((success, data) => {
    if(success){
      context.succeed({result: 'success'});
    } else{
      context.fail(JSON.stringify({result: 'failure', errors: data}));
    }
  });
};
