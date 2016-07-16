const Validator = require('../src/validator').Validator;
const Recorder = require('../src/recorder').Recorder;

exports.Record = class {
  constructor(configuration) {
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

  save() {
    this.validator.prepare(this.data).validate();
    if (!this.validator.isValid) {
      return false;
    }

    console.log(this.recorder.save(this.validator.parameters));

    return true;
  }
};
