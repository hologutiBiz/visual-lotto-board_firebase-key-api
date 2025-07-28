const { firebaseConfig } = require("../../utils/firebaseConfig");

const allowedOrigins = [
    "https://visuallottoboard.com",
    "https://app.visuallottoboard.com",
    "https://premier-lotto-babaijebu-results.visuallottoboard.com",
    "https://lottoclassificationchart.visuallottoboard.com",
    "http://127.0.0.1:5500",
]

exports.handler = async function(event) {
    const origin = event.headers.origin;

    if (!allowedOrigins.includes(origin)) {
        return {
            statusCode: 403,
            body: "Unauthorized"
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify(firebaseConfig)
    };
};

