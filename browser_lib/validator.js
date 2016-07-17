const Record = require('../lib/src/record').Record;
const config = require('../lib/src/config').config;
const record = new Record(config);

var Validator = window.Validator = {};

Validator.validate = (data) => {
  if (record.assign(data).validate()) {
    return {result: 'success', data: record.parameters};
  } else {
    return {result: 'failure', errors: record.errors};
  }
};
