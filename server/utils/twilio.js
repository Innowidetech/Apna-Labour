// const twilio = require('twilio');
// const { parsePhoneNumberFromString } = require('libphonenumber-js');
// require('dotenv').config();

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = new twilio(accountSid, authToken);

// const sendOtpToMobile = (mobileNumber, message) => {
//     const phoneNumber = parsePhoneNumberFromString(mobileNumber, 'IN');
//     if (!phoneNumber || !phoneNumber.isValid()) {
//         console.error('Invalid phone number');
//         return;
//     }
//     const formattedNumber = phoneNumber.format('E.164');

//     client.messages.create({ body: message, from: process.env.TWILIO_MOBILE_NUMBER, to: formattedNumber })
// };

// module.exports = { sendOtpToMobile };
const twilio = require("twilio");
const { parsePhoneNumberFromString } = require("libphonenumber-js");
require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

const sendOtpToMobile = async (mobileNumber, message) => {
    try {
        // Parse number with country (default "IN")
        const phoneNumber = parsePhoneNumberFromString(mobileNumber, "IN");

        if (!phoneNumber || !phoneNumber.isValid()) {
            throw new Error("Invalid phone number");
        }

        const formattedNumber = phoneNumber.format("E.164");

        const sms = await client.messages.create({
            body: message,
            from: process.env.TWILIO_MOBILE_NUMBER,
            to: formattedNumber,
        });

        console.log("OTP sent successfully, SID:", sms.sid);
        return sms;
    } catch (err) {
        console.error("Error sending OTP:", err.message);
        throw err;
    }
};

module.exports = { sendOtpToMobile };