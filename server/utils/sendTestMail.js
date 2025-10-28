const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const sendTestMail = async (to, subject, html) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_ID,
                pass: process.env.EMAIL_PASSKEY,
            },
        });

        const mailOptions = {
            from: `"Apna Labour" <${process.env.EMAIL_ID}>`,
            to,
            subject,
            html,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("✅ Email sent: ", info.response);
        return info;
    } catch (error) {
        console.error("❌ Email sending failed:", error);
        throw error;
    }
};

module.exports = sendTestMail;



