const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, GetCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const dynamodb = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
    try {

        const shortCode = event.rawPath.replace("/", "").replace("stats", "").replace("/", "").trim();

        if (!shortCode) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "No short code provided" })
            };
        }

        // Fetch item from Databse
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

        return {
            statusCode: 200,
            body: JSON.stringify({
                short_url: shortCode,
                long_url: result.Item.long_url,
                clicks: result.Item.clicks,
                created_at: result.Item.created_at
            })
        };
    } catch (error) {
        console.error("Stats Lambda ERROR:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: "Failed to fetch stats",
                details: error.message
            })
        };
    }
};