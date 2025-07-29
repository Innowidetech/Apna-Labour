const User = require('../models/User');
const Customer = require('../models/Customer');
const Labourer = require('../models/Labourer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { sendOtpToMobile } = require('../utils/twilio');
const { OAuth2Client } = require('google-auth-library');
const { addRevokedToken } = require('../utils/tokens');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const { sendEmail } = require('../utils/nodemailer');
const otpTemplate = require('../utils/otpTemplate');


exports.register = async (req, res) => {
    try {
        const { name, email, password, mobileNumber, role, address, serviceCity, serviceCategories } = req.body;
        if (!name || !email || !password || !mobileNumber || !['Customer', 'Labourer'].includes(role)) {
            return res.status(400).json({ message: "Invalid input: All fields are required and role must be valid." })
        }

        const isActive = role === 'Labourer' ? false : true;

        const hpass = bcrypt.hashSync(password, 10);
        let customer, labourer;
        const user = new User({ name, email, password: hpass, mobileNumber, role, isActive });
        await user.save();

        if (role === 'Customer') {
            customer = new Customer({ userId: user._id });
            await customer.save()
        }
        else if (role === 'Labourer') {
            if (!address || !serviceCity || !Array.isArray(serviceCategories) || !serviceCategories.length) {
                return res.status(400).json({ message: "Provide all the details." })
            }

            const formattedServiceCategories = serviceCategories.map(category => ({
                category: category
            }));

            labourer = new Labourer({ userId: user._id, address, serviceCity, services: formattedServiceCategories });
            await labourer.save()
        }

        const message = role === 'Labourer'
            ? "Your registration request has been sent to the admin for approval."
            : "Registration successful.";

        res.status(201).json({ message, user, customer, labourer });
    }
    catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message })
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password, mobileNumber, idToken } = req.body;
        if ((!password || !email) && !mobileNumber && !idToken) {
            return res.status(400).json({ message: "Provide (email and password) or mobileNumber or click on google to login" })
        }

        let token, user;

        if (idToken) {
            const ticket = await client.verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID });
            const payload = ticket.getPayload();
            const { sub: googleId, email, name } = payload;

            if (!email || !googleId || !name) {
                return res.status(400).json({ message: "Invalid Google token payload" });
            }

            user = await User.findOne({ $or: [{ googleId }, { email }] });
            if (!user) {
                return res.status(404).json({ message: "No user found linked to this Google account" });
            }

            token = jwt.sign({ userId: user._id, email, mobileNumber: user.mobileNumber, role: user.role }, process.env.JWT_SECRET);

        }
        else if (email && password) {
            user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: "No user found with this email" });
            }

            const isMatch = bcrypt.compareSync(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: "Invalid password" });
            }

            token = jwt.sign({ userId: user._id, email, mobileNumber: user.mobileNumber, role: user.role }, process.env.JWT_SECRET);

        }
        else if (mobileNumber) {
            user = await User.findOne({ mobileNumber });
            if (!user) {
                return res.status(404).json({ message: "No user found with this mobile number" });
            }

            if (user.role === 'Labourer' && user.isActive != true) {
                return res.status(409).json({ message: "Registration request not yet approved" })
            }
            
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const expiryTime = new Date(Date.now() + 5 * 60 * 1000);
            let message = `Your OTP for Apna Labour login is ${otp}`;

            user.otp = otp;
            user.otpExpiry = expiryTime;
            await user.save();
            sendOtpToMobile(mobileNumber, message);
        }

        if (user.role === 'Labourer' && user.isActive != true) {
            return res.status(409).json({ message: "Registration request not yet approved" })
        }
        const responseMessage = mobileNumber ? 'OTP has been sent to your mobile number (valid for 5 minutes)' : 'Login success'
        return res.status(200).json({ message: responseMessage, token });
    }
    catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message })
    }
};


exports.verifyOtp = async (req, res) => {
    try {
        const { mobileNumber, otp } = req.body;
        if (!mobileNumber || !otp) {
            return res.status(400).json({ message: "Provide mobileNumber and otp to login" })
        }
        const user = await User.findOne({ mobileNumber });
        if (!user) { return res.status(404).json({ message: "No user found with the provided mobileNumber" }) }

        if (user.otp !== otp) {
            return res.status(401).json({ message: "Invalid otp" })
        }
        user.otp = undefined;
        user.otpExpiry = undefined
        user.save()

        token = jwt.sign({ userId: user._id, email: user.email, mobileNumber, role: user.role }, process.env.JWT_SECRET);

        res.status(200).json({ message: 'Login success', token })
    }
    catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message })
    }
};


exports.logout = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        addRevokedToken(token)
        res.status(200).json({ message: "Logout successful" })
    }
    catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.status })
    }
};


exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) { return res.status(400).json({ message: "Please provide the email" }) }

        const user = await User.findOne({ email });
        if (!user) { return res.status(404).json({ message: "No user found with the email, please provide a valid email" }) }

        const otp = Math.floor(100000 + Math.random() * 999999).toString();
        const expiryTime = new Date(Date.now() + 5 * 60 * 1000);

        user.otp = otp;
        user.otpExpiry = expiryTime
        user.save()

        await sendEmail(email, 'Apna Labour - Password Reset OTP', otpTemplate(otp));

        res.status(200).json({ message: "OTP has been sent to your email (valid for 5 minutes)" })
    }
    catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.status })
    }
};


exports.resetPassword = async (req, res) => {
    try {
        const { email, otp, password } = req.body;
        if (!email || !otp || !password) { return res.status(400).json({ message: "Please provide all the details to reset password" }) }

        const user = await User.findOne({ email });
        if (!user) { return res.status(404).json({ message: "Invalid email" }) }

        if (otp != user.otp) { return res.status(400).json({ message: 'Invalid otp' }) }

        const hpass = bcrypt.hashSync(password, 10);

        user.password = hpass;
        user.otp = undefined;
        user.otpExpiry = undefined
        user.save()

        res.status(200).json({ message: "Password reset successfully" })
    }
    catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.status })
    }
};