const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/shorten-url", async (req, res) => {
    try {
        const apiUrl = "https://cleanuri.com/api/v1/shorten";
        const requestData = {
            url: req.body.url,
        };
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
        });

        const responseData = await response.json();

        res.json({ shortUrl: responseData.result_url });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Export the Express app as the handler
exports.handler = async (event, context) => {
    // Ensure that Express middleware runs
    return require("serverless-http")(app)(event, context);
};