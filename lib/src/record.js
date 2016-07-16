const Validator = require('../src/validator').Validator;
const Recorder = require('../src/recorder').Recorder;

exports.Record = class {
  constructor(configuration) {
    this.data = {};
    this.validator = new Validator(configuration);
    this.recorder = new Recorder(configuration);
  }

  get errors() {
    return this.validator.errors;
  }

  assign(data) {
    this.data = data;
    return this;
  }

  validate() {
    this.validator.prepare(this.data).validate();
    return this.validator.isValid;
  }

  save(callback) {
    if (!this.validate()) {
      callback(this.errors);
    }

    this.recorder.save(this.validator.parameters, callback);
  }
};
