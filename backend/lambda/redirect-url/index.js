const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, GetCommand, UpdateCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const dynamodb = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
    try {
        const shortCode = event.rawPath.replace("/", "");

        if (!shortCode) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "No short code provided" })
            };
        }

        const result = await dynamodb.send(
            new GetCommand({
                TableName: "url-shortener",
                Key: { short_url: shortCode }
            })
        );

        if (!result.Item) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: "Short URL not found" })
            };
        }

        await dynamodb.send(
            new UpdateCommand({
                TableName: "url-shortener",
                Key: { short_url: shortCode },
                UpdateExpression: "SET clicks = clicks + :inc",
                ExpressionAttributeValues: {
                    ":inc": 1
                }
            })
        );

        return {
            statusCode: 301,
            headers: {
                Location: result.Item.long_url
            }
        };
    } catch (error) {
        console.error("Redirect Lambda ERROR:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: "Redirect failed",
                details: error.message
            })
        };
    }
};