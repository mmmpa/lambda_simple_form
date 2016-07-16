const squel = require("squel");

exports.Recorder = class {
  constructor(configuration) {
    this.configuration = configuration;
  }

  save(data) {
    let base = squel.useFlavour('postgres').insert().into(this.configuration.table)

    return this.configuration.attributes.reduce((a, name)=> {
      let value = data[name];
      return a.set(name, value);
    }, base).toString();
  }
};
