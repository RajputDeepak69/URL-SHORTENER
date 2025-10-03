const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");
const { v4: uuidv4 } = require("uuid");

const client = new DynamoDBClient({});
const dynamodb = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
    try {
    
        const requestBody = JSON.parse(event.body);
        const longUrl = requestBody.url;

        if (!longUrl || !longUrl.startsWith("http")) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Invalid URL format" })
            };
        }

    
        const shortCode = uuidv4().substring(0, 8);

    
        await dynamodb.send(new PutCommand({
            TableName: "url-shortener",
            Item: {
                short_url: shortCode,
                long_url: longUrl,
                created_at: new Date().toISOString(),
                clicks: 0
            }
        }));

        return {
            statusCode: 200,
            body: JSON.stringify({
                short_url: shortCode,
                long_url: longUrl
            })
        };

    } catch (error) {
        console.error("Error in create-url Lambda:", error);

        return {
            statusCode: 500,
            body: JSON.stringify({
                error: "Failed to create short URL",
                details: error.message
            })
        };
    }
};