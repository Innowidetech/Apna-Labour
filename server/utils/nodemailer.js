const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASSKEY,
    },
});

exports.sendEmail = async (to, subject, htmlContent) => {
    await transporter.sendMail({
        from: process.env.EMAIL_ID,
        to,
        subject,
        html: htmlContent
    })
};