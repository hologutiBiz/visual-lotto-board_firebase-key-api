const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

const allowedDomains = [
    "https://visuallottoboard.com",
    "https://app.visuallottoboard.com",
    "https://premier-lotto-babaijebu-results.visuallottoboard.com",
    "https://lottoclassificationchart.visuallottoboard.com",
]

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedDomains.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not Allowed by CORS"));
        }
    }
}));

app.get("/firebase-config", (req, res) => {
    const origin = req.headers.origin;

    if (allowedDomains.includes(origin)) {
        return res.json({
            apiKey: process.env.FIREBASE_API_KEY,
            authDomain: process.env.FIREBASE_AUTH_DOMAIN,
            projectId: process.env.FIREBASE_PROJECT_ID,
            storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
            appId: process.env.FIREBASE_APP_ID
        });
    } else {
        return res.status(403).json({ error: "Unauthorized"});
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});