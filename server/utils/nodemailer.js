const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASSKEY,
    },
});

exports.sendEmail = async (to, subject, htmlContent) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_ID,
            to,
            subject,
            html: htmlContent,
        });
    } catch (err) {
        console.error("Email sending failed:", err);
        // Optionally, log this to your database or monitoring system
    }
};
