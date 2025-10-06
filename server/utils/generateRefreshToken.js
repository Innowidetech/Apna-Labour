require('dotenv').config(); // load .env
const { google } = require("googleapis");

// Replace hardcoded values with process.env
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI || "http://localhost:5173"; // fallback

// Create OAuth2 client
const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

// Generate authorization URL
const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline", // gives refresh token
    scope: ["https://www.googleapis.com/auth/gmail.send"],
});

console.log("🔗 STEP 1: Visit this URL in your browser:\n");
console.log(authUrl);
console.log("\nAfter granting access, copy the 'code' part from the URL into getTokens.js");
