import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
 
  const routeKey = event.routeKey;

  switch (routeKey) {
    case 'GET /product':
      const params = { TableName: 'groups' };
      const data = await docClient.send(new ScanCommand(params));

      return {
        statusCode: 200,
        body: JSON.stringify(data.Items),
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