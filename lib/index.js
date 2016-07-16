"use strict";

const Record = require('./src/record').Record;
const database = require(process.env.TEST ? './src/dummy' : './src/database').database;

exports.handler = (event, context, callback) => {
  let record = new Record({
    database: database,
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

  if(record.assign(event).save()){
    return {result: 'success'}
  }else{
    return {result: 'fail', errors: record.errors}
  }
};
