import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand, PutCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
  const routeKey = event.routeKey;

/*   const headers = {
    "Access-Control-Allow-Origin": "http://localhost:5173",
    "Access-Control-Allow-Headers": "content-type",
    "Access-Control-Allow-Methods": "OPTIONS,GET,POST"
  }; */

  switch (routeKey) {
    case 'GET /groups':
      try {
          const params = { TableName: 'groups' };
          const data = await docClient.send(new ScanCommand(params));
    
          return {
            statusCode: 200,
            body: JSON.stringify(data.Items),
          };
      } catch (error) {
        return {
          statusCode: 500,
          body: JSON.stringify({ message: 'Error fetching data', error: error.message })
        };
      }
    case 'POST /groups':
      try {
        const groupData = JSON.parse(event.body);
        const postParams = {
          TableName: 'groups',
          Item: {...groupData }
        };

        await docClient.send(new PutCommand(postParams));
        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'User created successfully' })
        };
      } catch (error) {
        return {
          statusCode: 500,
          body: JSON.stringify({ message: 'Error creating user', error: error.message })
        };
      }
    case 'DELETE /groups/{groupId}':
      const id = event.pathParameters.groupId;
      try {
        const deleteParams = {
          TableName: 'groups',
          Key: { groupId: id },
        };
        console.log(deleteParams);
        await docClient.send(new DeleteCommand(deleteParams));

        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'Group deleted successfully' }),
        };
      } catch (error) {
        return {
          statusCode: 500,
          body: JSON.stringify({ message: 'Error deleting group', error: error.message }),
        };
      }
    default:
      return {
        statusCode: 404,
        body: JSON.stringify('Not found page'),
      }
  }
}
