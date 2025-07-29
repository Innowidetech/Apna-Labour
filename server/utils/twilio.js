const twilio = require('twilio');
const { parsePhoneNumberFromString } = require('libphonenumber-js');
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

const sendOtpToMobile = (mobileNumber, message) => {
    const phoneNumber = parsePhoneNumberFromString(mobileNumber, 'IN');
    if (!phoneNumber || !phoneNumber.isValid()) {
        console.error('Invalid phone number');
        return;
    }
    const formattedNumber = phoneNumber.format('E.164');

    client.messages.create({ body: message, from: process.env.TWILIO_MOBILE_NUMBER, to: formattedNumber })
};

module.exports = { sendOtpToMobile };
