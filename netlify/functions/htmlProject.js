const { getFirebaseConfig } = require("../../utils/getFirebaseConfig");

const allowedOrigins = [
    "https://visuallottoboard.com",
    "https://app.visuallottoboard.com",
    "https://premier-lotto-babaijebu-results.visuallottoboard.com",
    "https://lottoclassificationchart.visuallottoboard.com",
    "https://pro-forecast-central-panel.visuallottoboard.com",
    "http://127.0.0.1:5500",
    "https://studio.firebase.google.com/pro-forecast-panel-71306294"
]

exports.handler = async function(event) {
    const origin = event.headers.origin;
    const appName = event.queryStringParameters?.app || "default";

    const headers = {
        ...(allowedOrigins && { "Access-Control-Allow-Origin": origin }),
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Content-type": "application/json"
    }


    // Prelight OPTIONS request
    if (event.httpMethod === "OPTIONS") {
        return {
          statusCode: 200,
            headers,
            body: "Ok"  
        }
    }


    if (!allowedOrigins.includes(origin)) {
        return {
            statusCode: 403,
            headers,
            body: JSON.stringify({ message: "Unauthorized" })
        };
    }

    const firebaseConfig = getFirebaseConfig(appName);

    return {
        statusCode: 200,
        headers,
        body: JSON.stringify(firebaseConfig)
    };
};

