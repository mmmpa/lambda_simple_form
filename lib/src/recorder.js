"use strict";

const AWS = require("aws-sdk");

exports.Recorder = class {
  constructor(configuration) {
    if(!configuration.database){
      return;
    }
    this.tableName = configuration.database.tableName;
    this.attributes = configuration.attributes;
    AWS.config.update({
      region: configuration.database.region,
      endpoint: configuration.database.endpoint
    });
  }

  get docClient() {
    return this._docClient || (this._docClient = new AWS.DynamoDB.DocumentClient());
  }

  get uuid() {
    var uuid = '';
    for (let i = 0; i < 32; i++) {
      let random = Math.random() * 16 | 0;

      if (i == 8 || i == 12 || i == 16 || i == 20) {
        uuid += "-"
      }
      uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
    }
    return uuid;
  }

  puttingParameter(data) {
    return {
      TableName: this.tableName,
      Item: this.attributes.reduce((a, name) => {
        let value = data[name];
        if (!value || value == '') {
          a[name] = ' ';
        } else {
          a[name] = value;
        }
        return a;
      }, {id: this.uuid})
    };
  }

  save(data, callback) {
    let params = this.puttingParameter(data);
    this.docClient.put(params, (err, data) => {
      if (err) {
        console.error('add error', JSON.stringify(err, null, 2), JSON.stringify(params, null, 2));
        callback && callback(false, params);
        return;
      }
      callback && callback(true, params);
    });
  }
};
