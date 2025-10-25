const { getFirebaseConfig } = require("./firebaseConfig");

const allowedOrigins = [
    "https://visuallottoboard.com",
    "https://app.visuallottoboard.com",
    "https://premier-lotto-babaijebu-results.visuallottoboard.com",
    "https://lottoclassificationchart.visuallottoboard.com",
    "https://pro-forecast-central-panel.visuallottoboard.com",
    "https://basic.app.visuallottoboard.com",
    "https://jazzy-moonbeam-74f2a6.netlify.app"
]

exports.handler = async function(event) {
    const origin = event.headers.origin;
    const isAllowedOrigin = allowedOrigins.includes(origin);
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

    console.log("Request Origin:", origin);

    if (!isAllowedOrigin) {
        console.warn("REQUEST FROM UNAUTHORIZED ORIGIN:", origin)
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

