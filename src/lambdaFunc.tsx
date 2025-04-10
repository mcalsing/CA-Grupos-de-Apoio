import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
 
  const routeKey = event.routeKey;

  switch (routeKey) {
    case 'GET /groups':
      const params = { TableName: 'groups' };
      const data = await docClient.send(new ScanCommand(params));

      return {
        statusCode: 200,
        body: JSON.stringify(data.Items),
      }
    case 'POST /groups':
      const userData = JSON.parse(event.body);
      const params = {
        TableName: 'groups',
        Item: {
          userId: Date.now().toString(),
          ...userData
        }
      };
            
      await dynamoDb.put(params).promise();
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'User created successfully' })
      };
    default:
      return {
        statusCode: 404,
        body: JSON.stringify('Not found page'),
      }
  }
}
