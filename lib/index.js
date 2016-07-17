"use strict";

const Record = require('./src/record').Record;
const database = require(process.env.TEST ? './src/dummy' : './src/database').database;
const config = require('./src/config').config;

exports.handler = (event, context, callback) => {
  config.database = database;
  let record = new Record(config);

  if (record.assign(event).validate()) {
    context.succeed({result: 'success', data: record.parameters});
  } else {
    context.fail(JSON.stringify({result: 'failure', errors: record.errors}));
  }
};
