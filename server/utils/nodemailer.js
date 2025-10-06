const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

exports.sendEmail = async (to, subject, htmlContent) => {
    try {
        const accessToken = await oAuth2Client.getAccessToken();

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: process.env.EMAIL_ID,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: accessToken.token,
            },
        });

        const result = await transporter.sendMail({
            from: `"Apna Labour" <${process.env.EMAIL_ID}>`,
            to,
            subject,
            html: htmlContent,
        });

        console.log("✅ Email sent:", result.messageId);
        return result;
    } catch (error) {
        console.error("❌ Email sending failed:", error.message);
        throw error;
    }
};
