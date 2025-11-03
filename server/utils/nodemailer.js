const { google } = require("googleapis");

const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);

// Set your refresh token from .env
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

exports.sendEmail = async (to, subject, htmlContent) => {
    try {
        const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

        const utf8Subject = "=?utf-8?B?" + Buffer.from(subject).toString("base64") + "?=";

        // Construct RFC 2822 message
        const messageParts = [
            `From: "Apna Labour" <${process.env.EMAIL_ID}>`,
            `To: ${to}`,
            `Subject: ${utf8Subject}`,
            "MIME-Version: 1.0",
            "Content-Type: text/html; charset=utf-8",
            "",
            htmlContent,
        ];

        const message = messageParts.join("\n");

        // Base64 encode, URL-safe
        const encodedMessage = Buffer.from(message)
            .toString("base64")
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, "");

        // Send email
        const res = await gmail.users.messages.send({
            userId: "me",
            requestBody: { raw: encodedMessage },
        });

        console.log("✅ Email sent:", res.data.id);
        return res.data;
    } catch (error) {
        console.error(" Email sending failed:", error.response?.data || error.message);
        throw error;
    }
};
