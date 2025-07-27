const express = require("express");
const cors = require("cors");
require("dotenv").config();

const firebaseConfig = require("./firebase");

const app = express();
const port = process.env.PORT || 1000;

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
        return res.json(firebaseConfig);
    } else {
        return res.status(403).json({ error: "Unauthorized"});
    }
});

// Health check route
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});