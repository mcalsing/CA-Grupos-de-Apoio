const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
//const TABLE_NAME = 'groups';

export const handler = async (event) => {
 
  const routeKey = event.routeKey;

  switch (routeKey) {
    case 'GET /product':
      const params = { TableName: 'groups' };
      const data = await dynamoDb.scan(params).promise();

      return {
        statusCode: 200,
        body: JSON.stringify('hello from lambda, get'),
        //data.Items
      }
    case 'POST /product':
      return {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda! post'),
      }
    default:
      return {
        statusCode: 404,
        body: JSON.stringify('Not foundddd'),
      }
  }
}
