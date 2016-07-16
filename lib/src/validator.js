const validator = require('validator');

exports.Validator = class {
  constructor(configuration = {}) {
    this.isValid = false;
    this.attributes = configuration.attributes || [];
    this.validation = configuration.validation || {};
    this.sanitization = configuration.sanitization || {};
  }

  get parameters() {
    return this.sanitized || (this.sanitized = this.sanitize(this.rawParameters));
  }

  prepare(parameters) {
    this.rawParameters = parameters;
    this.sanitized = null;
    return this;
  }

  sanitize(parameters) {
    return this.attributes.reduce((a, name)=> {
      a[name] = (parameters[name] || '') + '';
      return a
    }, {});
  }

  validate() {
    this.errors = {};
    this.isValid = true;
    try {
      for (let attribute in this.parameters) {
        let value = this.parameters[attribute];
        this.validateEach(attribute, value);
      }
    } catch (e) {
      this.isValid = false;
      throw e;
    }
    return this;
  }

  validateEach(attribute, value) {
    for (let checker in this.validation[attribute]) {
      let result = this.validateWithOption(attribute, value, checker);
      if (!result) {
        this.isValid = false;
        this.addError(attribute, checker);
      }
    }
  }

  validateWithOption(attribute, value, checker) {
    let validationOption = this.validation[attribute][checker];

    if (!validator[checker]) {
      return this[checker](value, validationOption);
    }

    if (validationOption == true) {
      return validator[checker](value);
    }
    return validator[checker](value, validationOption);
  }

  addError(attribute, checker) {
    this.errors[attribute] || (this.errors[attribute] = []);
    this.errors[attribute].push(this.makeMessage(attribute, checker))
  }

  makeMessage(attribute, checker) {
    let message = {};
    message[checker] = this.validation[attribute][checker].message || 'invalid';
    return message;
  }

  inRange(value, options) {
    let num = +value;
    if (isNaN(num)) {
      return false;
    }
    return (options.min || -Infinity) <= num && num <= (options.max || Infinity)
  }
};

