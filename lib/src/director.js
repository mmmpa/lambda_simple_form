const AWS = require("aws-sdk");

exports.Director = class {
  constructor(configuration) {
    this.tableName = configuration.database.tableName
    AWS.config.update({
      region: configuration.database.region,
      endpoint: configuration.database.endpoint
    });
  }

  get dynamoDb() {
    return this._dynamoDb || (this._dynamoDb = new AWS.DynamoDB());
  }

  get creationParameters() {
    return {
      TableName: this.tableName,
      KeySchema: [
        {AttributeName: "id", KeyType: "HASH"}
      ],
      AttributeDefinitions: [
        {AttributeName: "id", AttributeType: "S"}
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
      }
    };
  }

  get destructionParameters() {
    return {TableName: this.tableName};
  }

  createTable(callback) {
    this.dynamoDb.createTable(this.creationParameters, (err, data) => {
      if (err) {
        console.error('creation error', JSON.stringify(err, null, 2), this.creationParameters);
      }
      callback && callback();
    });
  }

  deleteTable(callback) {
    this.dynamoDb.deleteTable(this.destructionParameters, (err, data) => {
      if (err) {
        console.error('delete error');
      }
      callback && callback();
    });
  }
};
