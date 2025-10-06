require('dotenv').config(); // Load .env
const { google } = require("googleapis");

// Step 1: Read credentials from .env
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI || "http://localhost:5173";

// Step 2: Paste the code you got from Google after visiting the auth URL
const CODE = "PASTE_YOUR_CODE_HERE";

// Step 3: Create OAuth2 client
const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

// Step 4: Exchange the code for tokens
async function getTokens() {
    try {
        const { tokens } = await oAuth2Client.getToken(CODE);
        console.log("✅ Tokens received:\n", tokens);
        console.log("\n💾 Copy the 'refresh_token' and add it to your .env file like this:");
        console.log("REFRESH_TOKEN=" + tokens.refresh_token);
    } catch (err) {
        console.error("❌ Error getting tokens:", err);
    }
}

getTokens();
